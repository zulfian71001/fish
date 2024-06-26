"use client";
import React, { useEffect } from "react";
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
  get_sellers,
  messageClear,
  updateActiveAdmin,

} from "@/GlobalRedux/features/backOfficeChatReducer";

const socket = io("https://iwakmart.shop");
const Chat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
const pathname = usePathname()
  const { userInfo } = useAppSelector((state) => state.auth);
  const {  activeSeller, sellers } = useAppSelector(
    (state) => state.backOfficeChat
  );

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

  useEffect(() => {
    socket.on("activeAdmin", (admin) => {
      dispatch(updateActiveAdmin(admin));
    });
  }, []);

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
                        <Image src={data.image} alt="gambar" className="w-[10px] h-[10px] rounded-full"/>
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
          <div className="w-full h-full flex justify-center items-center text-xl font-bold text-slate-700">
            <span>Pilih Penjual</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chat;
