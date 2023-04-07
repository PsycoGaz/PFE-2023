import mongoose from "mongoose";
const{Schema} = mongoose;

const messageSchema = new Schema({
    conversationid:{
        type: string,
        required: true,
        
    }, 
    userid:{
        type: string,
        required: true,
        
    }, 
    desc:{
        type: string,
        required: true,
        
    }, 
   
},
{
    timestamps: true,
});
export default mongoose.model("message", messageSchema);