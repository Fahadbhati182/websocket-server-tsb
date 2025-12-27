import { clients } from "./server.js";
import { conversationMembers } from "./store.js";

export const ConversationInitialization = (req, res) => {
  try {
    const { conversationId, userId } = req.body;

    if (!conversationMembers.has(conversationId)) {
      conversationMembers.set(conversationId, new Set());
    }
    conversationMembers.get(conversationId).add(userId);
    console.log(
      "conversationMembers during conversation initialization----->",
      conversationMembers
    );
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

export const messageSent = (req, res) => {
  const { conversationId, message } = req.body;
  console.log(conversationId, message);

  const users = conversationMembers.get(conversationId);
  console.log(users);
  if (!users) return res.json({ delivered: 0 });

  let delivered = 0;

  users.forEach((userId) => {
    const ws = clients.get(userId);
    console.log(ws)
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
  console.log(delivered)
  res.json({ delivered });
};

export const ConversationLeave = (req, res) => {
  const { conversationId, userId } = req.body;

  const users = conversationMembers.get(conversationId);
  if (users) {
    users.delete(userId);

    if (users.size === 0) {
      conversationMembers.delete(conversationId);
    }
  }

  console.log(
    "conversationMembers during conversation leave----->",
    conversationMembers
  );
  res.json({ success: true });
};
