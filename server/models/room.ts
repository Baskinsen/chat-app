import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  id: String,
  members: [{ type: mongoose.Schema.ObjectId, ref: "users" }],
  createdAt: { type: Date, default: Date.now },
});

const Room = mongoose.model("rooms", roomSchema);
Room.syncIndexes();
export default Room;
