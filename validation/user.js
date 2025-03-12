const joi = require('joi')

exports.registerSchema = joi.object().keys({
    fullName: joi.string().min(3).max(27).required(),
    email: joi.string().trim().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required().valid(joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
    })
   
})


exports.loginSchema = joi.object().keys({
    email: joi.string().trim().min(3).email().required(),
    password: joi.string().required(),
    
})


exports.verificationEmailSchema = joi.object().keys({
    email: joi.string().trim().min(6).email().required(),

})


exports.forgotPasswordSchema = joi.object().keys({
    email: joi.string().trim().min(6).email().required(),

})



exports.resetPasswordschema = joi.object().keys({
    password: joi.string().required(),
    confirmPassword: joi.string().required().valid(joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
    })
})



