const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.createUser = async (req, res) => {
    const { fullname, email, password, interests } = req.body;

    // console.log(fullname);
    const isNewUser = await User.isThisEmailInUse(email);
    if (!isNewUser)
      return res.json({
        success: false,
        message: 'This email is already in use, try sign-in',
      });
    const user = await User({
      fullname,
      email,
      password,
      interests,
    });
    await user.save();
    res.json({ success: true, user });
  };
  
  exports.userSignIn = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (!user)
      return res.json({
        success: false,
        message: 'user not found, with the given email',
      });
  
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.json({
        success: false,
        message: 'email / password does not match',
      });
  
    //   console.log('JWT Secret:', process.env.JWT_SECRET);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '10d',
    });
  
    let oldTokens = user.tokens || [];
  
    if (oldTokens.length) {
      oldTokens = oldTokens.filter(t => {
        const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
        if (timeDiff < 864000) {
          return t;
        }
      });
    }
    await User.findByIdAndUpdate(user._id, {
        tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
      });
    
      const userInfo = {
        fullname: user.fullname,
        email: user.email,
        avatar: user.avatar ? user.avatar : '',
      };
    
      res.json({ success: true, user: userInfo, token });
};

exports.signOut = async (req, res) => {
    if (req.headers && req.headers.authorization) {
        let token = req.headers.authorization;
    
        // Check if the token has the 'Bearer ' prefix
        if (token.startsWith('Bearer ')) {
          // Extract the token without 'Bearer '
          token = token.split(' ')[1];
        }
      console.log(token);
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: 'Authorization fail!' });
      }
      const tokens = req.user.tokens || [];
  
      const newTokens = tokens.filter(t => t.token !== token);
  
      await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
      res.json({ success: true, message: 'Sign out successfully!' });
    }
  };

  exports.updateInterests = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have the user's ID from the auth middleware
        const { interests } = req.body;

        const user = await User.findByIdAndUpdate(userId, { $set: { interests } }, { new: true });
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating interests", error: error.message });
    }
};