import mongoose from 'mongoose';

var productschema = new mongoose.Schema({


        title: { type: String },
        dec: { type: String },
        categories: { type: Array },
        size: { type: Number },
        color: { type: String },
        price: { type: Number }

    },

    { timestamps: true }
);
//create model for mongoose
var productmodel = mongoose.model('product', productschema);


export default productmodel