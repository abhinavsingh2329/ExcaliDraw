import { WebSocket, WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from '@repo/db/client';

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

const wss = new WebSocketServer({ port: 8080 });

const checkUser = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'string' || !decoded?.userId) return null;
    return decoded.userId;
  } catch (error) {
    return null;
  }
};

wss.on('connection', (ws, request) => {
  const url = request.url ?? '';
  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') ?? '';
  const userId = checkUser(token);

  if (!userId) {
    ws.close();
    return;
  }

  const newUser: User = { userId, rooms: [], ws };
  users.push(newUser);

  ws.on('message', async (data) => {
    let parsedData;
    try {
      parsedData = typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString());
    } catch (error) {
      console.error('Error parsing message:', error);
      return;
    }

    console.log('Message received:', parsedData);

    if (parsedData.type === 'join_room') {
      const user = users.find((x) => x.ws === ws);
      if (user) user.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === 'leave_room') {
      const user = users.find((x) => x.ws === ws);
      if (user) {
        user.rooms = user.rooms.filter((room) => room !== parsedData.roomId);
      }
    }

    if (parsedData.type === 'chat') {
      const { roomId, message } = parsedData;
      if (!roomId || !message) {
        console.error('Invalid chat data');
        return;
      }

      try {
        
        await prismaClient.chat.create({
          data: {
            roomId: Number(roomId),
            message,
            userId, 
          },
        });

       
        users.forEach((user) => {
          if (user.rooms.includes(roomId)) {
            user.ws.send(
              JSON.stringify({
                type: 'chat',
                message,
                roomId,
                sender: userId,
              })
            );
          }
        });
      } catch (error) {
        console.error('Error saving chat:', error);
      }
    }
  });

  ws.on('close', () => {
    const index = users.findIndex((user) => user.ws === ws);
    if (index !== -1) {
      users.splice(index, 1); 
    }
  });
});

console.log('WebSocket server started on ws://localhost:8080');
