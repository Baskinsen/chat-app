import { Messages } from "~/server/models";

interface SendMessageRequest {
    content: string;
    sender: string;
    room: string;

}

export default eventHandler(async (event)=> {
    const body = (await readBody(event)) as SendMessageRequest;
    const message = {
        content: body?.content,
        sender: body?.sender,
        room: body?.room,
    };
    if (message) {
        try {
        const newMessage = await Messages.create(message);
        return {
            statusCode: 200,
            body: newMessage,
        };
        } catch (err) {
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to send message",
        });
        }
    }
})