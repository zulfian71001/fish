"use client";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
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
import {
  get_customers,
  get_seller_message,
  get_sellers,
  messageClear,
  send_message_seller_admin,
  updateActiveCustomer,
} from "@/GlobalRedux/features/backOfficeChatReducer";
import { fdMessages } from "@/utils/types";

const socket = io("https://iwakmart.shop");
const Chat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null);
  const [receiverMsg, setReceiverMsg] = useState<Partial<fdMessages>>({});
  const [text, setText] = useState<string>("");
  const { userInfo } = useAppSelector((state) => state.auth);
  const {
    currentSeller,
    successMsg,
    activeSeller,
    seller_admin_message,
    updateMessageAdmin,
    activeAdmin
  } = useAppSelector((state) => state.backOfficeChat);

  useEffect(() => {
    if (userInfo && userInfo.role == "seller") {
      socket.emit("add_seller", userInfo._id, userInfo);
    } else {
      socket.emit("add_admin", userInfo);
    }
  }, [userInfo]);


  useEffect(() => {
    dispatch(get_sellers());
  }, []);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() !== "") {
      dispatch(
        send_message_seller_admin({
          userId: userInfo._id,
          message: text,
          receiverId: '',
          senderName: userInfo?.name,
        })
      );
    }
    setText("");
  };

  useEffect(() => {

      dispatch(get_seller_message());
    
  }, []);

  useEffect(() => {
    if (successMsg) {
      socket.emit("send_message_seller_to_admin", seller_admin_message[seller_admin_message.length - 1]);
      dispatch(messageClear());
    }
  }, [successMsg]);

  useEffect(() => {
    socket.on("received_admin_message", (msg) => {
      dispatch(updateMessageAdmin);
    });
  }, []);

  // useEffect(() => {
  //   if (receiverMsg) {
  //     if (
  //       sellerId === receiverMsg?.senderId &&
  //       userInfo._id === receiverMsg?.receiverId
  //     ) {
  //       dispatch(updateMessageSeller(receiverMsg));
  //     }
  //     //   else {
  //     //     toast.success(receiveMsg?.senderName + " " + "mengirim sebuah pesan");
  //     //   dispatch(messageClear());
  //     //   }
  //   }
  // }, [receiverMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [seller_admin_message]);


  if(userInfo?.role !== "seller"){
    router.push("/home")
  } else{
    return (
      <>
        <section className="px-8 rounded-xl flex gap-4 bg-white w-full min-h-[70vh]">
          <div className="w-full ">
            <div className="w-full h-full">
              <div className="flex gap-3 text-xl items-center text-slate-700 h-[50px]">
                <div className="w-[30px] h-[30px] rounded-full relative">
                  {activeAdmin && (
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 "></div>
                  )}
                  {currentSeller?.image ? (
                    <Image src={currentSeller?.image} alt="gambar" className="w-[10px] h-[10px] rounded-full" />
                  ) : (
                    <Image src={User} alt="gambar" />
                  )}
                </div>
                <span>
                  Admin
                </span>
              </div>
              <div className="h-[400px] w-full bg-slate-100 rounded-md p-4">
                <div className="w-full h-full flex flex-col gap-3 overflow-y-auto">
                  {userInfo.role ==="seller" ? (
                    seller_admin_message.map((data: any, i: number) => {
                      if (data.senderId !== userInfo._id) {
                        return (
                          <div
                            className="w-full flex items-center gap-2 text-[14px]"
                            key={i}
                            ref={scrollRef}
                          >
                            <div className="w-[30px] h-[30px] rounded-full relative">
                              {currentSeller?.image ? (
                                <Image src={currentSeller?.image} alt="gambar" className="w-[10px] h-[10px] rounded-full"/>
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
                            ref={scrollRef}
                          >
                            <div className="bg-cyan-500 p-2 text-white rounded-md">
                              <span>{data.message}</span>
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
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <form
                className="flex p-2 justify-between items-center w-full text-slate-700"
                onSubmit={sendMessage}
              >
                <div className="border h-[40px] ml-2 w-[calc(100%-60px)] rounded-full relative">
                  <input
                    type="text"
                    placeholder="ketikkan pesan"
                    className="w-full rounded-full h-full outline-none p-3 "
                    value={text}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setText(e.target.value)
                    }
                    // readOnly={sellerId ? false : true}
                  />
                </div>
                <div className="w-[40px] p-2 flex justify-center items-center rounded-full hover:shadow-xl transition-all duration-150">
                  <button
                    type="submit"
                    className={`text-2xl cursor-pointer`}
                    // disabled={sellerId ? false : true}
                  >
                    <SendHorizontal />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </>
    );
  }
  
};

export default Chat;
