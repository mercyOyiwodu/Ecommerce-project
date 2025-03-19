const router = require('express').Router()
const { initializePayment, verifyPayment } = require('../controllers/paymentController');


const { authenticate } = require('../middlewares/authentication')



router.post("/payment",authenticate, initializePayment)

router.get("/payment/:reference",verifyPayment)

module.exports = router

