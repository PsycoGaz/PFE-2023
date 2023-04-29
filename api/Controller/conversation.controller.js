//import createError from "../utils/createError"
import Conversation from "../models/Conversation.model.js";
export const createConversation = async (req, res, next) => {
    const newConversation = new Conversation({
        id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
        sellerid: req.isSeller ? req.userId : req.body.to,
        buyerid: req.isSeller ? req.body.to : req.userId,
        readbyseller: req.isSeller,
        readbybuyer: !req.isSeller,
    });


    try {
        const savedConverstation = await newConversation.save();
        res.status(201).send(savedConverstation);
    } catch (err) {
        next(err)
    }

}
export const updateConversation = async (req, res, next) => {
    
    try {
        const updatedConversation = await Conversation.findOneAndUpdate({id:req.params.id},
            {$set: {
                readbyseller: req.isSeller,
                readbybuyer: !req.isSeller,
            }},
            {new: true}
            );
        res.status(201).send(updatedConversation);
       
    } catch (err) {
        next(err)
    }

}
export const getSingleConversation = async (req, res, next) => {
    
 try {
      const conversation = await Conversation.findOne({id:req.params.id});  
      res.status(200).send(conversation);
    } catch (err) {
        next(err)
    }

}
export const getConversations = async (req, res, next) => {
try {
    const Conversations = await Conversation.find(req.isSeller ? {sellerid: req.userId} : {buyerid: req.userId});    
    res.status(200).send(Conversations);
    } catch (err) {
        next(err)
    }

}