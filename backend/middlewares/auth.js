const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.isAuth = async (req, res, next) => {
    // console.log(req.headers);
  if (req.headers && req.headers.authorization) {
    console.log(req.headers.authorization)
    let token = req.headers.authorization;
    
    // Check if the token has the 'Bearer ' prefix
    if (token.startsWith('Bearer ')) {
      // Extract the token without 'Bearer '
      token = token.split(' ')[1];
    }
    console.log(token);
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode.userId);
      console.log(user);
      if (!user) {
        return res.json({ success: false, message: 'unauthorized access' });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.json({ success: false, message: 'unauthorized access' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.json({
          success: false,
          message: 'sesson expired, Sign in',
        });
      }

      res.res.json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.json({ success: false, message: 'unauthorized access' });
  }
};