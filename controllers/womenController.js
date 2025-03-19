const womenModel = require('../models/womenProduct')
const cloudinary = require('../config/cloudinary')

const fs = require('fs')


exports.createWomen = async (req, res) => {
    try {
        
        const { description, price, category, sizes} = req.body
        
        const result = await cloudinary.uploader.upload(req.file.path)
        // fs.unlinkSync(req.file.path)

        const newProduct = new womenModel({
             
            description,
            price, 
            category,
            sizes,
            womenImage: {
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



exports.getAllWomen = async (req, res) => {
    try {
        
        const getProducts = await womenModel.find()

        res.status(200).json({message: 'find below all products for women', data: getProducts})


    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'internal server error' , error: error.message})
    }
}




exports.getOneWomen = async (req, res) => { 
    try {
        
        const {id} = req.params

        const product = await womenModel.findById(id)

        if(!product) {
            return res.status(404).json({message: 'product not found'})
        }

        res.status(200).json({message: ' find below the women product with the id', data: product})


    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'internal server error' , error: error.message})
    }
}





exports.updateWomenProduct = async (req, res) => {
    try {
        
        const {id} = req.params

        const { description, price, category, sizes} = req.body
        

        const product = await womenModel.findById(id)

        if(!product) {
            return res.status(404).json({message: 'product not found'})
           
        } else {
            if(req.file) {

                await cloudinary.uploader.destroy(product.womenImage.publicId)
            }
        }

        
        const result = await cloudinary.uploader.upload(req.file.path)
        // fs.unlinkSync(req.file.path)


        const data = {
            description,
            price, 
            category,
            sizes,
            womenImage: {
                imageUrl: result.secure_url,
                publicId: result.public_id
            }

        }

        const newUpdate = await womenModel.findByIdAndUpdate(id, data, {new: true})

        res.status(200).json({message: 'product has been updated successfully', data: newUpdate})


    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'internal server error' , error: error.message})
    }
}



exports.deleteWomenProduct = async (req, res) => {
    try {
        const { id} = req.params

        const product = await womenModel.findById(id)

        if(!product) { 
            return res.status(404).json({message: ' product not found'})
        }

        const deletedUser = await womenModel.findByIdAndDelete(id)

        
        if(deletedUser) {

            await cloudinary.uploader.destroy(product.womenImage.publicId)
        }

        res.status(200).json({message: 'product has been deleted successfully', data: deletedUser})


    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'internal server error' , error: error.message})
    }
}
