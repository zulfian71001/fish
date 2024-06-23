"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/components/back-office/Heading";
import {
  MessageCircleMore,
  Plus,
  Send,
  SendHorizontal,
  SmilePlus,
} from "lucide-react";
import User from "@/assets/user.png";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { get_dashboard_index_data } from "@/GlobalRedux/features/dashboardReducer";
import io from "socket.io-client";
import { add_friend } from "@/GlobalRedux/features/chatReducer";
import { fdMessages } from "@/utils/types";

const socket = io("https://iwakmart.shop");
const Chat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname()
  const [activeSellers, setActiveSellers] = useState<Array<Partial<fdMessages>>>([]);
  const { userInfo } = useAppSelector((state) => state.auth);
  const { currentFd, my_friends, fd_messages } = useAppSelector(
    (state) => state.chat
  );

  useEffect(() => {
    socket.emit("add_user", userInfo._id, userInfo);
  }, []);
  useEffect(() => {
    dispatch(
      add_friend({
        sellerId: "",
        userId: userInfo._id,
      })
    );
  }, [userInfo?._id]);
  useEffect(() => {
    socket.on("activeSeller", (sellers) => {
      setActiveSellers(sellers);
    });
  }, []);

  if(userInfo?.role !== "customer"){
    router.push("home")
  } else{
    return (
      <>
        <section className="px-8 rounded-xl flex gap-4 bg-white w-full">
          <div className=" w-[180px]">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1 py-3 text-cyan-500">
                <MessageCircleMore />
                <Heading title={"Chat"} />
              </div>
              <div className="flex flex-col w-full justify-center gap-2 py-2">
                {my_friends?.length > 0 &&
                  my_friends?.map((data: any, i: number) => (
                    <Link
                      href={`/dashboard/chat/${data?.fdId}`}
                      key={i}
                      className={`flex gap-2 items-center py-1 hover:bg-slate-100 px-2 rounded-xs ${pathname === `/dashboard/chat/${data?.fdId}` ? "bg-slate-100" : ""}`}
                    >
                      <div className="w-[30px] h-[30px] rounded-full relative">
                        {activeSellers?.some(
                          (f: any) => f.sellerId === f.fdId
                        ) && (
                          <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 "></div>
                        )}
                        {data?.image ? (
                          <Image src={data.image} alt="gambar" />
                        ) : (
                          <Image src={User} alt="gambar" />
                        )}
                      </div>
                      <span>{data?.name}</span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-[calc(100%-180px)] ">
            {currentFd ? (
              <div className="w-full h-full">
                <div className="flex gap-3 text-xl items-center text-slate-700 h-[50px]">
                  <div className="w-[30px] h-[30px] rounded-full relative">
                    {activeSellers?.some((f: any) => f.sellerId === f.fdId) && (
                      <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 "></div>
                    )}
                    {currentFd?.image ? (
                      <Image src={currentFd.image} alt="gambar" />
                    ) : (
                      <Image src={User} alt="gambar" />
                    )}
                  </div>
                  <span>{currentFd.name}</span>
                </div>
                <div className="h-[400px] w-full bg-slate-100 rounded-md p-4">
                  <div className="w-full h-full flex flex-col gap-3 overflow-y-auto">
                    {fd_messages?.length > 0 &&
                      fd_messages?.map((data: any, i: number) => {
                        if (currentFd?.fdId !== data.receiverId) {
                          return (
                            <div
                              className="w-full flex items-center gap-2 text-[14px]"
                              key={i}
                            >
                              <div className="w-[30px] h-[30px] rounded-full relative">
                                {currentFd?.image ? (
                                  <Image src={currentFd.image} alt="gambar" />
                                ) : (
                                  <Image src={User} alt="gambar" />
                                )}
                              </div>
                              <div className="bg-cyan-500 p-2 text-white rounded-md">
                                <span>{data.message}</span>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div
                              className="w-full flex justify-end items-center gap-2 text-[14px]"
                              key={i}
                            >
                              <div className="bg-cyan-500 p-2 text-white rounded-md">
                                <span>{data.message}</span>
                              </div>
                              <div className="w-[30px] h-[30px] rounded-full relative">
                                {userInfo?.image ? (
                                  <Image src={userInfo.image} alt="gambar" />
                                ) : (
                                  <Image src={User} alt="gambar" />
                                )}
                              </div>
                            </div>
                          );
                        }
                      })}
                  </div>
                </div>
                <div className="flex p-2 justify-between items-center w-full">
                  <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full hover:shadow-xl">
                    <label className="cursor-pointer">
                      <Plus />
                    </label>
                    <input className="hidden" type="file" />
                  </div>
                  <div className="border h-[40px] ml-2 w-[calc(100%-60px)] rounded-full relative">
                    <input
                      type="text"
                      placeholder="ketikkan pesan"
                      className="w-full rounded-full h-full outline-none p-3"
                    />
                    <div className="text-2xl absolute right-2 top-2 cursor-auto">
                      <span>
                        <SmilePlus />
                      </span>
                    </div>
                  </div>
                  <div className="w-[40px] p-2 flex justify-center items-center rounded-full hover:shadow-xl transition-all duration-150">
                    <div className="text-2xl cursor-pointer">
                      <SendHorizontal />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center text-xl font-bold text-slate-700">
                <span>Pilih Panjual</span>
              </div>
            )}
          </div>
        </section>
      </>
    );
  }

};

export default Chat;
