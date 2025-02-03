import { LogOut, Music } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  
  const logout = (e) => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className=" w-full flex  flex-row justify-between py-2 px-4 md:px-8 shadow-md">
      <div className="flex cursor-pointer" onClick={()=> navigate('/bands')}>
        <Music size={20} className="my-auto self-center mr-2"></Music>
        <h1 className=" self-center text-left text-lg md:text-2xl font-semibold">Music Band App</h1>
      </div>
      <div>
        <Button variant={"destructive"} onClick={logout}>
          <span className="hidden md:block">Logout</span>
           <LogOut />
        </Button >
      </div>
    </div>
  );
};

export default Header;
