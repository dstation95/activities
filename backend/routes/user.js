const express = require('express');
// const express = reqiure

const router = express.Router();
const {
  createUser,
  userSignIn,
  signOut,
  updateInterests,
} = require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
const {
  validateUserSignUp,
  userValidation,
  validateUserSignIn,
} = require('../middlewares/user');

// const multer = require('multer');

// const storage = multer.diskStorage({});

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb('invalid image ', false);
//   }
// };
// const uploads = multer({ storage, fileFilter });
router.post('/create-user', validateUserSignUp, userValidation, createUser);
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn);
router.post('/sign-out', isAuth, signOut);
router.put('/update-interests', isAuth, updateInterests);
// router.post(
//   '/upload-profile',
//   isAuth,
//   uploads.single('profile'),
//   uploadProfile
// );

module.exports = router;