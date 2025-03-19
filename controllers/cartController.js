const cartModel = require("../models/cart")
const userModel = require("../models/user")
const productModel =  require("../models/product")

exports.addToCart = async (req, res) => {
    try {
        const {productId, userId} = req.params
        const {quantity} = req.body

        let checkExistingCart = await cartModel.findOne({user: userId})
        if (!checkExistingCart) {
             checkExistingCart = new cartModel({
                user: userId,
                items: []
            })
        }
        const product = await productModel.findById(productId)
        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        };

        const checkContent = checkExistingCart.items.find((product) => product.productId.toString()=== productId)
        
        if(checkContent) {
            checkContent.quantity += quantity
        } else{
            checkExistingCart.items.push({productId, quantity})
        }
        await checkExistingCart.save()

        res.status(201).json({
            message: "Cart Created Successfully",
            data: checkExistingCart
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            data: error.message
        })
    }
}
