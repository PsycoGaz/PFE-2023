import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
    gigId: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true,
    },
    buyerId: {
        type: String,
        required: true,
    },
    sellerId: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    isDelivered: {
        type: Boolean,
        default: false,
        required: true,
    },
    payment_intent: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    });
export default mongoose.model("order", orderSchema);