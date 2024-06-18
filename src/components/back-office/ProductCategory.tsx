"use client";
import React, { useEffect, useState } from "react";
import { Trash2, SquarePen } from "lucide-react";
import Pagination from "./Pagination";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import {
  delete_category,
  get_categories,
} from "@/GlobalRedux/features/categoryReducer";
import { IDataCategory, searchData } from "@/utils/types";
import Modal from "@/components/front-office/Modal";
import { useRouter } from "next/navigation";

const ProductCategory = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const { categories, totalCategories } = useAppSelector(
    (state) => state.category
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    const obj: searchData = {
      perPage: perPage,
      page: currentPage,
      searchValue,
    };
    dispatch(get_categories(obj));
  }, [perPage, searchValue, currentPage, dispatch]);

  const deleteCategory = (id: string) => {
    dispatch(delete_category(id));
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  return (
    <>
      <section className="p-8 rounded-xl space-y-4 bg-white w-2/3">
        <div className="flex w-full items-center justify-between">
          <select
            className="bg-cyan-500 border-none"
            onChange={(e) => setPerPage(parseInt(e.target.value))}
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
                className="block w-full p-4 ps-10 text-sm text-slate-700 rounded-lg bg-transparent focus:ring-cyan-300 border-2 border-slate-400 "
                placeholder="Cari"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(e.target.value)
                }
              />
            </div>
          </form>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
            <thead className="text-xs uppercase bg-cyan-600 text-slate-100  dark:bg-gray-700 dark:text-gray-400">
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
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.map((item: IDataCategory, i: number) => (
                  <tr
                    className="bg-cyan-500 border-b dark:bg-gray-800 text-slate-100  dark:border-gray-700"
                    key={i}
                  >
                    <td className="px-6 py-4">{i + 1}</td>
                    <td className="px-6 py-4 relative">
                      <Image
                        src={item.image}
                        fill={true}
                        alt="gambar"
                        className="w-28 h-28 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className=" px-6 py-4 items-center ">
                      <div className="flex  items-center gap-4">
                        <button className=" w-10 h-10 flex justify-center items-center rounded-xl bg-yellow-300 hover:bg-yellow-400" onClick={()=>router.push(`/admin/dashboard/categories/edit-category/${item._id}`)}>
                          <SquarePen />
                        </button>
                        <button
                          className="w-10 h-10 flex justify-center items-center rounded-xl bg-red-500 hover:bg-red-600"
                          onClickCapture={() => setShowModal(true)}
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </td>
                    <Modal
                      id={item._id}
                      handleClick={() => deleteCategory(item._id)}
                      modal={showModal}
                      closeModal={handleCloseModal}
                    />
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {totalCategories <= perPage ? (
          ""
        ) : (
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItems={totalCategories}
            perPage={perPage}
            showItems={3}
          />
        )}
      </section>
    </>
  );
};

export default ProductCategory;
