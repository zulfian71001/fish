"use client";
import React, { useState } from "react";
import Heading from "./Heading";
import Pagination from "./Pagination";

const RecentOrders = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className="flex flex-col p-8 rounded-xl space-y-4 bg-white">
      <div className="flex w-full items-center justify-between">
        <Heading title="Order terakhir" />
        <p>View All</p>
      </div>
      <div className="flex w-full items-center justify-between">
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPerPage(parseInt(e.target.value))
          }
          className="bg-cyan-500 border-none"
        >
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
              className="block w-full p-4 ps-10 text-sm text-black rounded-lg bg-transparent focus:border-cyan-300 border-2 border-slate-400 "
              placeholder="Search "
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchValue(e.target.value)
              }
            />
          </div>
        </form>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md">
          <thead className="text-xs uppercase bg-cyan-600 text-slate-100  dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Status
              </th>
              <th scope="col" className="px-6 py-3">
                Order Status
              </th>
              <th scope="col" className="px-6 py-3">
                Active
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-cyan-500 border-b dark:bg-gray-800 text-slate-100  dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-slate-100 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
            <tr className="bg-cyan-500 text-slate-100 border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-slate-100 whitespace-nowrap dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
            </tr>
            <tr className="bg-cyan-500 text-slate-100 dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-slate-100 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
              <td className="px-6 py-4">$99</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <Pagination
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        totalItems={50}
        perPage={perPage}
        showItems={3}
      /> */}
    </div>
  );
};

export default RecentOrders;
