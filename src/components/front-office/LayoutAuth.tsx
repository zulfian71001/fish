import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronsLeft } from "lucide-react";

type Props = {
  title: string;
  desc?: string;
  formLayout: React.ReactNode;
  gambar: StaticImageData;
  namelink?: string;
  link?: string;
};

const LayoutAuth = (props: Props) => {
  const { title, desc, formLayout, gambar, namelink, link } = props;
  return (
    <div className="w-full h-screen flex justify-center items-center gap-4">
      <Link className="absolute top-2 left-2 bg-cyan-500 text-white px-2 py-1 rounded-md group hover:bg-cyan-600 transition-all duration-300" href="/home">
      <ChevronsLeft className="group-hover:-translate-x-1 transition-all duration-300"/>
      </Link>
      <div className="hidden lg:w-1/2 lg:flex lg:justify-end lg:items-center relative">
        <Image src={gambar} alt="gambar" width={500} height={500} objectFit="contain"/>
      </div>
      <div className="w-1/2">
        <h2 className="font-semibold ">{title}</h2>
        <p>
          {desc}
          <span className="text-cyan-400 hover:text-cyan-500 p-1">
            <Link href={link || '/'}>{namelink}</Link>
          </span>
        </p>
        <div>{formLayout}</div>
      </div>
    </div>
  );
};

export default LayoutAuth;
