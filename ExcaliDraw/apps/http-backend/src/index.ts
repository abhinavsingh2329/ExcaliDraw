console.log("Jai Shree Ram");
import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import  {middleware}  from "./middleware";
import {CreateUserSchema,SignInSchema,RoomSchema} from "@repo/common/types";
import {prismaClient} from "@repo/db/client";

const app=express();
app.use(express.json());
app.post("/signup",async(req,res)=>{

const userName = req.body.userName;
const password = req.body.password;
const ParsedData= CreateUserSchema.safeParse(req.body);
if(!ParsedData.success){
  res.json({
    message:"Incorrect inputs"
  })
  return;
}
try {
  await prismaClient.user.create({
      data :{
        email:ParsedData.data.username,
        password:ParsedData.data.password,
        name:ParsedData.data.name,
        photo:ParsedData.data.image
  
      }
  })
  res.json({
    "userName":userName
  })
  
} catch (error) {
  res.status(411).json({
    "message":"User already Exists"
  })
}
})


app.post("/signin",async (req,res)=>{
  const userName = req.body.userName;
  const password = req.body.password;

  const ParsedData= SignInSchema.safeParse(req.body);

  if(!ParsedData.success){
  res.json({
    message:"Incorrect inputs"
  })
  return;
  }
   const user = await  prismaClient.user.findFirst({
    where:{
      email:ParsedData.data.username,
      password:ParsedData.data.password
    }
  })

  if(!user){
    res.status(403).json({
      "message":"User not authorised"
    })
  }
  const token = jwt.sign({userId:user?.id},JWT_SECRET);
  res.json({token});  
})


app.post("/room",middleware,async (req,res)=>{
  const ParsedData= RoomSchema.safeParse(req.body);
if(!ParsedData.success){
  res.json({
    message:"Incorrect inputs"
  })
  return;
}
//@ts-ignore
const userId = req.userId;
try {
  const room = await prismaClient.room.create({
    data:{
      slug:ParsedData.data.name,
      adminId:userId
    }
  })
  res.json({
    roomId:room.id
  })
} catch (error) {
  res.status(411).json({
    "message":"Room already exists with this name"
  })
}
})
app.get("/chats/:roomId",async (req,res)=>{
  try {
    const roomId = Number (req.params.roomId);
    const messages = await prismaClient.chat.findMany({
    where:{
      roomId:roomId
    },
    orderBy:{
      id:"desc"
    },
    take:50
  }) 
  } catch (error) {
    res.json({
      messages:[]
    })
  }
})

app.get("/room/:slug", async (req,res)=>{
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where:{
      slug
    }
  });
  res.json({
    room
  })
})
app.listen(8000);