import Image from "next/image";
import Link from "next/link";
import { Carousel } from "flowbite-react";

const Banner = () => {
  return (
    <div className=" flex h-56 sm:h-64 xl:h-[600px] 2xl:h-[800px] my-6 object-center object-contain">
      <Carousel className="w-full h-full">
        {
          [1,2,3].map((img:any, i:number) => (
            <Image
            key={i}
            src={`/images/banner${img}.png`}
            alt="gambar"
            width={500}
            height={500}
            objectFit="contain"
            objectPosition="center"
            className="w-full h-full"
          />
          ))
        }
      </Carousel>
    </div>
  );
};

export default Banner;
