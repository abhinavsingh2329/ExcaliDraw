import axios from "axios";
import {HTTP_BACKEND} from "@/config";
export async function getExistingShapes(roomId:string) {
  const res=axios.get(`${HTTP_BACKEND}/chats/${roomId}`)
  const messages=(await res).data.messages;

  const shapes= messages.map((x:{message:string})=>{
    const messageData=JSON.parse(x.message)
    return messageData.shape;
  })
  return shapes ;
}
