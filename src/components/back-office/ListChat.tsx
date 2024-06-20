import React from "react";
import Heading from "./Heading";
import Image from "next/image";
import gambar from "@/assets/user.png";

const ListChat = () => {
  return (
    <div className="bg-white p-8 space-y-4 rounded-xl text-white">
      <div className="flex justify-between items-center">
        <Heading title="Chat terakhir" />
        <p>view all</p>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex gap-2">
          <Image src={gambar} alt="gambar" className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-4 justify-center p-4 rounded-2xl w-full bg-cyan-700">
            <div className="flex items-center justify-between w-full">
              <p className="text-lg">Admin</p>
              <p>2 days ago</p>
            </div>
            <div className="flex items-center p-4 backdrop-blur-sm bg-cyan-500 rounded-2xl">
              <p>how are you</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex gap-2">
          <Image src={gambar} alt="gambar" className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-4 justify-center p-4 rounded-2xl w-full bg-cyan-700">
            <div className="flex items-center justify-between w-full">
              <p className="text-lg">Admin</p>
              <p>2 days ago</p>
            </div>
            <div className="flex items-center p-4 backdrop-blur-sm bg-cyan-500 rounded-2xl">
              <p>how are you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListChat;
