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
  messageClear,
  updateActiveCustomer,
} from "@/GlobalRedux/features/backOfficeChatReducer";

const socket = io("http://localhost:5000");
const Chat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname()
  const { userInfo } = useAppSelector((state) => state.auth);
  const { customers, activeCustomer,currentCustomer } = useAppSelector(
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
    dispatch(get_customers({ sellerId: userInfo._id }));
  }, [userInfo._id]);

  useEffect(() => {
    socket.on("activeCustomer", (customers) => {
      dispatch(updateActiveCustomer(customers));
    });
  }, []);

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
          <div className="w-full h-full flex justify-center items-center text-xl font-bold text-slate-700">
            <span>Pilih Pembeli</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chat;
