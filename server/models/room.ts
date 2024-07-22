import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  id: String,
  chat: [
    {
        text: String,
        sender: String,
        reciever: [String],
        date: Date,
        seen: Boolean
    }
  ],
});

const Room = mongoose.model("rooms", roomSchema);

export default Room;