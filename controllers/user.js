const userModel = require('../models/user')
const bcrypt  = require('bcryptjs')
const jwt =require('jsonwebtoken')
const { signUpTemplate ,forgotPassworTemplate } =require('../utils/mailTemplates')

exports.register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        const user = await userModel.findOne({email: email.toLowerCase()})
        if (user){
            return res.status(400).json({
                message: 'User Already exists'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = await userModel({
            fullName,
            email,
            password : hashedPassword
        })
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET, {expiresIn : '1d'})
        const link = `${req.protocol}://${req.get('host')}/api/v1/register/${token}`
        const firstName = user.fullName.split('')[0]
        const mailOptions = {
            email: user.email,
            subject: 'Welcome to our platform',
            message
        }
        await sendEmail(mailOptions)
        await user.save()

        res.status(201).json({
            message: 'User Created successfully',
            data : newUser
        })

    } catch (error) {
        res.status(500).json({
            message:'Internal Server Error' + error.message
        })
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        if (!token) {
            return res.status(400).json({
                message: 'Token not found'
            })
        };
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decodedToken.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        };

        user.isVerified = true;
        await user.save()
        res.status(200).json({
            message: 'User verified successfully'
        })
    }
    catch (error) {
        console.log(error.message)
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: 'Verification link expired'
            })
        }
        res.status(500).json({
            message: 'Error verifying User: ' + error.message
        })
    }
}


exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({
                message: 'Please enter email address'
            });
        }
        const user = await userModel.findOne({ email: email.toLowerCase() })
        if (user === null) {
            res.status(404).json({
                message: 'User Not Found'
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        const link = `${req.protocol}://${req.get('host')}/api/v1/reset-password/${token}`
        const firstName = user.fullName.split(' ')[0]
        const mailOptions = {
            subject: 'Password Reset',
            email: user.email,
            html: forgotPasswordTemplate(link, firstName)
        }
        await sendEmail(mailOptions)
        res.status(200).json({
            message: 'Password reset link initiated, Please check your mail box'
        })
    } catch (error) {
        console.log(error.message);
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({
                message: 'Verificarion link expired'
            })
        }
        res.status(500).json({
            message: 'Error Logging in User'
        });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;

        const { password, confirmPassword } = req.body;
        const { userId } = jwt.verify(token, process.env.JWT_SECRET,{expiresIn:'1h'})
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Password do not match'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        user.password = hashedPassword
        await user.save();

        res.status(200).json({
            message: 'Password reset successful'
        })

    } catch (error) {
        console.log(error.message);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: 'Verification link expired'
            })
        }
        res.status(500).json({
            message: 'Error reseting password'
        });

    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email.toLowerCase() });
        if (user === null) {
            return res.status(404).json({
                message: `User with email: ${email} does not exist`
            });
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (isCorrectPassword === false) {
            return res.status(400).json({
                message: "Incorrect Password"
            });
        }
        if (user.isVerified === false) {
            return res.status(400).json({
                message: "User not verified, Please check your email to verify"
            });
        }
        const token =  jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({
            message: 'Login successful',
            data: user,
            token
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error Logging in User',
            data : error.message
        });
    }
};


