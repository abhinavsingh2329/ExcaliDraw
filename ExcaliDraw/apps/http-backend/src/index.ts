console.log("Jai Shree Ram");
import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import  {middleware}  from "./middleware";
import {CreateUserSchema,SignInSchema,RoomSchema} from "@repo/common/types"
const app=express();

app.post("/signup",(req,res)=>{

const userName = req.body.userName;
const password = req.body.password;
const data= CreateUserSchema.safeParse(req.body);
if(!data.success){
  res.json({
    message:"Incorrect inputs"
  })
  return;
}
res.json({
  "userName":userName
})
 
})
app.post("/signin",(req,res)=>{
  const userName = req.body.userName;
  const password = req.body.password;
  const data= SignInSchema.safeParse(req.body);
  if(!data.success){
  res.json({
    message:"Incorrect inputs"
  })
  return;
}
  const token = jwt.sign({userName},JWT_SECRET);
  res.json({token});
})
app.post("/room",middleware,(req,res)=>{
  const data= RoomSchema.safeParse(req.body);
if(!data.success){
  res.json({
    message:"Incorrect inputs"
  })
  return;
}
})
app.listen(8000);