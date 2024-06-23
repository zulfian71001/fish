"use client";
import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import Pagination from "./Pagination";
import Image from "next/image";
import { Eye } from "lucide-react";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { useDispatch } from "react-redux";
import { get_sellers } from "@/GlobalRedux/features/sellerReducer";
import { searchData } from "@/utils/types";
import {useRouter} from "next/navigation"
import {getFirstCharacter} from "@/utils/convert"

const SellersData = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const { sellers, totalSellers } = useAppSelector((state) => state.seller);
  const { userInfo} = useAppSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(() => {
    const obj: searchData = {
      perPage,
      page: currentPage,
      searchValue,
    };
    dispatch(get_sellers(obj));
  }, [perPage, searchValue, currentPage, dispatch]);
  if(userInfo?.role !== "admin"){
router.push("/home")
  } else{
    return (
      <section className="min-h-screen flex flex-col justify-between p-8 rounded-xl space-y-4 bg-white">
        <div className="flex flex-col gap-4">
          <Heading title="Sellers" />
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
            </form>
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md">
              <thead className="text-xs uppercase bg-cyan-600 text-white   dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Gambar
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama Toko
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Kota
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Kecamatan
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Alamat spesifik
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {sellers && sellers.map((data: any, i: number) => (
                  <tr
                    key={i}
                    className="bg-cyan-500 border-b dark:bg-gray-800 text-white  dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{i + 1}</td>
                    <td className="px-6 py-4 relative">
                      {
                        data.image ? (
                          <Image
                          src={data.image}
                          alt="gambar"
                          fill={true}
                          className="w-16 h-18 object-contain"
                        />
                        ) : (
                          <div className="w-16 h-18 bg-white flex justify-center items-center text-cyan-500 font-bold rounded-md p-4">{getFirstCharacter(data?.name)}</div>
                        )
                      }
                     
                    </td>
                    <td className="px-6 py-4">{data?.name}</td>
                    <td className="px-6 py-4">{data?.shopInfo?.shopName}</td>
                    <td className="px-6 py-4">{data?.email}</td>
                    <td className="px-6 py-4">{data?.shopInfo?.city}</td>
                    <td className="px-6 py-4">{data?.shopInfo?.district}</td>
                    <td className="px-6 py-4">{data?.shopInfo?.spesificAddress}</td>
                    <td className=" px-6 py-4 items-center ">
                      <div className="flex  items-center gap-4">
                        <button className=" w-10 h-10 flex justify-center items-center rounded-xl bg-green-400 hover:bg-green-600" onClick={()=>router.push(`/admin/dashboard/sellers/detail-sellers/${data._id}`)}>
                          <Eye />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {
          totalSellers <= perPage ? ("") : (
            <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItems={totalSellers}
            perPage={perPage}
            showItems={3}
          />
          )
        }
       
      </section>
    );
  }
 
};

export default SellersData;
