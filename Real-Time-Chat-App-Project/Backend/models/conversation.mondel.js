import mongoose from "mongoose";

const conversationSchema = mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //users collection document id will be saved here in array.
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message", //messages collection document id will be saved here in array.
        default: [] //Default  value for new conversations is an empty array of messages id.
      },
    ],
  },
   // createdAt and updatedAt field in db.
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
