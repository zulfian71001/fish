"use client";
import React, { useEffect, useState } from "react";
import Heading from "../Heading";
import Link from "next/link";
import { get_dashboard_index_data_seller } from "@/GlobalRedux/features/dashboardReducer";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import {
  convertStatusDelivery,
  convertStatus,
  convertRupiah,
} from "@/utils/convert";

const RecentOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { totalOrders, pendingOrder, recentOrders, cancelledOrder } =
    useAppSelector((state) => state.dashboardUser);
  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      dispatch(get_dashboard_index_data_seller({ userId: userInfo._id }));
    }
  }, []);
  return (
    <div className="flex flex-col p-8 rounded-xl space-y-4 bg-white">
      <div className="flex w-full items-center justify-between">
        <Heading title="Order terakhir" />
        <Link
          href="/seller/dashboard/orders"
          className="text-cyan-500 font-bold hover:text-cyan-600"
        >
          Lihat Semua
        </Link>
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
            {recentOrders?.length > 0 ? (
              recentOrders.map((data: any, i: number) => (
                <tr
                  key={i}
                  className="bg-cyan-500 border-b dark:bg-gray-800 text-slate-100  dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-slate-100 whitespace-nowrap dark:text-white"
                  >
                    {data._id}
                  </th>
                  <td className="px-6 py-4">{convertRupiah(data.price)}</td>
                  <td className="px-6 py-4">
                    {convertStatus(data.payment_status)}
                  </td>
                  <td className="px-6 py-4">
                    {convertStatusDelivery(data.delivery_status)}
                  </td>
                  <td className=" px-6 py-4 items-center ">
                    <div className="flex  items-center gap-4">
                      <button
                        className=" py-1 px-2 flex justify-center items-center  bg-green-400 hover:bg-green-600"
                        onClick={() =>
                          router.push(
                            `/seller/dashboard/orders/detail-orders/${data._id}`
                          )
                        }
                      >
                        Lihat
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Tidak ada order.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
