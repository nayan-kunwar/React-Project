import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  }, 
  // createdAt and updatedAt field in db.
  { timestamps: true }
);

//Make a messages collection in db on basis of messageSchema
const Message = mongoose.model("Message", messageSchema);
export default Message;
