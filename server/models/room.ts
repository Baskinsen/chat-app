import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  id: String,
  description: String,
  members: [{type: mongoose.Schema.ObjectId, ref: "users"}],
  createdAt: { type: Date, default: Date.now },
});

const Room = mongoose.model("rooms", roomSchema);

export default Room;