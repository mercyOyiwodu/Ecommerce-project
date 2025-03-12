const router = require('express').Router()
const { initializePayment, verifyPayment } = require('../controllers/paymentController');

const { register, login, verifyEmail, forgotPassword, resetPassword, resendVerificationEmail } = require('../controllers/user')
const { authenticate } = require('../middlewares/authentication')


router.post('/register', register)
router.get('/user-verify/:token', verifyEmail)
router.post('/resendverificationemail', resendVerificationEmail)
router.post('/forget-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.post('/login', login)



router.post("/payment",authenticate, initializePayment)

router.get("/payment/:reference",verifyPayment)

module.exports = router

