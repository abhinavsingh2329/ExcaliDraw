import { type JSX } from "react";
interface InputProps{
  placeHolder?:string,
  size:"sm"|"md"|"lg",
  rounded:"yes"|"no"
}

const sizeStyles={
  sm: "px-2 py-1 text-sm text-black outline-none",  // Less inner padding
  md: "px-5 py-2 text-md text-black outline-none",
  lg: "px-6 py-2.5 text-lg text-black outline-none"
}

export const Input=(props:InputProps)=>{
  return(
    <>
    <input type="text" className={`${sizeStyles[props.size]} ${props.rounded==="yes"? "rounded-sm" : "rounded-none"}`}placeholder={props.placeHolder} />
    </>
  );
}