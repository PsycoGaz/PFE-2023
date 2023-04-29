import mongoose from "mongoose";
const{Schema} = mongoose;

const gigSchema = new Schema({
    userId:{
        type: String,
        required: true,
    },
    gigTitle:{
        type: String,
        required: true,
    },
    gigDescription:{
        type: String,
        required: true,
    },
    totalStars:{
        type: Number,
        required: false,
    },
    starNumber:{
        type: Number,
        required: false,

    },
    category:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },

    cover:{
        type: String,
        required: true,
    },
    gigImages:{
        type: [String],
        required: false,
    },
    shortDescription:{
        type: String,
        required: true,
    },
    deliveryTime:{
        type: String,
        required: false,
    },
    revisionNumber:{
        type: Number,
        required: false,
    },
    Features:{
        type: [String],
        required: false,
    },
    sales:{
        type: Number,
        default: 0,
    },
    shortTile:{
        type: String,
        required: false,},
},
{
    timestamps: true,
});
export default mongoose.model("gig", gigSchema);