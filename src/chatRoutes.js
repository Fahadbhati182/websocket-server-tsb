import express from "express";
import { ConversationInitialization, ConversationLeave, messageSent } from "./chatController.js";

const chatRoute = express.Router();

chatRoute.post("/conversation-init", ConversationInitialization);
chatRoute.post("/conversation-leave", ConversationLeave);
chatRoute.post("/message-sent", messageSent);

export default chatRoute;