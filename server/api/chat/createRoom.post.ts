import { Room } from "../../models/index";

interface CreateRoomRequest {
  members: string[];
}

export default eventHandler(async (event) => {
  const body = (await readBody(event)) as CreateRoomRequest;
  const room = {
    members: body?.members,
  };
  if (room) {
    try {
      const newRoom = await Room.create(room);
      return {
        statusCode: 200,
        body: newRoom,
      };
    } catch (err) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to create room",
      });
    }
  }
});
