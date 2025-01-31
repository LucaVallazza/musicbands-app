import { Band } from "@/lib/types";
import { Music } from "lucide-react";

interface IProps {
  band: Band;
  genre: string | undefined;
  onClick : () => void
}

const BandItem = ({ band, genre, onClick }: IProps) => {
  return (
    <div onClick={onClick} 
         className="w-full flex flex-row text-left shadow-sm border-gray-50 border"
    >
      <div className="h-fit w-fit p-4">
        <div className="bg-gray-100 p-2 rounded-3xl">
          {/* <span style={{fontFamily : 'BarlowItalic'}} className="text-2xl" >
        {Math.floor(band.year / 10) * 10 % 100}'s
      </span> */}
          <Music size={30}></Music>
        </div>
      </div>
      <div className="h-auto justify-center flex-col flex w-full ">
        <h2 className="text-xl w-fit   font-semibold">{band.name}</h2>
        <p className="w-fit text-gray-400 text-sm">
          {genre} - {band.country}, {band.year}
        </p>
        <p className="w-fit text-gray-400 text-sm"></p>
      </div>
    </div>
  );
};

export default BandItem;
