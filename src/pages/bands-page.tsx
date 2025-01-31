import Header from "@/components/header";
import { Band, Genre } from "@/lib/types";
import axios from "axios";
import { AccessibilityIcon, Filter, Music, Search, SortAsc, SortDesc } from "lucide-react";
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
  const [filterBandName , setfilterBandName] = useState<string>("")
  const [filterBandGenre , setfilterBandGenre] = useState<string>("")
  const [filterBandDateOrder , setfilterBandDateOrder] = useState<string>("")


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
    
  //   bands.find(band => (band.name == filterBandName))

  // }

  useEffect(() => {
    let newBands = bands
    if(filterBandName){
      newBands = newBands.filter(band => (band.name.toLowerCase().includes(filterBandName.toLowerCase())))
    }
    

    if(filterBandGenre != 'none' && filterBandGenre){
      newBands = newBands.filter(band => (band.genreCode == filterBandGenre))
    }
    
    console.log(filterBandDateOrder)
    if(filterBandDateOrder != "none" && filterBandDateOrder){
      if (filterBandDateOrder == "newest") {
        newBands = [...newBands].sort((a,b) => b.year - a.year)
        
      }
      else{
        // create a copy of the array with [...newBands] and then sort it to avoid refresh problems on react
        newBands = [...newBands].sort((a,b) => a.year - b.year)
      }
    }
    
    setFilteredBands(newBands)

  }, [filterBandName, filterBandGenre, filterBandDateOrder]);


  const getGenreString = (genre : string) =>{
    const _genre = genres.find((g) => g.code == genre)?.name 

    return _genre ? _genre : genre
  }

  return (
    <div className="w-full h-screen flex-col flex items-center">
      <Header />
      <div className="flex w-3/4 mt-3 flex-row sticky gap-2 top-0">
        <div className="flex-[5]">
          <Input onChange={e => setfilterBandName(e.target.value)} placeholder="Name"></Input>
        </div>
        <div className="flex-[3]">
          <Select onValueChange={e => setfilterBandGenre(e)}>
            <SelectTrigger>
              <SelectValue placeholder="All genres"></SelectValue>
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="none">
                None
              </SelectItem>
              {genres.map((genre) => {
                return <SelectItem key={genre.code} value={genre.code}>{genre.name}</SelectItem>;
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-[1]">
        <Select onValueChange={e => setfilterBandDateOrder(e)} >
            <SelectTrigger>
              <SelectValue placeholder="Date"></SelectValue>
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="none">
                None
              </SelectItem>
              <SelectItem value="newest">
                Newest first
              </SelectItem>
              <SelectItem value="oldest">
                Oldest first
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* <Button onClick={e => filter(e)}>
          <Search></Search>
        </Button> */}
      </div>
      <div className="flex w-3/4 flex-col items-center m-0 pt-8 p-0 gap-2">
        {filteredBands.length > 0 ? (
          filteredBands.map((band) => {
            return (
              <BandItem
                key={band.id}
                band={band}
                genre={ getGenreString(band.genreCode) }
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
