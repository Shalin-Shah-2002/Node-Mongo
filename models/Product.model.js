const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required']
    },
    image: {
        type: String,
        required: false
    }

}
    , {
        timestamps: true
    }
);

// const pschema = mongoose.Schema({});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;