"use client"
import { useEffect,useState} from "react";
import { WS_URL } from "@/config";
import { Canvas } from "./Canvas";
export function RoomCanvas({roomId}:{roomId:string}){
  const [socket,setSocket]= useState <WebSocket|null>(null);

  useEffect(()=>{
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NzMwZDI0NC0xNjhmLTQ2Y2ItYTczOC0xNWMzMWNhYWU3NTYiLCJpYXQiOjE3Mzg0NjQ5MzN9.oCva0kcLIok59_RN59jV4aY2L2wWO24i10K8AtQi2ko`)
    ws.onopen=()=>{
      const data = JSON.stringify({
        type: "join_room",
        roomId
      });
      console.log(data);
      ws.send(data)
      setSocket(ws);
    }
  },[]);

  if(!socket){
    return <div>
      Connecting to server...
    </div>
  }
  return <div>
    <Canvas roomId={roomId} socket={socket}></Canvas>
  </div>
}