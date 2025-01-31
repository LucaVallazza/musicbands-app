import Header from "@/components/header";
import { Band, Genre } from "@/lib/types";
import axios from "axios";
import { Music } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Guitar,
  Radio,
  Flame,
  Gavel,
  Skull,
  Sword,
  Moon,
  Infinity,
  Cross,
} from "lucide-react";
import BandItem from "@/components/band-item";

const BandsPage = () => {
  const navigate = useNavigate();

  const [bands, setBands] = useState<Band[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const genresIcons = {
    rock: <Guitar size={30} />,
    "rock-roll": <Radio size={30} />,
    "hard-rock": <Flame size={30} />,
    grunge: <Gavel size={30} />,
    "heavy-metal": <Skull size={30} />,
    "power-metal": <Sword size={30} />,
    "black-metal": <Moon size={30} />,
    "progressive-metal": <Infinity size={30} />,
    "goth-metal": <Cross size={30} />,
  };

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

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="w-full flex flex-col items-center m-0 p-0 gap-2">
        {bands.length > 0 ? (
          bands.map((band) => {
            return (
              <BandItem band={band} genre={genres.find((g) => g.code == band.genreCode)?.name} />
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
