import Header from "@/components/header";
import { Band, Genre } from "@/lib/types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
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
import { AppContext } from "@/App";
import { getGenreString } from "@/lib/utils";


const BandsPage = () => {
  const navigate = useNavigate();


  const [filteredBands, setFilteredBands] = useState<Band[]>([]);

  const [filterBandName, setfilterBandName] = useState<string>("");
  const [filterBandGenre, setfilterBandGenre] = useState<string>("");
  const [filterBandDateOrder, setfilterBandDateOrder] = useState<string>("");

  const {bands, setBands, genres, setGenres} = useContext(AppContext)

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

        setFilteredBands(req.data);
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
    let newBands = bands;
    if (filterBandName) {
      newBands = newBands.filter((band) =>
        band.name.toLowerCase().includes(filterBandName.toLowerCase())
      );
    }

    if (filterBandGenre != "none" && filterBandGenre) {
      newBands = newBands.filter((band) => band.genreCode == filterBandGenre);
    }

    console.log(filterBandDateOrder);
    if (filterBandDateOrder != "none" && filterBandDateOrder) {
      if (filterBandDateOrder == "newest") {
        newBands = [...newBands].sort((a, b) => b.year - a.year);
      } else {
        // create a copy of the array with [...newBands] and then sort it to avoid refresh problems on react
        newBands = [...newBands].sort((a, b) => a.year - b.year);
      }
    }

    setFilteredBands(newBands);
  }, [filterBandName, filterBandGenre, filterBandDateOrder]);



  return (
    <div className="w-full h-screen flex-col flex items-center">
      <Header />
      <div className="w-full md:w-3/4 xl:w-3/5  px-3 md:px-0 mt-3 flex flex-col md:flex-row sticky bg-white py-2 shadow-sm gap-2 top-0">
        <div className=" sticky md:block flex-[5]">
          <Input
            onChange={(e) => setfilterBandName(e.target.value)}
            placeholder="Name"
          ></Input>
        </div>
        <div className="flex-[3] flex flex-row">
          <Select onValueChange={(e) => setfilterBandGenre(e)}>
            <SelectTrigger>
              <SelectValue placeholder="All genres"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {genres.map((genre) => {
                return (
                  <SelectItem key={genre.code} value={genre.code}>
                    {genre.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Select onValueChange={(e) => setfilterBandDateOrder(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Date"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* <div className="flex-[1]">
         
        </div> */}

        {/* <Button onClick={e => filter(e)}>
          <Search></Search>
        </Button> */}
      </div>
      <div className="flex w-full md:w-3/4 xl:w-3/5 flex-col items-center m-0 pt-8 px-3 md:px-0 gap-2">
        {filteredBands.length > 0 ? (
          filteredBands.map((band) => {

            return (
              <BandItem
                onClick={()=>navigate(`/bands/${band.id}`)}
                key={band.id}
                band={band}
                genre={getGenreString(band.genreCode, genres)}
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
