"use client";
import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import {
  add_category,
  messageClear,
} from "@/GlobalRedux/features/categoryReducer";
import { requestDataCategory } from "@/utils/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddCategory = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { loader, errorsMsg, successMsg } = useAppSelector(
    (state) => state.category
  );
  const [category, setCategory] = useState<requestDataCategory>({
    name: "",
    image: new File([], ""),
  });
  const [image, setImage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (files && files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
      setCategory({ ...category, image: files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category.name || !image) {
      toast.error("Nama kategori dan gambar harus diisi", { duration: 3000, position: "top-right" });
      return;
    }
    dispatch(add_category(category));
  };

  useEffect(() => {
    if (errorsMsg) {
      toast.error(errorsMsg, { duration: 3000, position: "top-right" });
      dispatch(messageClear());
    }
    if (successMsg) {
      toast.success(successMsg, { duration: 3000, position: "top-right" });
      dispatch(messageClear());
      setCategory({
        name: "",
        image: new File([], ""),
      });
      setImage("");
    }
  }, [errorsMsg, successMsg]);

  if (userInfo?.role !== "admin") {
    router.push("/home");
    return null;
  } else {
    return (
      <section className="p-8 rounded-xl space-y-4 bg-white w-full lg:w-1/3 h-full">
        <Heading title={"Tambah Kategori"} />
        <div className="flex flex-col w-full items-center justify-center">
          <form
            className="max-w-sm w-full space-y-4 text-slate-700"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="mb-5">
              <label
                htmlFor="categoryName"
                className="block mb-2 text-sm font-medium text-slate-700"
              >
                Nama kategori
              </label>
              <input
                type="text"
                id="categoryName"
                className="border text-sm rounded-lg outline-none block w-full p-2.5 bg-white border-slate-700 placeholder-gray-400 focus:border-cyan-500"
                placeholder="Ketikkan nama kategori"
                value={category.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-center w-full bg-white">
              <label
                htmlFor="dropzone-file"
                className="flex relative flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-white border-slate-700 hover:border-cyan-500 hover:bg-slate-50"
              >
                {image ? (
                  <Image
                    src={image}
                    fill={true}
                    alt="Gambar"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-400">
                      <span className="font-semibold">Klik untuk upload</span> atau
                      drag dan drop
                    </p>
                    <p className="text-xs text-gray-400">
                      SVG, PNG, JPG, atau GIF (MAX. 800x400px)
                    </p>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  name="file"
                  className="hidden"
                  onChange={handleImage}
                />
              </label>
            </div>

            <button
              disabled={loader ? true : false}
              type="submit"
              className="text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loader ? (
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 text-gray-200 animate-spin fill-cyan-400"
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
                "Tambah Kategori"
              )}
            </button>
          </form>
        </div>
      </section>
    );
  }
};

export default AddCategory;
