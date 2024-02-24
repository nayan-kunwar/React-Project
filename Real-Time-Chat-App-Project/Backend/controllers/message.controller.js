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

// Get all messages of a specific user's conversation with another user
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id; // Get the id of logged in user from token which is set in cookie.

    // Find the conversation between these two users and populate it with its messages
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); //Actual messages will be here not reference.

    // console.log("Conversation: ", conversation);
    // console.log("Messages in Conversation: ", conversation.messages);

    if (!conversation) {
      return res.status(200).json([]); //Don't put {error: "User not found"} because what if logged in user does not have conversation with receiver.
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessages conroller: ", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
