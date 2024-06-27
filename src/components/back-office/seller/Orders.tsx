"use client";
import React, { useEffect, useState } from "react";
import { Trash2, SquarePen, Eye } from "lucide-react";
import Pagination from "../Pagination";
import Image from "next/image";
import ikan from "@/assets/ikan.jpeg";
import { useRouter } from "next/navigation";
import { searchData } from "@/utils/types";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { get_seller_orders } from "@/GlobalRedux/features/orderReducer";
import { convertRupiah, convertStatus, convertStatusDelivery } from "@/utils/convert";
const Orders = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { orders, totalOrders } = useAppSelector((state) => state.order);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const obj: searchData = {
      perPage: perPage,
      page: currentPage,
      searchValue,
      sellerId: userInfo._id,
    };
    dispatch(get_seller_orders(obj));
  }, [perPage, searchValue, currentPage, dispatch]);
  if(userInfo?.role !== "seller"){
    router.push("/home")
  } else{
    return (
      <>
        <section className="p-8 rounded-xl space-y-4 bg-slate-50 ">
          {
            userInfo?.status != "active"  ? (
              <div className="w-full flex justify-center items-center text-slate-700">Akun belum teraktivasi</div>
            ) :(<>
             <div className="flex w-full items-center justify-between">
            <select className="bg-cyan-500 text-white border-none">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
            {/* <form className="max-w-md ">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-slate-700 sr-only dark:text-white"
              >
                Cari
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-slate-700 rounded-lg bg-transparent focus:ring-cyan-300 border-2 border-slate-500 "
                  placeholder="Cari"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchValue(e.target.value)
                  }
                />
              </div>
            </form> */}
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md">
              <thead className="text-xs uppercase bg-cyan-600 text-white   dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Order Id
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
                    Metode Pembayaran
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
              {orders?.length > 0 ? (
                orders?.map((data: any, i: number) => (
                  <React.Fragment key={i}>
                    <tr className="bg-cyan-500 border-b dark:bg-gray-800 text-slate-100 dark:border-gray-700">
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
                      <td className="px-6 py-4">
                        {data.payment_method}
                      </td>
                      <td className="px-6 py-4 items-center">
                        <div className="flex items-center gap-4">
                          <button
                            className="py-1 px-2 flex justify-center items-center bg-green-400 hover:bg-green-600"
                            onClick={() =>
                              router.push(`/seller/dashboard/orders/detail-orders/${data._id}`)
                            }
                          >
                            Lihat
                          </button>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
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
          <div>
          {totalOrders > perPage && (
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItems={totalOrders}
              perPage={perPage}
              showItems={3}
            />
          )}
          </div>
            </>)
          }
         
        </section>
      </>
    );
  }
 
};

export default Orders;
