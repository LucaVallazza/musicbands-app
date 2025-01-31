import ProtectedRoute from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const BandsPage = () => {

  const navigate = useNavigate()

  const logout = (e) =>{
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <ProtectedRoute>
      <div>
        <h1>Bands page</h1>
        <Button onClick={logout}> Logout</Button>
      </div>
    </ProtectedRoute>
  );
};

export default BandsPage;
