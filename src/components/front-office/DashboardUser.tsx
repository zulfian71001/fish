"use client";
import dynamic from "next/dynamic";
const SmallCards = dynamic(() => import("./SmallCards"));
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { get_dashboard_index_data } from "@/GlobalRedux/features/dashboardReducer";
import { useEffect } from "react";
import {convertStatusDelivery, convertStatus, convertRupiah} from "@/utils/convert"


const DashboardUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { totalOrders, pendingOrder, recentOrders, cancelledOrder } =
    useAppSelector((state) => state.dashboardUser);

  useEffect(() => {
    dispatch(get_dashboard_index_data({ userId: userInfo?._id }));
  }, [userInfo?._id]);

  const paymentHandler = (ord: any) => {
    let items = 0;
    for (let i = 0; i < ord.length; i++) {
      items = ord.products[i].quantity + items;
    }
    // router.push('/dashboard/payment')
  };
  if(userInfo?.role !== "customer"){
    router.push("/home")
  }
  else {
    return (
      <div className="w-full flex flex-col gap-6 bg-slate-200">
        <SmallCards
          totalOrders={totalOrders}
          pendingOrder={pendingOrder}
          cancelledOrder={cancelledOrder}
        />
  
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
              {recentOrders?.length > 0 ? recentOrders.map((data: any, i: number) => (
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
                          router.push(`/dashboard/orders/detail/${data._id}`)
                        }
                      >
                        Lihat
                      </button>
                      {data?.delivery_status == "cancelled" ||
                      data?.payment_status == "paid" || data?.payment_method == 'cod' ? (
                        <></>
                      ) : (
                        <button
                          className=" py-1 px-2 flex justify-center items-center  bg-green-400 hover:bg-green-600"
                          onClick={() =>
                            router.push(`/dashboard/orders/payment/${data._id}`)
                          }
                        >
                          bayar order
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )): (
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
  }
};

export default DashboardUser;
