import Conversation from "../models/conversation.mondel.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // get the id from url parameter
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [receiverId, senderId], // Do not need to add message: as its already difined in conversation model as empty array just need to push message id later.
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id); // Push only the ID of the created message to the conversation's messages array.
    }

    res.status(201).json(newMessage);

    await Promise.all([conversation.save(), newMessage.save()]);
  } catch (error) {
    console.log("Error in sendMessage conroller: ", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
