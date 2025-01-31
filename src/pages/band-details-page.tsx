import { AppContext } from "@/App";
import { Band } from "@/lib/types";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const BandDetailPage = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const {bands, genres , setBands, setGenres} = useContext(AppContext)
  const [band , setBand] = useState<Band | undefined>( undefined)


  
  useEffect(() => {
    
    try{
      const id = Number(location.pathname.split('/')[2])
      if(!bands || bands.length <= 0 || !id){
        navigate('/bands')
      }
      
      setBand(bands.find(b => (b.id == id)));
    }
    catch{
      navigate('/bands')
    }
    

    return () => {
      
    };
  }, [bands]);
  return ( 
  <div>
    {location.pathname.split('/')[2]}
    {band?.name}
  </div> );
}
 
export default BandDetailPage;