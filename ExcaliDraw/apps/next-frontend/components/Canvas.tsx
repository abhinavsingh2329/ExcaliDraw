import { initDraw } from "@/draw";
import { useEffect,useRef, useState } from "react";
import { IconButton } from './IconButton';
import { Pencil,Circle,RectangleHorizontalIcon } from "lucide-react";
import { Game } from "@/draw/Game";
export type Tool="circle"|"rect"|"pencil";
export function Canvas({roomId,socket}:{
  roomId:string;
  socket:WebSocket;}){
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game,setGame] = useState<Game>();
  const [selectedTool,setSelectedTool]=useState<Tool>("pencil");
  useEffect(()=>{
    game?.setTool(selectedTool)
    
  },[selectedTool,game])

  useEffect(()=>{
    if(canvasRef.current){
      const game=new Game(canvasRef.current,roomId,socket);
      setGame(game);
      return()=>{
        game.destroy(); 
      }
    }
  },[canvasRef]);


  useEffect(()=>{
    if(canvasRef.current){
      initDraw(canvasRef.current,roomId,socket);
    }
  },[canvasRef]);
  return <div>
    <canvas ref={canvasRef} width={1280} height={631}></canvas>
    <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool}></Topbar>
  </div>
}

function Topbar({selectedTool,setSelectedTool}:{selectedTool:Tool,setSelectedTool:(s:Tool)=>void}){
  return <div style={{
    position:"fixed",
    top:10,
    left:10,
  }}>
    <div className="flex gap-2">
    <IconButton activated={selectedTool==="pencil"} icon={<Pencil/>} onClick={()=>{setSelectedTool("pencil")}}></IconButton>
    <IconButton activated={selectedTool==="rect"} icon={<RectangleHorizontalIcon/>} onClick={()=>{setSelectedTool("rect")}}></IconButton>  
    <IconButton activated={selectedTool==="circle"} icon={<Circle/>} onClick={()=>{setSelectedTool("circle")}}></IconButton>
    </div>
  </div>
}