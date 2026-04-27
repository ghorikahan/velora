const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * 1. Signup with Email/Password
 */
exports.signup = async (req, res) => {
    try {
        const { fullName, email, password, mobile, familySize, agreed } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            mobile,
            familySize,
            agreed: agreed || false
        });

        // Create JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'secret_key_123',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
};

/**
 * 2. Login with Email/Password
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user || !user.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'secret_key_123',
            { expiresIn: '7d' }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

/**
 * 3. Google Login
 */
exports.googleLogin = async (req, res) => {
    const { token } = req.body;
    console.log('Google Login Request received, token length:', token ? token.length : 0);

    if (!token) {
        return res.status(400).json({ message: 'Google token is required' });
    }

    try {
        // Verify the Google Access Token by fetching user info
        const googleResponse = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
        
        if (!googleResponse.ok) {
            const errorData = await googleResponse.text();
            console.error('Google API Error:', errorData);
            return res.status(401).json({ message: 'Failed to verify Google token' });
        }

        const googleUser = await googleResponse.json();

        if (!googleUser.email) {
            return res.status(400).json({ message: 'Google account has no email' });
        }

        const { sub, email, name, picture } = googleUser;

        // Check if user exists, or create new one
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                fullName: name || 'Google User',
                email: email,
                googleId: sub,
                agreed: true
            });
        } else if (!user.googleId) {
            // Link Google account to existing email account
            user.googleId = sub;
            await user.save();
        }

        // Create a JWT for the user session
        const jwtToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'secret_key_123',
            { expiresIn: '7d' }
        );

        res.status(200).json({
            token: jwtToken,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                picture: picture
            }
        });

    } catch (error) {
        console.error('Google Auth Controller Error:', error);
        res.status(500).json({ message: 'Internal server error during Google Auth' });
    }
};
