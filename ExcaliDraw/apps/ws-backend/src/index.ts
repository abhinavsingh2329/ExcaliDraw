console.log("Jai Shree Ram");
import { WebSocketServer,WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
const wss = new WebSocketServer({ port: 9004 });

interface User{
  roomId:string,
  socket:WebSocket
}

let users:User[]=[]


wss.on('connection', (socket,req)=> {
  const url =req.url;
  if(!url){
    return;
  }

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token')??"";
  const decoded = jwt.verify(token,JWT_SECRET);
  if(typeof decoded=='string'){
    wss.close();
    return;
  }
  if(!decoded || !decoded.userId){
    wss.close();
    return;
  }
  console.log("listening");
  
  socket.on('message',(msg)=> {
    const parsedMesg=JSON.parse(msg.toString());
    if(parsedMesg.type==="join"){
      users.push({
        socket,
        roomId:parsedMesg.payload.room
      })
      console.log(`User joined room: ${parsedMesg.payload.room}`);
    }
    if(parsedMesg.type==="chat"){
      const CurrentUserRoom = users.find((x)=>x.socket===socket);
      if(CurrentUserRoom){
        const allUsersRoom=users.filter((x)=>x.roomId===CurrentUserRoom.roomId);
        allUsersRoom.forEach((user)=>{
          user.socket.send(parsedMesg.payload.message);
        })
      } 
    }
  });

});