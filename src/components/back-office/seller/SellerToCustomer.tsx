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
  get_customer_message,
  get_customers,
  messageClear,
  send_message_to_customer,
  updateActiveCustomer,
  updateMessageSeller,
} from "@/GlobalRedux/features/backOfficeChatReducer";
import { fdMessages } from "@/utils/types";

const socket = io("http://93.127.167.182:5000");
const Chat = ({ customerId }: { customerId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
const pathname = usePathname()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [receiverMsg, setReceiverMsg] = useState<Partial<fdMessages>>({});
  const [text, setText] = useState<string>("");
  const { userInfo } = useAppSelector((state) => state.auth);
  const { customers, messages, currentCustomer, successMsg, activeCustomer } =
    useAppSelector((state) => state.backOfficeChat);

  useEffect(() => {
    if (userInfo && userInfo.role == "seller") {
      socket.emit("add_seller", userInfo._id, userInfo);
    } else {
      socket.emit("add_admin", userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    socket.on("activeCustomer", (customers) => {
      dispatch(updateActiveCustomer(customers));
    });
  }, []);

  useEffect(() => {
    dispatch(get_customers({ sellerId: userInfo._id }));
  }, [userInfo._id]);

  useEffect(() => {
    if (customerId) {
      dispatch(get_customer_message(customerId));
    }
  }, [customerId]);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    console.log(text);
    if (text.trim() !== "") {
      dispatch(
        send_message_to_customer({
          userId: userInfo._id,
          message: text,
          receiverId: customerId,
          name: userInfo.shopInfo.shopName,
        })
      );
    }
    setText("");
  };

  useEffect(() => {
    if (successMsg) {
      socket.emit("send_seller_message", messages[messages?.length - 1]);
      dispatch(messageClear());
    }
  }, [successMsg]);

  useEffect(() => {
    socket.on("customer_message", (msg) => {
      setReceiverMsg(msg);
    });

  }, []);

  useEffect(() => {
    if (receiverMsg) {
      if (
        customerId === receiverMsg?.senderId &&
        userInfo._id === receiverMsg?.receiverId
      ) {
        dispatch(updateMessageSeller(receiverMsg));
      }
      //   else {
      //     toast.success(receiveMsg?.senderName + " " + "mengirim sebuah pesan");
      //   dispatch(messageClear());
      //   }
    }
  }, [receiverMsg]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

  return (
    <>
      <section className="px-8 rounded-xl flex gap-4 bg-white w-full min-h-[70vh]">
        <div className=" w-[180px]">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 py-3 text-cyan-500">
              <Heading title={"Pembeli"} />
            </div>
            <div className="flex flex-col w-full justify-center gap-2 py-2">
              {customers?.length > 0 &&
                customers?.map((data: any, i: number) => (
                  <Link
                    href={`/seller/dashboard/customers-chat/${data?.fdId}`}
                    key={i}
                    className={`flex gap-2 items-center py-1 hover:bg-slate-100 px-2 rounded-xs ${pathname === `seller/dashboard/customers-chat/${data?.fdId}` ? "bg-slate-100" : ""}`}
                  >
                    <div className="w-[30px] h-[30px] rounded-full relative">
                    {activeCustomer.some((c:any) => c.customerId === currentCustomer._id) && (
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
          {customerId ? (
            <div className="w-full h-full">
              <div className="flex gap-3 text-xl items-center text-slate-700 h-[50px]">
                <div className="w-[30px] h-[30px] rounded-full relative">
                {activeCustomer.some((c:any) => c.customerId === currentCustomer._id) && (
                        <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 "></div>
                      )}
                  {currentCustomer?.image ? (
                    <Image src={currentCustomer.image} alt="gambar" />
                  ) : (
                    <Image src={User} alt="gambar" />
                  )}
                </div>
                <span>{currentCustomer.name}</span>
              </div>
              <div className="h-[400px] w-full bg-slate-100 rounded-md p-4">
                <div className="w-full h-full flex flex-col gap-3 overflow-y-auto">
                  {customerId ? (
                    messages.map((data: any, i: number) => {
                      if (data.senderId === customerId) {
                        return (
                          <div
                            className="w-full flex items-center gap-2 text-[14px]"
                            key={i} ref={scrollRef}
                          >
                            <div className="w-[30px] h-[30px] rounded-full relative">
                              {currentCustomer?.image ? (
                                <Image
                                  src={currentCustomer.image}
                                  alt="gambar"
                                />
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
                            key={i} ref={scrollRef}
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
                    readOnly={customerId ? false : true}
                  />
                </div>
                <div className="w-[40px] p-2 flex justify-center items-center rounded-full hover:shadow-xl transition-all duration-150">
                  <button type="submit" className={`text-2xl cursor-pointer`} disabled={customerId ? false : true}>
                    <SendHorizontal />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-xl font-bold text-slate-700">
              <span>Pilih Pembeli</span>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Chat;
