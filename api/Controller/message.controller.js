import createError from "../utils/createError.js";
import message from "../models/message.model.js";
import Conversation from "../models/Conversation.model.js";
export const createMessage = async (req, res, next) => {
    const newMessage = new message({
      conversationId: req.body.conversationId,
      userId: req.userId,
      desc: req.body.desc,
    });
    try {
      const savedMessage = await newMessage.save();
      await Conversation.findOneAndUpdate(
        { id: req.body.conversationId },
        {
          $set: {
            readbyseller: req.isSeller,
            readbybuyer: !req.isSeller,
            lastMessage: req.body.desc,
          },
        },
        { new: true }
      );
  
      res.status(201).send(savedMessage);
    } catch (err) {
      next(err);
    }
  };
  export const getMessages = async (req, res, next) => {
    try {
      const messages = await message.find({ conversationId: req.params.id });
      res.status(200).send(messages);
    } catch (err) {
      next(err);
    }
  };