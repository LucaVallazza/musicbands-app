import { AppContext } from "@/App";
import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Album, Band } from "@/lib/types";
import { getGenreString } from "@/lib/utils";
import axios from "axios";
import { AlbumIcon, Disc, DiscAlbum, Music, User, Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const BandDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bands, genres, setBands, setGenres } = useContext(AppContext);
  const [band, setBand] = useState<Band | undefined>(undefined);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/albums").then((req) => {
      try {
        const id = Number(location.pathname.split("/")[2]);
        const _albums = req.data as Album[];
        // filter the albums by bandId
        setAlbums(_albums.filter((album) => album.bandId == id));
        console.log(_albums.filter((album) => album.bandId == id));
      } catch (e) {
        console.log(e);
        navigate("/bands");
      }
    });
  }, []);

  useEffect(() => {
    try {
      const id = Number(location.pathname.split("/")[2]);
      if (!bands || bands.length <= 0 || !id) {
        navigate("/bands");
      }

      setBand(bands.find((b) => b.id == id));
    } catch {
      navigate("/bands");
    }

    return () => {};
  }, [bands]);
  return (
    <div className="w-full h-screen flex-col flex items-center text-left">
      <Header></Header>

      <div className=" w-3/4 xl:w-1/2 flex-col flex items-center">
        <Card className="w-full m-0 p-4 mt-10">
          <div className="w-fit">
            <div className="mr-auto ml-0 bg-gray-200 p-5 shadow-md">
              <Music size={70} color="#999"></Music>
            </div>
          </div>
          {/* Name and year */}
          <div className="w-full mt-5">
            <h1 className="text-2xl font-bold">{band?.name}</h1>
            <p className="text-gray-500 text-sm">
              {getGenreString(band?.genreCode, genres)} • Formed in {band?.year}{" "}
            </p>
          </div>
        </Card>

        {/* Data */}

        <div className="w-full flex flex-col gap-5 md:flex-row justify-between mt-5">

          
        <Card className="w-full md:w-[49%] h-full flex-col flex items-start p-4">
          {/* Members */}
          <div className="">
            <div className="flex flex-row">
              <Users size={20} className="my-0 self-center mr-2"></Users>
              <h2 className="text-lg font-semibold">Members</h2>
            </div>
            <div className="flex h-fit flex-col pt-4 gap-4">
              {band?.members.length > 0 ? band?.members.map((member) => (
                <div className="flex flex-row">
                  <div>
                    <div className="bg-gray-200  mr-4 p-2 rounded-3xl">
                      <User size={20} color="#999"></User>
                    </div>
                  </div>

                  <div className="self-center font-semibold">{member.name}</div>
                </div>
              )) :
              <p className="text-sm pl-2 italic">No albums to show.</p>
              }
            </div>
          </div>
          </Card>


          

          {/* Albums */}

          <Card className="w-full md:w-[49%] h-full flex-col flex items-start p-4">

          <div className="flex flex-row selfcen ">
              <DiscAlbum
                size={20}
                className="my-0 self-center mr-2"
              ></DiscAlbum>
              <h2 className="text-lg font-semibold">Albums</h2>
            </div>
            <div className="flex h-fit flex-col pt-4 gap-4">
              {albums.length > 0 ? albums?.map((album) => (
                <div className="flex flex-row">
                  <div className="self-center">
                    <div className="bg-gray-200  mr-4 p-2 rounded-3xl">
                      <Disc size={20} color="#999"></Disc>
                    </div>
                  </div>

                  <div className="self-center ">
                    <h3 className="font-semibold">{album.name}</h3>
                    <p className="text-gray-500 text-sm">{album.year}</p>
                  </div>
                </div>
              )) : 
              <p className="text-sm pl-2 italic">No albums to show.</p>}
            </div>
   

          </Card>
        </div>
      </div>
    </div>
  );
};

export default BandDetailPage;
