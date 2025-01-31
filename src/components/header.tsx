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
    <div className=" w-full flex  flex-row justify-between py-2 px-4 shadow-md">
      <div className="flex">
        <Music size={20} className="my-auto mr-2"></Music>
        <h1 className="text-2xl font-semibold">Music Band App</h1>
      </div>
      <div>
        <Button variant={"secondary"} onClick={logout}>
          Logout <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default Header;
