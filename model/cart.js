import mongoose from 'mongoose';

var cartschema = new mongoose.Schema({


        userId: { type: String, required: true },
        products: [

            {
                productId: {
                    type: string,
                },
                quantity: {
                    type: Number,
                    default: 1
                },
            }
        ]
    },

    { timestamps: true }
);
//create model for mongoose
var cartmodel = mongoose.model('cart', cartschema);


export default cartmodel