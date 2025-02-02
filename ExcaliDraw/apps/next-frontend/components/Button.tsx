
import { Config } from "tailwindcss";
import "tailwindcss";

interface buttonProps{
  text:string,
  size: "sm"|"md"|"lg",
  variant:"primary"|"secondary"|"tertiary",
  rounded:"yes"|"no",
  onClick:()=>null;
};
const variantStyles = {
  primary: "bg-blue-600 text-white text-md hover:bg-blue-700",
  secondary: "bg-gray-600 text-white text-md hover:bg-gray-800",
  tertiary: "bg-green-600 text-white text-md hover:bg-green-700",
};
const sizeStyles={
  sm:"px-4 py-1 text-sm",
  md:"px-6 py-2 text-md",
  lg:"px-8 py-3 text-lg"
};
export const Button = (props:buttonProps)=>{
  return <>
  <button className={`${sizeStyles[props.size]} ${variantStyles[props.variant]} ${props.rounded === "yes" ? "rounded-full" : "rounded-none"}`}>{props.text}</button>
  </>
}

