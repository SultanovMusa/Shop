import Iphone from "@/assets/images/Iphone.png";
import Image from "next/image";
import { Court, Favorite, View } from "@/assets/icons/Icons";

export const ProductCard = (props) => {
  return (
    <div className="w-full h-fit p-1 bg-white shadow-lg rounded-md">
      <div className="rounded-xl w-full h-48 xs:h-36">
        <Image
          width={300}
          height={400}
          src={props.mainImage}
          alt="image"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="ml-1">
        <p className="text-sm">{props.price} сом</p>
        <p className="text-xs font-light">{props.name}</p>
      </div>
      <div className="w-full h-8 mt-2 overflow-hidden">
        <div className="flex items-center gap-1">
          <div className="bg-[#D9D9D9] w-full flex justify-center items-center py-1 rounded-3xl cursor-pointer">
            <Court color="#505050" />
          </div>
          <div className="w-fit bg-gray-20 p-1 rounded-full bg-[#D9D9D9] cursor-pointer">
            <Favorite color="#505050" />
          </div>
        </div>
      </div>
    </div>
  );
};
