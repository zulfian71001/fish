"use client";
import React, { useState, useEffect } from "react";
import { Trash2, SquarePen, Eye, Router } from "lucide-react";
import Pagination from "../Pagination";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { IDataMapProduct, searchData } from "@/utils/types";
import { get_products } from "@/GlobalRedux/features/productReducer";
import { useRouter } from "next/navigation";
import { convertRupiah } from "@/utils/convert";

const Products = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { products, totalProducts } = useAppSelector((state) => state.product);
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
    dispatch(get_products(obj));
  }, [perPage, searchValue, currentPage, dispatch]);
  if(userInfo?.role !== "seller"){
    router.push("/home")
  } else{
    return (
      <>
        <section className="p-8 rounded-xl space-y-4 bg-white">
                {
            userInfo?.status !== "active" ? (
              <div className="w-full flex justify-center items-center text-slate-700">Akun belum teraktivasi</div>
            ) : (
            <>
                   <div className="flex w-full items-center justify-between">
            <select className="bg-cyan-500 text-white border-none">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
            <form className="max-w-md ">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
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
              <thead className="text-xs uppercase bg-cyan-600 text-white  dark:bg-gray-700 dark:text-gray-400">
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
                    Kategori
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Deskripsi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Harga
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Stok
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((data: IDataMapProduct, i: number) => (
                    <tr
                      key={i}
                      className="bg-cyan-500 border-b dark:bg-gray-800 text-white  dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{i + 1}</td>
                      <td className="px-6 py-4 relative">
                        {Array.isArray(data.images) && (
                          <Image
                            src={data.images[0]}
                            fill={true}
                            alt="gambar"
                            className="w-32 h-32 object-contain"
                          />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="line-clamp-1">{data.name}</p>
                      </td>
                      <td className="px-6 py-4">{data.categoryName}</td>
                      <td className="px-6 py-4">
                        <p className="line-clamp-1">{data.desc}</p>
                      </td>
                      <td className="px-6 py-4">{convertRupiah(data.price)}</td>
                      <td className="px-6 py-4">{data.stock} kg</td>
                      <td className=" px-6 py-4 items-center ">
                        <div className="flex  items-center gap-4">
                          <button
                            className=" w-10 h-10 flex justify-center items-center rounded-xl bg-yellow-300 hover:bg-yellow-400"
                            onClick={()=>router.push(
                              `/seller/dashboard/products/edit-product/${data._id}`
                            )}
                          >
                            <SquarePen />
                          </button>
                          <button className="w-10 h-10 flex justify-center items-center rounded-xl bg-red-500 hover:bg-red-600">
                            <Trash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {totalProducts <= perPage ? (
            ""
          ) : (
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItems={50}
              perPage={perPage}
              showItems={3}
            />
          )}
            </>)
          }
   
        </section>
      </>
    );
  }
  
};

export default Products;
