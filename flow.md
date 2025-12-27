1. User opens chat page
   └─▶ ConversationInitialization

2. WebSocket connects
   └─▶ clients.set(userId, ws)

3. User sends message
   └─▶ messageSent controller
        ├─ get conversation members
        ├─ get ws from clients map
        └─ ws.send()

4. Other users receive message instantly 

5. User closes chat
   └─▶ ConversationLeave
