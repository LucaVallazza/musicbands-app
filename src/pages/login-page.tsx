import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LogIn, Music } from "lucide-react";
import { useNavigate } from "react-router";

const LogInPage = () => {
  
  const navigate = useNavigate()

  const logIn = (e : any) =>{
    e.preventDefault()
    console.log("mail: " +e.nativeEvent.srcElement[0].value)
    navigate('/bands')
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
          <form onSubmit={e => logIn(e)} className="flex flex-col gap-2">
            <Input placeholder="Email" type="email"></Input>
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