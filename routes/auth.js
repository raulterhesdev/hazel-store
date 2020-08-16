const express = require('express');
const {
  register,
  login,
  getUser,
  updateInfo,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/user').get(protect, getUser);
router.route('/updateInfo').put(protect, updateInfo);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:resetToken').post(resetPassword);

module.exports = router;
