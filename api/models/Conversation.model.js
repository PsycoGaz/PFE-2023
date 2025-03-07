import mongoose from "mongoose";
const{Schema} = mongoose;

const conversationSchema = new Schema({
    id:{
        type: String,
        required: true,
        unique: true,
    }, 
    sellerid:{
        type: String,
        required: true,
       
    }, 
    buyerid:{
        type: String,
        required: true,
       
    }, 
    id:{
        type: String,
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
    lastMessage:{
        type: String,
        required: false,
    },
},
{
    timestamps: true,
});
export default mongoose.model("conversation", conversationSchema);