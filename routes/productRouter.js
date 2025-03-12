const router  = require('express').Router()

const { createProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct} = require('../controllers/productController.js')

const upload = require('../utils/multer')


router.post('/createProduct', upload.single('image'), createProduct)

router.get('/getAllProducts',  getAllProducts)

router.get('/getOneProduct/:id', getOneProduct)

router.put('/updateProduct/:id',upload.single('image'), updateProduct)

router.delete('/deleteProduct/:id',upload.single('image'), deleteProduct)

module.exports = router

