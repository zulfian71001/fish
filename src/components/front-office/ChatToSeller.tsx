"use client";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
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
import { useEffect } from "react";
import io from "socket.io-client";
import {
  add_friend,
  messageClear,
  send_message,
  updateMessage,
} from "@/GlobalRedux/features/chatReducer";
import { fdMessages } from "@/utils/types";
import toast from "react-hot-toast";

const socket = io("https://iwakmart.shop");

const ChatToSeller = ({ sellerId }: { sellerId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSellers, setActiveSellers] = useState<Array<Partial<fdMessages>>>([]);
  const [text, setText] = useState<string>("");
  const [receiverMsg, setReceiverMsg] = useState<Partial<fdMessages>>({});
  const { userInfo } = useAppSelector((state) => state.auth);
  const { currentFd, my_friends, fd_messages, successMsg } = useAppSelector(
    (state) => state.chat
  );

  useEffect(() => {
    socket.emit("add_user", userInfo._id, userInfo);
  }, []);

  useEffect(() => {
    if (sellerId) {
      dispatch(
        add_friend({
          sellerId: sellerId || "",
          userId: userInfo._id,
        })
      );
    }
  }, [sellerId]);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() !== "") {
      dispatch(
        send_message({
          userId: userInfo._id,
          message: text,
          sellerId,
          name: userInfo.name,
        })
      );
    }
    setText("");
  };

  useEffect(() => {
    socket.on("seller_message", (msg) => {
      setReceiverMsg(msg);
    });
    socket.on("activeSeller", (sellers) => {
      setActiveSellers(sellers);
    });
  }, []);

  useEffect(() => {
    if (successMsg) {
        socket.emit("send_customer_message", fd_messages[fd_messages?.length - 1])
      dispatch(messageClear());
    }
  }, [successMsg]);

  useEffect(() => {
    if (receiverMsg) {
      if (
        sellerId === receiverMsg?.senderId &&
        userInfo._id === receiverMsg?.receiverId
      ) {
        dispatch(updateMessage(receiverMsg));
      }
      // else {
        //     toast.success(receiveMsg?.senderName + " " + "mengirim sebuah pesan");
        //   dispatch(messageClear());
        //   }
    }
  }, [receiverMsg]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[fd_messages])
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
              {sellerId &&
                my_friends?.length > 0 &&
                my_friends?.map((data: any, i: number) => (
                  <Link
                    href={`/dashboard/chat/${data?.fdId}`}
                    key={i}
                    className={`flex gap-2 items-center py-1 hover:bg-slate-100 px-2 rounded-xs ${pathname === `/dashboard/chat/${data?.fdId}` ? "bg-slate-100" : ""}`}
                  >
                    <div className="w-[30px] h-[30px] rounded-full relative">
                      {
                        activeSellers?.some((f:any)=>f.sellerId === f.fdId) &&  <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 "></div>
                      }
                     
                      {data?.image ? (
                        <Image src={data?.image} alt="gambar" className="w-[10px] h-[10px] rounded-full"/>
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
                {
                        activeSellers?.some((f:any)=>f.sellerId === currentFd.fdId) &&  <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 "></div>
                      }
                  {currentFd?.image ? (
                    <Image src={currentFd?.image} alt="gambar" className="w-[10px] h-[10px] rounded-full"/>
                  ) : (
                    <Image src={User} alt="gambar" />
                  )}
                </div>
                <span>{currentFd?.name}</span>
              </div>
              <div className="h-[400px] w-full bg-slate-100 rounded-md p-4">
                <div className="w-full h-full flex flex-col gap-3 overflow-y-auto">
                  {fd_messages?.length > 0 &&
                    fd_messages?.map((data: any, i: number) => {
                      if (currentFd?.fdId !== data?.receiverId) {
                        return (
                          <div
                            className="w-full flex items-center gap-2 text-[14px]"
                            key={i} ref={scrollRef}
                          >
                            <div className="w-[30px] h-[30px] rounded-full relative">
                              {currentFd?.image ? (
                                <Image src={currentFd?.image} alt="gambar" className="w-[10px] h-[10px] rounded-full"/>
                              ) : (
                                <Image src={User} alt="gambar" />
                              )}
                            </div>
                            <div className="bg-cyan-500 p-2 text-white rounded-md">
                              <span>{data?.message}</span>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            className="w-full flex justify-end items-center gap-2 text-[14px]"
                            key={i} ref={scrollRef}
                          >
                            <div className="bg-cyan-500 p-2 text-white rounded-md">
                              <span>{data?.message}</span>
                            </div>
                            <div className="w-[30px] h-[30px] rounded-full relative">
                              {userInfo?.image ? (
                                <Image src={userInfo.image} alt="gambar" className="w-[10px] h-[10px] rounded-full"/>
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
              
                <div className="border h-[40px] ml-2 w-[calc(100%-60px)] rounded-full relative">
                  <input
                    type="text"
                    placeholder="ketikkan pesan"
                    className="w-full rounded-full h-full outline-none p-3"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setText(e.target.value)
                    }
                    value={text}
                  />
  
                </div>
                <div className="w-[40px] p-2 flex justify-center items-center rounded-full hover:shadow-xl transition-all duration-150">
                  <div
                    className="text-2xl cursor-pointer"
                    onClick={sendMessage}
                  >
                    <SendHorizontal />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-xl font-bold text-slate-700">
              <span>Pilih Penjual</span>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ChatToSeller;
