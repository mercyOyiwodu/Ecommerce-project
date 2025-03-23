const router  = require('express').Router()

const { createProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct} = require('../controllers/productController.js')

const { authenticate } = require('../middlewares/authentication')

const upload = require('../utils/multer')


/**
 * @swagger
 * /api/v1/createProduct:
 *   post:
 *     summary: this is the product creation route
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: this is the category name of the product
 *                 example: male fashion
 *               price:
 *                 type: string
 *                 description: this is the price of the product
 *                 example: 3000
 *               description:
 *                 type: string
 *                 description: this is the description name of the product
 *                 example: nike air
 *               sizes:
 *                 type: string
 *                 description: this are the sizes of the product
 *                 example: 56,78,34
 *               image:
 *                 type: string
 *                 format: binary
 *                 example: nike air shoe
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         required: true
 *         schema:
 *           type: string
 *         description: Token required for authentication
 *         example: Bearer <your_token>
 *     responses:
 *       201:
 *         description: products created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category:
 *                   type: string
 *                   description: this is the category name of the product
 *                   example: male fashion
 *                 price:
 *                   type: string
 *                   description: this is the price of the product
 *                   example: 3000
 *                 description:
 *                   type: string
 *                   description: this is the description name of the product
 *                   example: nike air
 *                 sizes:
 *                   type: string
 *                   description: this are the sizes of the product
 *                   example: 56,78,34
 *                 image:
 *                   type: string
 *                   format: binary
 *                   example: The image of the product
 *       500:
 *         description: error creating products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: internal server error
 * 
 * 
 * 
 */




router.post('/createProduct',authenticate, upload.single('image'), createProduct)

/**
 * @swagger
 * /api/v1/getAllProducts:
 *   get:
 *     summary: Retrieve all products
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         required: true
 *         schema:
 *           type: string
 *         description: Token required for authentication
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Successfully retrieved all products
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: error getting all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: internal server error
 */


router.get('/getAllProducts',  getAllProducts)

/**
 * @swagger
 * /api/v1/getOneProduct/{id}:
 *   get:
 *     summary: Retrieve a single product by ID
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve
 *       - name: "Authorization"
 *         in: "header"
 *         required: true
 *         schema:
 *           type: string
 *         description: Token required for authentication
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Successfully retrieved the product
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: error getting one product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: internal server error
 */

router.get('/getOneProduct/:id', getOneProduct)


/**
 * @swagger
 * /api/v1/updateProduct/{id}:
 *   put:
 *     summary: Update a product by ID
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update
 *       - name: "Authorization"
 *         in: "header"
 *         required: true
 *         schema:
 *           type: string
 *         description: Token required for authentication
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: The category name of the product
 *                 example: male fashion
 *               price:
 *                 type: string
 *                 description: The price of the product
 *                 example: 3000
 *               description:
 *                 type: string
 *                 description: The description of the product
 *                 example: nike air
 *               sizes:
 *                 type: string
 *                 description: The sizes of the product
 *                 example: 56,78,34
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image of the product
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input or missing fields
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: error updating product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: internal server error
 */


router.put('/updateProduct/:id', authenticate, upload.single('image'), updateProduct)

/**
 * @swagger
 * /api/v1/deleteProduct/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete
 *       - name: "Authorization"
 *         in: "header"
 *         required: true
 *         schema:
 *           type: string
 *         description: Token required for authentication
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: error deleting product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: internal server error
 */

router.delete('/deleteProduct/:id',authenticate, deleteProduct)

module.exports = router

