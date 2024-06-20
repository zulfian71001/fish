"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
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
  get_admin_message,
  get_sellers,
  messageClear,
  send_message_seller_admin,
  send_message_to_customer,
  updateActiveCustomer,
  updateActiveSeller,
  updateMessageSeller,
  updateActiveAdmin
} from "@/GlobalRedux/features/backOfficeChatReducer";
import { fdMessages } from "@/utils/types";

const socket = io("http://93.127.167.182:5000");
const Chat = ({ sellerId }: { sellerId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [receiverMsg, setReceiverMsg] = useState<Partial<fdMessages>>({});
  const [text, setText] = useState<string>("");
  const { userInfo } = useAppSelector((state) => state.auth);
  const {
    customers,
    sellers,
    updateSellerMessage,
    currentSeller,
    successMsg,
    activeSeller,
    seller_admin_message
  } = useAppSelector((state) => state.backOfficeChat);

  useEffect(() => {
    if (userInfo && userInfo.role == "seller") {
      socket.emit("add_seller", userInfo._id, userInfo);
    } else {
      socket.emit("add_admin", userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    socket.on("activeAdmin", (admin) => {
      dispatch(updateActiveAdmin(admin));
    });
  }, []);

  useEffect(() => {
    dispatch(get_sellers());
  }, []);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() !== "") {
      dispatch(
        send_message_seller_admin({
          userId: '',
          message: text,
          receiverId: sellerId,
          senderName: "ADMIN IWAK MART",
        })
      );
    }
    setText("");
  };

useEffect(()=>{
  if(sellerId){
    dispatch(get_admin_message(sellerId));
  }
},[sellerId])

  useEffect(() => {
    if (successMsg) {
      socket.emit("send_message_admin_to_seller", seller_admin_message[seller_admin_message.length - 1]);
      dispatch(messageClear());
    }
  }, [successMsg]);

  useEffect(() => {
    socket.on("received_seller_message", (msg) => {
  setReceiverMsg(msg);
});

}, []);

useEffect(() => {
if (receiverMsg) {
  if (
    receiverMsg?.senderId === sellerId  &&
    receiverMsg?.receiverId === ''
  ) {
    dispatch(updateSellerMessage(receiverMsg));
  }
  //   else {
  //     toast.success(receiveMsg?.senderName + " " + "mengirim sebuah pesan");
  //   dispatch(messageClear());
  //   }
}
}, [receiverMsg]);

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

  return (
    <>
      <section className="px-8 rounded-xl flex gap-4 bg-white w-full min-h-[70vh]">
        <div className=" w-[180px]">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 py-3 text-cyan-500">
              <Heading title={"Penjual"} />
            </div>
            <div className="flex flex-col w-full justify-center gap-2 py-2 text-slate-700 overflow-y-auto">
              {sellers?.length > 0 &&
                sellers?.map((data: any, i: number) => (
                  <Link
                    href={`/admin/dashboard/sellers-chat/${data?._id}`}
                    key={i}
                    className={`flex gap-2 items-center py-1 hover:bg-slate-100 px-2 rounded-xs ${
                      pathname === `/admin/dashboard/sellers-chat/${data?.fdId}`
                        ? "bg-slate-100"
                        : ""
                    }`}
                  >
                    <div className="w-[30px] h-[30px] rounded-full relative">
                      {activeSeller?.some(
                        (f: any) => f.sellerId === data._id
                      ) && (
                        <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 "></div>
                      )}

                      {data?.image ? (
                        <Image src={data.image} alt="gambar" />
                      ) : (
                        <Image src={User} alt="gambar" />
                      )}
                    </div>
                    <span>{data?.shopInfo?.shopName ? data?.shopInfo?.shopName : data?.name}</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <div className="w-[calc(100%-180px)] ">
          {sellerId ? (
            <div className="w-full h-full">
              <div className="flex gap-3 text-xl items-center text-slate-700 h-[50px]">
                <div className="w-[30px] h-[30px] rounded-full relative">
                  {activeSeller?.some((f: any) => f.sellerId === f.fdId) && (
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 "></div>
                  )}
                  {currentSeller?.image ? (
                    <Image src={currentSeller?.image} alt="gambar" />
                  ) : (
                    <Image src={User} alt="gambar" />
                  )}
                </div>
                <span>{currentSeller?.shopInfo?.shopName ? currentSeller?.shopInfo?.shopName : currentSeller?.name}</span>
              </div>
              <div className="h-[400px] w-full bg-slate-100 rounded-md p-4">
                <div className="w-full h-full flex flex-col gap-3 overflow-y-auto">
                  {sellerId ? (
                    seller_admin_message.map((data: any, i: number) => {
                      if (data.senderId === sellerId) {
                        return (
                          <div
                            className="w-full flex items-center gap-2 text-[14px]"
                            key={i}
                            ref={scrollRef}
                          >
                            <div className="w-[30px] h-[30px] rounded-full relative">
                              {currentSeller?.image ? (
                                <Image
                                  src={currentSeller?.image}
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
                            key={i}
                            ref={scrollRef}
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
                    readOnly={sellerId ? false : true}
                  />
                </div>
                <div className="w-[40px] p-2 flex justify-center items-center rounded-full hover:shadow-xl transition-all duration-150">
                  <button
                    type="submit"
                    className={`text-2xl cursor-pointer`}
                    disabled={sellerId ? false : true}
                  >
                    <SendHorizontal />
                  </button>
                </div>
              </form>
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

export default Chat;
