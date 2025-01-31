import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  
  if(localStorage.getItem('user')){
    return (children)
  }else return (<Navigate to={'/login'}></Navigate>)

};

export default ProtectedRoute;
