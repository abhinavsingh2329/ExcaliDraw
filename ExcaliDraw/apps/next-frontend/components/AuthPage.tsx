import { Button } from "./Button"
import { Input } from "./Input"
export function AuthPage({isSignin}:{isSignin:boolean}){
  return <>
  
     <div className="flex flex-col items-center justify-center space-y-4 min-h-screen">
          <Input size="md" placeHolder="Enter Email" rounded="yes" />
          <Input size="md" placeHolder="Enter Password" rounded="yes" />
          <Button size="md" variant="tertiary" text={` ${isSignin===true?"Sign In":"Sign Up"} `} rounded="yes" onClick={()=>null}/>
        </div>
  
  </>
}