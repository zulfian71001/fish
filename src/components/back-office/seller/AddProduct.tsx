"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IChangeImage, IDataProduct, searchData } from "@/utils/types";
import { X } from "lucide-react";
import Heading from "../Heading";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import {
  add_product,
  messageClear,
} from "@/GlobalRedux/features/productReducer";
import { get_categories } from "@/GlobalRedux/features/categoryReducer";
import toast from "react-hot-toast";

const AddProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  const { errorsMsg, successMsg, loader } = useAppSelector(
    (state) => state.product
  );
  const { categories } = useAppSelector((state) => state.category);
  const { userInfo } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [dataProduct, setDataProduct] = useState<IDataProduct>({
    name: "",
    categoryName: "",
    stock: 0,
    price: 0,
    desc: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [showImage, setShowImage] = useState<Array<{ url: string }>>([]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setDataProduct({ ...dataProduct, [e.target.name]: e.target.value });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      setImages([...images, ...fileList]);
      const imageUrls = fileList.map((file) => ({
        url: URL.createObjectURL(file),
      }));
      setShowImage([...showImage, ...imageUrls]);
    }
  };

  const changeImage = (props: IChangeImage) => {
    const { image, idx } = props;
    if (image) {
      let tempUrl = showImage;
      let tempImage = images;
      tempImage[idx] = image;
      tempUrl[idx] = { url: URL.createObjectURL(image) };
      setImages([...tempImage]);
      setShowImage([...tempUrl]);
    }
  };

  const removeImage = (i: number) => {
    const filterImage = images.filter((image, idx) => idx !== i);
    const filterImageUrl = showImage.filter((image, idx) => idx !== i);
    setImages(filterImage);
    setShowImage(filterImageUrl);
  };

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !dataProduct.name ||
      !dataProduct.categoryName ||
      !dataProduct.stock ||
      !dataProduct.price ||
      !dataProduct.desc ||
      images.length === 0
    ) {
      toast.error("Harus diisi semua", { position: "top-right" });
      return;
    }

    const formData = new FormData();
    formData.append("name", dataProduct.name);
    formData.append("categoryName", dataProduct.categoryName);
    formData.append("stock", String(dataProduct.stock));
    formData.append("price", String(dataProduct.price));
    formData.append("desc", dataProduct.desc);
    formData.append("shopName", userInfo?.shopInfo?.shopName);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    dispatch(add_product(formData));
  };

  useEffect(() => {
    const obj: searchData = {
      perPage: perPage,
      page: currentPage,
      searchValue,
    };
    dispatch(get_categories(obj));
  }, [perPage, searchValue, currentPage, dispatch]);

  useEffect(() => {
    if (errorsMsg) {
      toast.error(errorsMsg, { position: "top-right" });
      dispatch(messageClear());
    }
    if (successMsg) {
      toast.success(successMsg, { position: "top-right" });
      dispatch(messageClear());
      setDataProduct({
        name: "",
        categoryName: "",
        stock: 0,
        price: 0,
        desc: "",
      });
      setImages([]);
      setShowImage([]);
    }
  }, [errorsMsg, successMsg]);

  if (userInfo?.role !== "seller") {
    router.push("/home");
  } else {
    return (
      <>
        <section className="p-8 rounded-xl space-y-4 bg-white w-full">
          {userInfo.status != "active" ? (
            <div className="w-full flex justify-center items-center text-slate-700">
              Akun belum teraktivasi
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <Heading title={"Tambah Produk"} />
                <button
                  type="button"
                  onClick={() => router.push("/seller/dashboard/products")}
                  className="w-full mt-4 text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 sm:w-auto text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                  Semua Product
                </button>
              </div>

              <div className="flex flex-col w-full items-center justify-center">
                <form
                  className="w-full"
                  onSubmit={addProduct}
                  encType="multipart/form-data"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                        onChange={handleChange}
                        className="border text-sm rounded-lg outline-none block w-full p-2.5 border-gray-600 placeholder-gray-400 text-slate-700 focus:border-cyan-500"
                        placeholder="ketikkan nama produk"
                      />
                    </div>
                    <select
                      className="border text-sm rounded-lg border-gray-600 text-slate-700 focus:border-cyan-500 outline-none h-12 lg:mt-6"
                      onChange={handleChange}
                      name="categoryName"
                      defaultValue=""
                    >
                      <option value="" disabled hidden>
                        Pilih kategori
                      </option>
                      {categories &&
                        categories.map((data: { name: string }, i: number) => (
                          <option key={i} value={data.name}>
                            {data.name}
                          </option>
                        ))}
                    </select>
                    <div>
                      <label
                        htmlFor="stock"
                        className="block mb-2 text-sm font-medium text-slate-700"
                      >
                        Stok
                      </label>
                      <input
                        type="number"
                        min={0}
                        name="stock"
                        onChange={handleChange}
                        className="border text-sm rounded-lg outline-none block w-full p-2.5 border-gray-600 placeholder-gray-400 text-slate-700 focus:border-cyan-500"
                        placeholder="ketikkan stok dalam kg"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-slate-700"
                      >
                        Harga
                      </label>
                      <input
                        type="number"
                        min={0}
                        name="price"
                        onChange={handleChange}
                        className="border text-sm rounded-lg outline-none block w-full p-2.5 border-gray-600 placeholder-gray-400 text-slate-700 focus:border-cyan-500"
                        placeholder="ketikkan harga"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="desc"
                        className="block mb-2 text-sm font-medium text-slate-700"
                      >
                        Deskripsi
                      </label>
                      <textarea
                        name="desc"
                        onChange={handleChange}
                        className="border text-sm rounded-lg outline-none block w-full p-2.5 border-gray-600 placeholder-gray-400 text-slate-700 focus:border-cyan-500"
                        placeholder="ketikkan deskripsi produk"
                      />
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 mb-4">
                    {showImage.map((data, i) => (
                      <div key={i} className="h-[180px] relative">
                        <label htmlFor={i.toString()}>
                          <Image
                            src={data.url}
                            fill={true}
                            alt="gambar"
                            className="w-full h-full rounded-sm"
                          />
                        </label>
                        <input
                          type="file"
                          id={i.toString()}
                          className="hidden"
                          onChange={(e) =>
                            changeImage({ image: e.target.files![0], idx: i })
                          }
                        />
                        <span
                          onClick={() => removeImage(i)}
                          className="p-2 z-10 cursor-pointer text-slate-700 bg-slate-700 hover:shadow hover:shadow-slate-400/50 absolute top-1 left-1 rounded-full"
                        >
                          <X />
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-white border-slate-700 hover:border-cyan-500 hover:bg-slate-50"
                      >
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
                            <span className="font-semibold">
                              klik untuk upload
                            </span>{" "}
                            atau drag dan drop
                          </p>
                          <p className="ml-2 text-xs text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          multiple
                          onChange={handleImage}
                          className="hidden"
                        />
                      </label>
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
                      "Tambah Produk"
                    )}
                  </button>
                </form>
              </div>
            </>
          )}
        </section>
      </>
    );
  }
};

export default AddProduct;
