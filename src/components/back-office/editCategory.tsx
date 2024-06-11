"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  IChangeImage,
  IDataMapProduct,
  IDataProduct,
  IDataUpdateProduct,
  requestDataCategory,
} from "@/utils/types";
import { X } from "lucide-react";
import Heading from "./Heading";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";

import {
  get_category,
  messageClear,
} from "@/GlobalRedux/features/categoryReducer";
import toast from "react-hot-toast";
import Ikan from "@/assets/ikan.jpeg";

const EditCategory = ({ categoryId }: { categoryId: string }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loader, errorsMsg, successMsg, category } = useAppSelector(
    (state) => state.category
  );
  const [dataCategory, setDataCategory] = useState<requestDataCategory>({
    name: "",
    image: new File([], ""),
  });
  const [image, setImage] = useState<string>(category ? category?.image : "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataCategory({
      ...dataCategory,
      name: e.target.value,
    });
  };
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (files && files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
      setDataCategory({ ...dataCategory, image: files[0] });
    }
  };

  const updatecategory = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(image);
    console.log(dataCategory);
    // dispatch(add_category(category));
  };

  useEffect(() => {
    if (errorsMsg) {
      toast.error(errorsMsg, { duration: 3000, position: "top-right" });
      dispatch(messageClear());
    }
    if (successMsg) {
      toast.success(successMsg, { duration: 3000, position: "top-right" });
      dispatch(messageClear());
      setImage("");
    }
  }, [errorsMsg, successMsg]);

  useEffect(() => {
    dispatch(get_category(categoryId));
    setDataCategory({
      name: category.name,
      image: category.image,
    });
    setImage(category?.image);
  }, [categoryId]);

  return (
    <>
      <section className="p-8 rounded-xl space-y-4 bg-white">
        <div className="flex items-center justify-between">
          <Heading title={"Edit Category"} />
          <button
            type="button"
            onClick={() => router.push("/admin/dashboard/categories")}
            className="w-full mt-4 text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 sm:w-auto text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 "
          >
            Semua category
          </button>
        </div>

        <div className="flex flex-col w-full items-center justify-center">
          <form
            className=" w-full "
            onSubmit={updatecategory}
            encType="multipart/form-data"
          >
            <div className="flex flex-col">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-slate-700"
                >
                  Nama produk
                </label>
                <input
                  type="text"
                  name="name"
                  value={dataCategory?.name}
                  onChange={handleChange}
                  className=" border  text-sm rounded-lg outline-none block w-full p-2.5 border-gray-600 placeholder-gray-400 text-slate-700 focus:border-cyan-500"
                  placeholder="ketikkan nama produk"
                />
              </div>
            </div>
            <div className="mt-4 mb-4 flex justify-center">
              <div className="w-[60%] lg:w-[350px] h-[250px] relative border border-slate-500 rounded-md">
                <label>
                  {" "}
                  {image ? (
                    <Image
                      src={image}
                      fill={true}
                      alt="gambar"
                      className="w-full h-full rounded-sm "
                    />
                  ) : (
                    ""
                  )}
                </label>
                <input
                  type="file"
                  className="opacity-0 absolute w-full h-full top-0 left-0"
                  onChange={handleImage}
                />
              </div>
            </div>
            <button
              disabled={loader ? true : false}
              type="submit"
              className="text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              {loader ? (
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-400"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                "Update Category"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditCategory;
