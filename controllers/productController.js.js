// const userModel = require('../models/user')
const productModel = require('../models/product')
const cloudinary = require('../config/cloudinary')
const fs = require('fs')


exports.createProduct = async (req, res) => {
    try {
        
        const { description, price, category, sizes} = req.body
        
        const result = await cloudinary.uploader.upload(req.file.path)
        // fs.unlinkSync(req.file.path)

        const newProduct = new productModel({
             
            description,
            price, 
            category,
            sizes,
            image: {
                imageUrl: result.secure_url,
                publicId: result.public_id
            }

        })

        await newProduct.save()
        
        res.status(201).json({message: 'product created successfully', data: newProduct})



    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'internal server error' , error: error.message})
        
    }
}



exports.getAllProducts = async (req, res) => {
    try {
        
        const getProducts = await productModel.find()

        res.status(200).json({message: 'find below all products', data: getProducts})


    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'internal server error' , error: error.message})
    }
}



exports.getOneProduct = async (req, res) => { 
    try {
        
        const {id} = req.params

        const product = await productModel.findById(id)

        if(!product) {
            return res.status(404).json({message: 'product not found'})
        }

        res.status(200).json({message: ' find below the product with the id', data: product})


    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'internal server error' , error: error.message})
    }
}




exports.updateProduct = async (req, res) => {
    try {
        const {id} = req.params

        const { description, price, category, sizes} = req.body
        

        const product = await productModel.findById(id)

        if(!product) {
            return res.status(404).json({message: 'product not found'})
           
        } else {
            if(req.file) {

                await cloudinary.uploader.destroy(product.image.publicId)
            }
        }

        
        const result = await cloudinary.uploader.upload(req.file.path)
        // fs.unlinkSync(req.file.path)


        const data = {
            description,
            price, 
            category,
            sizes,
            image: {
                imageUrl: result.secure_url,
                publicId: result.public_id
            }

        }

        const newUpdate = await productModel.findByIdAndUpdate(id, data, {new: true})

        res.status(200).json({message: 'product has been updated successfully', data: newUpdate})


    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'internal server error' , error: error.message})
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        const { id} = req.params

        const product = await productModel.findById(id)

        if(!product) { 
            return res.status(404).json({message: ' product not found'})
        }

        const deletedUser = await productModel.findByIdAndDelete(id)

        
        if(deletedUser) {

            await cloudinary.uploader.destroy(product.image.publicId)
        }

        res.status(200).json({message: 'product has been deleted successfully', data: deletedUser})


    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'internal server error' , error: error.message})
    }
}



