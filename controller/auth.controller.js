import services from './../services/index.js'

import jwt from 'jsonwebtoken'
import sgMail from '@sendgrid/mail';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const SEND_GRID_KEY = process.env.SEND_GRID_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;
sgMail.setApiKey(SEND_GRID_KEY);
const {
    authService,
    userService
} = services;

const login = async (req, res, next) => {
    try {
        console.log(req.body);
        const response = await authService.login(req.body.email, req.body.password);
        await res.status(response.statusCode).json(response);
    } catch (e) {
        next(e);
    }
}
const forgotPassword = async (req, res, next) => {
    const user = await userService.findByEmail(req.body.email, false);

    if (user != null && user.email) {
        const {
            email
        } = req.body;

        // Generate a unique token for password reset
        const token = jwt.sign({
            email
        }, 'factifyeditor', {
            expiresIn: '1h'
        });

        // Store the token in your database along with the user's email address

        // Create the password reset link
        const resetLink = `${FRONTEND_URL}/auth/reset-password?token=${token}`;
        console.log(resetLink);
        // Send the password reset email using SendGrid
        const msg = {
            to: email,
            from: 'contact@factifyeditor.com ',
            subject: 'Password Reset',
            html: `<p>Please click the following link to reset your password:</p><a href="${resetLink}">Click Here To Reset</a>`,
        };

        sgMail
            .send(msg)
            .then(async () => {
                await res.status(200).json({
                    message: 'Password reset email sent successfully'
                });
            })
            .catch(async (error) => {
                console.error(error);
                await res.status(500).json({
                    message: 'Failed to send password reset email'
                });
            });
    } else {
        await res.status(500).json({
            message: 'Invalid Email'
        });
    }
}
const resetPassword = async (req, res, next) => {
    const {
        token,
        newPassword
    } = req.body;

    try {
        // Verify the token
        const {
            email
        } = jwt.verify(token, 'factifyeditor');
        if (email) {
            const user = await userService.findByEmail(email, false);
            if (user) {
                const updated = await userService.updatePassword(user.id, {
                    password: newPassword
                });
                await res.status(200).json({
                    message: 'Password reset successful'
                });
            } else {
                await res.status(400).json({
                    message: 'Invalid or expired token'
                });

            }
        } else {
            await res.status(400).json({
                message: 'Invalid or expired token'
            });
        }
        // Retrieve the user's email address from the decoded token

        // Update the user's password in your database with the new password


    } catch (error) {
        console.error(error);
        await res.status(400).json({
            message: 'Invalid or expired token'
        });
    }
}


const register = async (req, res, next) => {
    try {
        const registeredUserData = await authService.register(req.body);

        await res.status(200).json(registeredUserData);
    } catch (e) {
        next(e);
    }
}
const changePassword = (req, res, next) => {
    try {
        const id = req.user._id;

        bcrypt.genSalt(SALT_WORK_FACTOR, async (err, salt) => {
            if (err) {
                return next(err);
            }
            bcrypt.hash(req.body.password, salt, async (hashErr, hash) => {
                if (hashErr) {
                    return next(hashErr);
                }
                const data = {
                        'password': hash
                    },
                    response = await authService.changePassword(id, data);
                await res.status(response.statusCode).json(response);
            });
        });
    } catch (e) {
        next(e);
    }
}

const logout = async (req, res, next) => {
    try {
        const response = await authService.logout(req.token);
        await res.status(response.statusCode).json(response);
    } catch (e) {
        next(e);
    }
}

const checkLogin = async (req, res, next) => {
    try {
        const token = this.extractToken(req);

        req.user = await authService.checkLogin(token);
        req.authorized = true;
        req.token = token;
        next();
    } catch (e) {
        next(e);
    }
}

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

export default {
    login,
    register,
    changePassword,
    logout,
    checkLogin,
    extractToken,
    forgotPassword,
    resetPassword
}