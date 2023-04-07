import mongoose from "mongoose";
const{Schema} = mongoose;

const conversationSchema = new Schema({
    id:{
        type: string,
        required: true,
        unique: true,
    }, 
    sellerid:{
        type: string,
        required: true,
        unique: true,
    }, 
    buyerid:{
        type: string,
        required: true,
        unique: true,
    }, 
    id:{
        type: string,
        required: true,
        unique: true,
    }, 
    readbyseller:{
        type: Boolean,
        required: true,
    },
    readbybuyer:{
        type: Boolean,
        required: true,
    },
    readbybuyer:{
        type: string,
        required: false,
    },
},
{
    timestamps: true,
});
export default mongoose.model("conversation", conversationSchema);