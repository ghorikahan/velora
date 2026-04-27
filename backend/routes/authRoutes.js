const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST /api/auth/signup
// @desc    Register a new user
router.post('/signup', authController.signup);

// @route   POST /api/auth/login
// @desc    Login with email/password
router.post('/login', authController.login);

// @route   POST /api/auth/google
// @desc    Google OAuth Login
router.post('/google', authController.googleLogin);

module.exports = router;
