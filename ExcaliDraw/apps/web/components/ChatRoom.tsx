import axios from "axios";
import { BACKEND_URL } from "../app/config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChat(roomId: string) {
  try {
    console.log("Requesting URL:", `${BACKEND_URL}/chats/${roomId}`);
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    console.log("response", response); // This should now log even if the request succeeds.
    return response.data.messages;
  } catch (error) {
    console.error("Error fetching chat:", error);
    throw error;  // Re-throw the error to propagate it.
  }
}

export async  function ChatRoom({id}:{
  id:string
}){
  const messages= await getChat(id);
  return <ChatRoomClient id ={id} messages={messages}/>
}