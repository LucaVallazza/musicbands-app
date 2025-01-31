import { Navigate } from "react-router";

const ProtectedRoute = ({ component }) => {
  
  if(localStorage.getItem('user')){
    return (component)
  }else return (<Navigate to={'/login'}></Navigate>)

};

export default ProtectedRoute;
