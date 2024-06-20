"use client";
import React, { useState, useEffect } from "react";
import Heading from "@/components/back-office/Heading";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { get_admin_orders } from "@/GlobalRedux/features/orderReducer";
import { searchData } from "@/utils/types";
import Pagination from "@/components/back-office/Pagination";
import { ChevronsDown } from "lucide-react";
import {convertRupiah, convertStatusDelivery, convertStatus, convertStatusDeliverySearch} from "@/utils/convert"

const OrdersUser = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { orders = [], totalOrders } = useAppSelector((state) => state.order); // Default orders to an empty array
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    const obj: searchData = {
      perPage,
      page: currentPage,
      searchValue: convertStatusDeliverySearch(searchValue),
    };
    dispatch(get_admin_orders(obj));
  }, [perPage, searchValue, currentPage, dispatch]);

  const toggleRow = (index: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(index)) {
      newExpandedRows.delete(index);
    } else {
      newExpandedRows.add(index);
    }
    setExpandedRows(newExpandedRows);
  };
console.log(searchValue)
  return (
    <section className="w-full flex flex-col justify-between p-8 rounded-xl space-y-6 bg-slate-50">
        <Heading title="Semua Order" />
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
                placeholder="Cari berdasarkan status pengiriman"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(e.target.value)
                }
              />
            </div>
          </form> */}
        </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md">
          <thead className="text-xs uppercase bg-cyan-600 text-slate-100 dark:bg-gray-700 dark:text-gray-400">
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
                Metode Pembayaran
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
              <th scope="col" className="px-6 py-3">
                <ChevronsDown />
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((data: any, i: number) => (
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
                            router.push(`/admin/dashboard/orders/detail-orders/${data._id}`)
                          }
                        >
                          Lihat
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 items-center">
                      <div className="flex items-center gap-4">
                        <button
                          className="py-1 px-2 flex justify-center items-center bg-green-400 hover:bg-green-600"
                          onClick={() => toggleRow(i)}
                        >
                          <ChevronsDown />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedRows.has(i) &&
                    data.suborder.map((data: any, i: number) => (
                      <tr
                        className="bg-cyan-400 border-b dark:bg-gray-700 text-slate-800 dark:border-gray-600"
                        key={i}
                      >
                        <td className="px-6 py-4">{data._id}</td>
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
                        <td className="px-6 py-4" colSpan={2}></td>
                      </tr>
                    ))}
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
    </section>
  );
};

export default OrdersUser;
