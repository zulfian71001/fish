"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import orang from "@/assets/orang.jpeg";
import { SquarePen } from "lucide-react";
import { useDispatch } from "react-redux";
import { useAppSelector, AppDispatch } from "@/GlobalRedux/store";
import {
  upload_image_profile,
  add_info_profile,
  messageClear,
  user_info,
} from "@/GlobalRedux/features/authReducer";
import toast from "react-hot-toast";
import { IFormStore, IFormUpdatePassword } from "@/utils/types";
const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo, loader, errorsMsg, successMsg } = useAppSelector(
    (state) => state.auth
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [formStore, setFormStore] = useState<IFormStore>({
    shopName: "",
    city: "",
    district: "",
    spesificAddress: "",
  });
  const [formUpdatePassword, setFormUpdatePassword]= useState<IFormUpdatePassword>({
    email:'',
    oldPassword:'',
    newPassword:''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormStore((previousState) => ({ ...previousState, [name]: value }));
  };
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      const file = files[0];
      console.log(file);
      formData.append("image", file);
      dispatch(upload_image_profile(formData));
    }
  };

  const handleChangeUpdatePassword = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setFormUpdatePassword((previousState)=>({...previousState,[name]:value}))
  }
  const handleFormStore = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(add_info_profile(formStore))
  };

  const handleFormUpdatePassword = (e:React.FormEvent)=>{
    e.preventDefault()
    console.log(formUpdatePassword)
    // dispatch(change_password(formUpdatePassword))
  }

  useEffect(() => {
    if (errorsMsg) {
      toast.error(errorsMsg, { position: "top-right" });
      dispatch(messageClear());
    }
    if (successMsg) {
      toast.success(successMsg, { position: "top-right" });
      dispatch(messageClear());
    }
  }, [errorsMsg, successMsg]);

  return (
    <>
      <section className="h-full flex flex-col justify-between space-y-6 ">
        <div className="flex flex-col lg:flex-row items-center gap-6 ">
          <div className=" flex w-full lg:w-1/3 bg-slate-800 rounded-xl p-8 items-center">
            {userInfo?.image ? (
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer  bg-gray-700  border-gray-600 hover:border-gray-500 hover:bg-gray-600 relative"
                >
                  <Image
                    src={userInfo.image}
                    alt="gambar"
                    fill={true}
                    className="w-72 object-contain"
                  />
                  <input
                    id="dropzone-file"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleImage}
                  />
                </label>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer  bg-gray-700  border-gray-600 hover:border-gray-500 hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {loader ? (
                      <div>
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
                      </div>
                    ) : (
                      <>
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
                        <p className="mb-2 text-sm  text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs  text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleImage}
                  />
                </label>
              </div>
            )}
          </div>
          <div className="flex flex-col lg:flex-wrap w-full lg:w-2/3 gap-6 bg-slate-800 rounded-xl p-8">
            <div className="relative rounded-xl p-4 pr-24 bg-slate-900 ">
              <button className=" w-10 h-10 flex justify-center items-center rounded-sm bg-yellow-400 hover:bg-yellow-600 absolute top-2 right-2">
                <SquarePen />
              </button>
              <div className="space-y-4 ">
                <p>Nama : {userInfo?.name}</p>
                <p>Email : {userInfo?.email}</p>
                <p>Role : {userInfo?.role}</p>
                <p>Status : {userInfo?.status}</p>
                <p>Akun Pembayaran : {userInfo?.payment}</p>
              </div>
            </div>
            {!userInfo?.shopInfo ? (
              <form
                className="space-y-6 relative rounded-xl p-6 bg-slate-900"
                onSubmit={handleFormStore}
              >
                <div>
                  <label
                    htmlFor="shopName"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Nama Toko
                  </label>
                  <input
                    type="text"
                    name="shopName"
                    className="border text-sm rounded-lg outline-none block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="ketikkan nama toko anda"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Kota
                  </label>
                  <input
                    type="text"
                    name="city"
                    className=" border  text-sm rounded-lg outline-none block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="ketikkan kota anda"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="district"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Kecamatan
                  </label>
                  <input
                    type="text"
                    name="district"
                    className=" border  text-sm rounded-lg outline-none block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="ketikkan kecamatan anda"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="spesificAddress"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Alamat Spesifik
                  </label>
                  <input
                    type="text"
                    name="spesificAddress"
                    className=" border  text-sm rounded-lg outline-none block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="ketikkan alamat spesifik anda"
                    onChange={handleChange}
                  />
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
                "Tambah data"
              )}
            </button>
              </form>
            ) : (
              <div className="relative rounded-xl p-4 pr-24 bg-slate-900 ">
                <button className=" w-10 h-10 flex justify-center items-center rounded-sm bg-yellow-400 hover:bg-yellow-600 absolute top-2 right-2">
                  <SquarePen />
                </button>
                <div className="space-y-4 ">
                  <p>Nama Toko : {userInfo.shopInfo?.shopName}</p>
                  <p>Kota: {userInfo.shopInfo?.city}</p>
                  <p>Kecamatan : {userInfo.shopInfo?.district}</p>
                  <p>Alamat Spesifik : {userInfo.shopInfo?.spesificAddress}</p>
                </div>
              </div>
            )}

            <form className="space-y-6 relative rounded-xl p-6 bg-slate-900" onSubmit={handleFormUpdatePassword}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  className="border text-sm rounded-lg outline-none block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="ketikkan email anda"
                  onChange={handleChangeUpdatePassword}
                />
              </div>
              <div>
                <label
                  htmlFor="oldPassword"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password lama
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  className=" border  text-sm rounded-lg outline-none block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="ketikkan password lama anda"
                  onChange={handleChangeUpdatePassword}
                />
              </div>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password baru
                </label>
                <input
                  type="password"
                  name="newPassword"
                  className=" border  text-sm rounded-lg outline-none block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="ketikkan password baru anda"
                  onChange={handleChangeUpdatePassword}
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 sm:w-auto text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
