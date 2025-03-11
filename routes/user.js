const { register, login, verifyEmail, forgotPassword, resetPassword } = require('../controllers/user')
const { authenticate } = require('../middlewares/authentication')

const router = require('express').Router()

router.post('/register', register)
router.get('/verify-user', verifyEmail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.post('/login',authenticate, login)

module.exports= router