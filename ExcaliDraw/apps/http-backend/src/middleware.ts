import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export const middleware = (req:Request,res:Response,next:NextFunction)=>{
  const token = req.headers["authorization"] ?? "";
  const decode = jwt.verify(token,JWT_SECRET)
  if(decode){
    //@ts-ignore
    req.userId=decode.userId;
    next();
  }
  else{
    res.status(403).json({
      message:"Not Authorized"
    })
  }
}