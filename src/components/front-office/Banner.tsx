import Image from "next/image";
import { Carousel } from "flowbite-react";

const Banner = () => {
  return (
    <div className=" flex h-56 sm:h-64 xl:h-[400px] 2xl:h-[600px] my-6 object-center object-contain">
      <Carousel className="w-full h-full">
        {
          [1,2,3].map((img:any, i:number) => (
            <Image
            key={i}
            src={`/images/Utama${img}.jpg`}
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
