import mongoose from "mongoose";
const productSechema = mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
    },
    image:{
        type: String,
        required: null

    }
},{ timestamps:true});

export default mongoose.model('products', productSechema)