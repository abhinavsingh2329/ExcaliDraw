import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../../components/ChatRoom";

async function getRoomId(slug: string) { 
  const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
  return response.data.room.id;
}

export default async function ChatRoom1({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;  // resolve the promise
  const slug = resolvedParams.slug;
  const roomId = await getRoomId(slug);
  console.log("roomId", roomId);
  return <ChatRoom id={roomId}></ChatRoom>;
}


