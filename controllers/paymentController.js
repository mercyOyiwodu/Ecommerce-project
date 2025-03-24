const paymentModel = require("../models/paymentModel");
const axios = require("axios");
const productModel = require("../models/product");
const userModel = require("../models/user");
const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY
const apiUrl = 'https://api.paystack.co/transaction/initialize'
const formattedDate = new Date().toLocaleString()



exports.initializePayment = async (req, res) => {
    try {
        const { amount, email } = req.body

        const paymentData = {
            email,
            amount: amount * 100,
        }

        const response = await axios.post(apiUrl, paymentData,{
                headers:{Authorization: `Bearer ${SECRET_KEY}`}
            })

            const { data } = response;

            const payment = new paymentModel({
                email,
                amount,
                reference: data?.data?.reference,
                paymentDate: formattedDate
            })

            await payment.save()
            
            res.status(201).json({
                message: "Payment initialized",
                data : {
                    authorizationUrl: data?.data?.authorization_url,
                    reference: data?.data?.reference
                },
                transactionDetails: payment

            })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: "Error initializing payment"
        })

    }
}




exports.verifyPayment = async (req, res) => {
    try {
        const  reference  = req.params.reference

        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: { Authorization: `Bearer ${SECRET_KEY}` }
        })

        const { data } = response
        
        if(data?.data?.status && data?.data?.status === 'success'){
            const transaction = await paymentModel.findOneAndUpdate({ reference }, { status: 'Successful' }, { new: true })
            res.status(200).json({message: 'Payment successful', data: transaction})

        }else {
            const transaction = await paymentModel.findOneAndUpdate({ reference }, { status: 'Failed' }, { new: true })
            res.status(400).json({message: 'Payment failed', data: transaction})
        }


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'error verifying payment' })
    }
}










// exports.initializePayment = async (req, res) => {
//     try {

//         const products = req.body.items.filter((x) => x);

//            let totalPrice = 0; // Initialize total price

//            // Loop through each product and fetch from DB
//          for (let index = 0; index < products.length; index++) {
//          const product = await productModel.findOne({ _id: products[index] });

//         if (product && product.ProductPrice) {
//         totalPrice += product.ProductPrice; // Add product price to total
//          }
//         }

//            console.log("Total Product Price:", totalPrice);

//           const email= await userModel.findOne({_id:req.user.userId})
//            console.log(email)
//          const createPayment = await axios.post(apiUrl, { email: email.email, amount: totalPrice*10 },{ headers:{ Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`}})
//           // console.log(createPayment);

//           res.status(201).json({
//             authorizationUrl: createPayment.data.data.authorization_url
//          })


//     } catch (error) {
//         console.log(error)

//         res.status(500).json({
    //             message: "Internal server Error"
    //         })
    //     }
    // }
    
    
    
    // exports.verifyPayment = async (req, res) => {
    //     try {
    //         const reference = req.params.reference
    
    //         const createPayment = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET}` } })
    //         console.log(createPayment);
            
    //         res.status(201).json({
    //             authorizationUrl: createPayment.data.data.authorization_url
    //         })
    
    //     } catch (error) {
    //         console.log(error.message)
    //         res.status(500).json({ message: 'Internal Server Error' })
    //     }
    // }