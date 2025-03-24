const router  = require('express').Router()

const {createWomen, getAllWomen, getOneWomen, updateWomenProduct, deleteWomenProduct } = require('../controllers/womenController.js')

const upload = require('../utils/multer')


router.post('/createWomen', upload.single('womenImage'), createWomen)

router.get('/getAllWomen',  getAllWomen)

router.get('/getOneWomen/:id', getOneWomen)

router.put('/updateWomenProduct/:id',upload.single('womenImage'), updateWomenProduct)

router.delete('/deleteWomenProduct/:id',upload.single('womenImage'), deleteWomenProduct)

module.exports = router

