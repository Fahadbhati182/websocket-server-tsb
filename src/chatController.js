import redis from "./redis.js";
import { clients } from "./server.js";

export const ConversationInitialization = async (req, res) => {
  try {
    const { conversationId, userId } = req.body;

    await redis.sadd(`conversation:${conversationId}`, userId);   

    console.log(
      "conversation members:",
      await redis.smembers(`conversation:${conversationId}`)
    );

    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};

export const messageSent = async (req, res) => {
  const { conversationId, message } = req.body;
  console.log(conversationId, message);

  const users = await redis.smembers(`conversation:${conversationId}`);
  console.log(users);
  if (!users) return res.json({ delivered: 0 });

  let delivered = 0;

  users.forEach((userId) => {
    const ws = clients.get(userId);
    console.log(ws);
    if (ws && ws.readyState === 1) {
      ws.send(
        JSON.stringify({
          type: "NEW_MESSAGE",
          payload: message,
        })
      );
      delivered++;
    }
  });
  console.log(delivered);
  res.json({ delivered });
};

export const ConversationLeave = async (req, res) => {
  const { conversationId, userId } = req.body;

  await redis.srem(`conversation:${conversationId}`, userId);

  const remaining = await redis.scard(`conversation:${conversationId}`);

  if (remaining === 0) {
    await redis.del(`conversation:${conversationId}`);
  }

  res.json({ success: true });
};
