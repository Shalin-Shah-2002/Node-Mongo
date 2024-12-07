const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/Product.model');




app.use(express.json());

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})

// connect the database MongoDB

mongoose.connect('mongodb+srv://admin:admin@node-api.gee9y.mongodb.net/Mongodb-API-Practice?retryWrites=true&w=majority&appName=Node-API').then(() => {
    console.log('Connected to Database');
}).catch((err) => {
    console.log(err);
})

app.get('/', (req, res) => {
    res.send({
        message: 'Hello World from Node.js'
    });
})


// Creating a product

app.post('/api/products', async (req, res) => {
    // console.log(req.body);
    // res.send({
    //     message: 'Product Created',
    //     "product": req.body
    // });
    try {
        const product = await Product.create(req.body);
        res.status(200).send(
            {
                message: 'Product Created',
                "product": product
            }
        );
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})

// Fetching all products at once

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).send({
            message: 'Products Fetched',
            "products": products
        })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});


// finding products by thier ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).send({
            message: 'Product Fetched',
            "product": product
        })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})

// Updating the product by id

app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true
        });


        const product_updated = await Product.findById(id);
        res.status(200).send({
            message: 'Product Updated',
            "product": product_updated
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})

// delete the product by their id

app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        res.status(200).send({
            message: 'Product Deleted',
            "product": product
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})