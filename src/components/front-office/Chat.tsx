"use client";
import React from "react";
import Heading from "@/components/back-office/Heading";
import { MessageCircleMore } from "lucide-react";
import User from "@/assets/user.png";
import Link from "next/link";
import Image from "next/image";
const Chat = () => {
  return (
    <>
      <section className="px-8 rounded-xl flex gap-4 bg-white w-full">
        <div className=" w-[230px]">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 py-3 text-cyan-500">
              <MessageCircleMore />
              <Heading title={"Chat"} />
            </div>
            <div className="flex flex-col w-full justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((data: any, i: number) => (
                <Link
                  href={`/dashboard/chat/${i}`}
                  key={i}
                  className="flex gap-2 items-center py-1"
                >
                  <div className="w-[30px] h-[30px] rounded-full relative">
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 "></div>
                    <Image src={User} alt="gambar" />
                  </div>
                  <span>Riyan</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[calc(100%-230px)] ">
          <div className="w-full h-full ">
            <div className="flex gap-3 text-xl items-center text-slate-700 h-[50px] border">
              <div className="w-[30px] h-[30px] rounded-full relative">
                <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 "></div>
                <Image src={User} alt="gambar" />
              </div>
              <span>Riyan</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chat;
