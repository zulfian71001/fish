"use client";
import React, { useState } from "react";
import { Trash2, SquarePen, Eye } from "lucide-react";
import Pagination from "../Pagination";
import SmallCardSellers from "./SmallCardSellers";
import Image from "next/image";
import ikan from "@/assets/ikan.jpeg";
import ikan2 from "@/assets/ikan2.jpeg";
import ikan3 from "@/assets/ikan3.jpeg";

const Payment = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <section className="p-8 rounded-xl space-y-4 bg-slate-800">
        <div className="flex w-full items-center justify-between">
          <select className="bg-slate-900 border-none">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <form className="max-w-md ">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
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
                className="block w-full p-4 ps-10 text-sm text-white rounded-lg bg-transparent focus:ring-cyan-300 border-2 border-slate-500 "
                placeholder="Search "
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(e.target.value)
                }
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 "
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md">
            <thead className="text-xs uppercase bg-slate-950 text-slate-100  dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Bukti Pembayaran
                </th>
                <th scope="col" className="px-6 py-3">
                  Status Pembayaran
                </th>
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-slate-900 border-b dark:bg-gray-800 text-slate-100  dark:border-gray-700">
                <td className="px-6 py-4">#1927423</td>

                <td className="px-6 py-4">
                  <Image
                    src={ikan}
                    alt="gambar"
                    className="w-32 h-32 object-contain"
                  />
                </td>
                <td className="px-6 py-4">Pending</td>
                <td className=" px-6 py-4 items-center ">
                  <div className="flex  items-center gap-4">
                    <button className=" w-10 h-10 flex justify-center items-center rounded-xl bg-green-400 hover:bg-green-600">
                      <Eye />
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-slate-900 border-b dark:bg-gray-800 text-slate-100  dark:border-gray-700">
                <td className="px-6 py-4">#1927423</td>

                <td className="px-6 py-4">
                  <Image
                    src={ikan}
                    alt="gambar"
                    className="w-32 h-32 object-contain"
                  />
                </td>
                <td className="px-6 py-4">Pending</td>
                <td className=" px-6 py-4 items-center ">
                  <div className="flex  items-center gap-4">
                    <button className=" w-10 h-10 flex justify-center items-center rounded-xl bg-green-400 hover:bg-green-600">
                      <Eye />
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-slate-900 border-b dark:bg-gray-800 text-slate-100  dark:border-gray-700">
                <td className="px-6 py-4">#1927423</td>

                <td className="px-6 py-4">
                  <Image
                    src={ikan}
                    alt="gambar"
                    className="w-32 h-32 object-contain"
                  />
                </td>
                <td className="px-6 py-4">Pending</td>
                <td className=" px-6 py-4 items-center ">
                  <div className="flex  items-center gap-4">
                    <button className=" w-10 h-10 flex justify-center items-center rounded-xl bg-green-400 hover:bg-green-600">
                      <Eye />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Pagination
          pageNumber={currentPage}
          setPageNumber={setCurrentPage}
          totalItems={50}
          perPage={perPage}
          showItems={3}
        />
      </section>
    </>
  );
};

export default Payment;
