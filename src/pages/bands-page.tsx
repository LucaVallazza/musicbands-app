import Header from "@/components/header";
import { Band, Genre } from "@/lib/types";
import axios from "axios";
import { Filter, Music, Search, SortAsc, SortDesc } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import BandItem from "@/components/band-item";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const BandsPage = () => {
  const navigate = useNavigate();

  const [bands, setBands] = useState<Band[]>([]);
  const [filteredBands, setFilteredBands] = useState<Band[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  
  const [ascOrder , setAscOrder] = useState<Boolean>(true)
  const [bandName , setABandName] = useState<string>("")
  const [bandGenre , setBandGenre] = useState<string>("")


  useEffect(() => {
    getBands();
    getGenres();

    return () => {};
  }, []);

  const getBands = async () => {
    await axios.get("http://localhost:3000/bands").then((req) => {
      if (req.data) {
        console.log(req);
        setBands(req.data);
        setFilteredBands(req.data)
      }
    });
  };

  const getGenres = async () => {
    await axios.get("http://localhost:3000/genre").then((req) => {
      if (req.data) {
        console.log(req);
        setGenres(req.data);
      }
    });
  };

  // const filter = () =>{
  //   e.preventDefault()
    
  //   bands.find(band => (band.name == bandName))

  // }

  useEffect(() => {
    let newBands = bands
    if(bandName){
      newBands = newBands.filter(band => (band.name.toLowerCase().includes(bandName.toLowerCase())))
    }
    
    if(bandGenre != "none"){
      newBands = newBands.filter(band => (band.genreCode == bandGenre))
      console.log()
    }
    setFilteredBands(newBands)

    return () => {
      
    };
  }, [bandName, bandGenre, bands]);

  return (
    <div className="w-full h-screen flex-col flex items-center">
      <Header />
      <div className="flex w-3/4 mt-3 flex-row w-full sticky gap-2 top-0">
        <div className="flex-[5]">
          <Input onChange={e => setABandName(e.target.value)} placeholder="Name"></Input>
        </div>
        <div className="flex-[3]">
          <Select onValueChange={e => setBandGenre(e)}>
            <SelectTrigger>
              <SelectValue placeholder="All genres"></SelectValue>
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="none">
                None
              </SelectItem>
              {genres.map((genre) => {
                return <SelectItem value={genre.code}>{genre.name}</SelectItem>;
              })}
            </SelectContent>
          </Select>
        </div>
        {/* <div className="flex-1">
          <Button  variant={"secondary"} onClick={() => setAscOrder(!ascOrder)}>
            Year {ascOrder? <SortAsc></SortAsc> : <SortDesc></SortDesc>}
          </Button>
        </div> */}
        <Button onClick={e => filter(e)}>
          <Search></Search>
        </Button>
      </div>
      <div className="flex w-3/4 flex-col items-center m-0 pt-8 p-0 gap-2">
        {filteredBands.length > 0 ? (
          filteredBands.map((band) => {
            return (
              <BandItem
                band={band}
                genre={genres.find((g) => g.code == band.genreCode)?.name}
              />
            );
          })
        ) : (
          <h2 className="text-2xl m-10">No bands to show</h2>
        )}
      </div>
    </div>
  );
};

export default BandsPage;
