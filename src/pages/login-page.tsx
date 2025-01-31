import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LogIn, Music } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const LogInPage = () => {
  
  const [userError , setuserError] = useState(false)
  const [passwordError , setPasswordError] = useState(false)
  const navigate = useNavigate()


  //mock login
  const logIn = (e) =>{
    e.preventDefault()

    const user = e.nativeEvent.srcElement[0].value
    const password = e.nativeEvent.srcElement[1].value
    
    if(user && password){
      localStorage.setItem('user' , user)
      navigate('/bands')
    }

    setuserError(!user)
    setPasswordError(!password)
  }

  return ( 
    <div className="flex flex-col w-screen h-screen">
      <Card className="m-auto w-96">
        <CardHeader>
          <div className="flex">
            <Music size={20} className="my-auto mr-2"></Music>
            <h1 className="text-2xl font-semibold">Music Band App</h1>

          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={e => logIn(e)} className=" flex flex-col gap-2">
            {userError ? <p className="text-sm text-red-500 text-left">Enter a valid username</p> : ''}
            <Input placeholder="Username"></Input>
            {passwordError ? <p className="text-sm text-red-500 text-left">Enter a password</p> : ''}
            <Input placeholder="Password" type="password"></Input>
            <Button className="mt-2">
              Login
              <LogIn></LogIn>  
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
   );
}
 
export default LogInPage;