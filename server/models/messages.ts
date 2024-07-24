import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  chatRoomId: {
    type: mongoose.Schema.ObjectId,
    ref: "Room",
  },
  senderId: {
    type: mongoose.Schema.ObjectId,
    ref: "Room",
  },
  content: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Messages = mongoose.model("message", chatSchema);

export default Messages;
