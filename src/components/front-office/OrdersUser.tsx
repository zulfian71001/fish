"use client";
import React, { useState } from "react";
import Heading from "../back-office/Heading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { get_orders } from "@/GlobalRedux/features/orderReducer";

const OrdersUser = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { myOrders } = useAppSelector((state) => state.order);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  useEffect(() => {
    dispatch(get_orders({ status: status, customerId: userInfo._id }));
  }, [status, userInfo._id]);

  const convertStatus = (status:string)=>{
    let statusData = "Belum Bayar"
    if(status == "unpaid"){
      return statusData
    }
    else {
      return statusData = "Sudah Bayar"
    }
  }

  const convertStatusDelivery = (status:string)=>{
    let statusData = "Tertunda"
    if(status == "pending"){
      return statusData
    }
    else if (status == "process") {
      return statusData = "Proses"
    }
    else if (status == "placed") {
      return statusData = "Sampai"
    }
    else {
      return statusData = "Batal"
    }
  }


  return (
    <section className="w-full flex flex-col justify-between p-8 rounded-xl space-y-6 bg-slate-50">
      <div className="flex items-center justify-between">
        <Heading title="Detail Orders" />
        <select
          className="bg-cyan-500 text-white border-none outline-none"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setStatus(e.target.value)
          }
        >
          <option value="all">Semua</option>
          <option value="pending">Pending</option>
          <option value="processing">Proses</option>
          <option value="WareHouse">Toko</option>
          <option value="placed">sampai</option>
          <option value="cancelled">batal</option>
        </select>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md">
          <thead className="text-xs uppercase bg-cyan-600 text-slate-100  dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id Order
              </th>
              <th scope="col" className="px-6 py-3">
                Harga
              </th>
              <th scope="col" className="px-6 py-3">
                Status Pembayaran
              </th>
              <th scope="col" className="px-6 py-3">
                Status Order
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((data: any, i: number) => (
              <tr key={i} className="bg-cyan-500 border-b dark:bg-gray-800 text-slate-100  dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-slate-100 whitespace-nowrap dark:text-white"
                >
                  {data._id}
                </th>
                <td className="px-6 py-4">{data.price}</td>
                <td className="px-6 py-4">{convertStatus(data.payment_status)}</td>
                <td className="px-6 py-4">{convertStatusDelivery(data.delivery_status)}</td>
                <td className=" px-6 py-4 items-center ">
                  <div className="flex  items-center gap-4">
                    <button className=" py-1 px-2 flex justify-center items-center  bg-green-400 hover:bg-green-600" onClick={()=>router.push(`/dashboard/orders/detail/${data._id}`)}>
                      Lihat
                    </button>
                    {
                      data.delivery_status == "cancelled" || data.payment_status == "paid" ? (
                        <></>
                       
                      )  : ( <button className=" py-1 px-2 flex justify-center items-center  bg-green-400 hover:bg-green-600" onClick={()=>router.push(`/dashboard/orders/detail/${data._id}`)}>
                      Bayar
                    </button>)
                    }

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrdersUser;
