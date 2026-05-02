import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      //to mówi ze type to bedzie id obiektu innego modelu, a ref mowi jakiego modelu
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
