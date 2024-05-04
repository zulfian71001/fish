"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import orang from "@/assets/orang.jpeg";
import { IChatUser } from "@/utils/types";

const dataCustomers = [
  {
    image: orang,
    name: "Nafis",
  },
  {
    image: orang,
    name: "Nafis",
  },
  {
    image: orang,
    name: "Nafis",
  },
  {
    image: orang,
    name: "Nafis",
  },
];

const DetailSeller = () => {
  const [currentUser, setCurrentUser] = useState<number>(0);
  const [iUser, setIUser] = useState<IChatUser[]>(dataCustomers);
  const [searchValue, setSearchValue] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    console.log(iUser);
  }, [iUser]);
  const activeUserClick = (id: number) => {
    setCurrentUser(id);
  };
  return (
    <section className="h-screen flex justify-between p-8 rounded-xl space-y-6 bg-slate-800">
      <div className="flex flex-col p-2 gap-4">
        {iUser
          .filter((_, i) => i === currentUser)
          .map((data, i) => (
            <div className="flex items-center gap-4" key={i}>
              <Image
                src={data.image}
                alt="gambar"
                className="w-14 h-14 rounded-full"
              />
              <h4>{data.name}</h4>
            </div>
          ))}
        <div className="space-y-2">
          <div className="flex flex-col gap-2 bg-slate-900 p-4 h-[calc(100vh-230px)] relative">
            <div className="flex items-center flex-wrap w-1/3 bg-slate-950 p-3 rounded-md relative before:absolute before:-bottom-[2px] before:-left-1 before:bg-slate-950 before:skew-x-[-36deg] before:w-4  before:h-4 before:content-[''] ">
              <p>sdnapdskcsldasdfasn kfsaklnld dsgsdgsd afasfdsf</p>
            </div>
            <div className="flex self-end justify-end items-center flex-wrap w-1/3 bg-slate-950 p-3 rounded-md relative after:absolute after:-bottom-[2px] after:-right-1 after:bg-slate-950 after:skew-x-[36deg] after:w-4 after:h-4 after:content-[''] ">
              <p className="">
                sdnapdskcsldasdfasn kfsaklnld dsgsdgsd afasfdsf
              </p>
            </div>
          </div>
          <form className="flex items-center gap-4">
            <input
              type="pesan"
              id="pesan"
              className="bg-slate-900 border border-gray-600 text-slate-100 text-sm rounded-lg outline-none focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
              placeholder="ketikkan pesan anda"
            />
            <button
              type="submit"
              className="text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DetailSeller;
