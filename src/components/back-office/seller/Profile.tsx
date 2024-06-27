"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SquarePen, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { useAppSelector, AppDispatch } from "@/GlobalRedux/store";
import {
  upload_image_profile,
  add_info_profile,
  messageClear,
  update_info_profile_seller,
  update_info_profile_store,
  change_password_seller,
} from "@/GlobalRedux/features/authReducer";
import toast from "react-hot-toast";
import { IFormSeller, IFormStore, IFormUpdatePassword } from "@/utils/types";
import { FaBullseye } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()
  const { userInfo, loader, errorsMsg, successMsg } = useAppSelector(
    (state) => state.auth
  );
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showFormStore, setShowFormStore] = useState<boolean>(false);
  const [formSeller, setFormSeller] = useState<IFormSeller>({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
  });
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const [isFull, setIsFull] = useState<boolean>(false);
  const [formStore, setFormStore] = useState<IFormStore>({
    shopName: userInfo?.shopInfo?.shopName || "",
    province: userInfo?.shopInfo?.province || "",
    city: userInfo?.shopInfo?.city || "",
    district: userInfo?.shopInfo?.district || "",
    subDistrict: userInfo?.shopInfo?.subDistrict || "",
    spesificAddress: userInfo?.shopInfo?.spesificAddress || "",
    noWa: userInfo?.shopInfo?.noWa || "",
    noRek: userInfo?.shopInfo?.noRek || "",
    noGopay: userInfo?.shopInfo?.noGopay || "",
  });
  const [formUpdatePassword, setFormUpdatePassword] =
    useState<IFormUpdatePassword>({
      email: "",
      oldPassword: "",
      newPassword: "",
    });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormStore((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "province") {
      setFormStore((prevData) => ({
        ...prevData,
        city: "",
        district: "",
        subDistrict: "",
      }));
      fetchCities(value);
    } else if (name === "city") {
      setFormStore((prevData) => ({
        ...prevData,
        district: "",
        subDistrict: "",
      }));
      fetchDistricts(value);
    } else if (name === "district") {
      setFormStore((prevData) => ({
        ...prevData,
        subDistrict: "",
      }));
      fetchSubDistricts(value);
    } else {
      setFormStore((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleChangeSeller = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormSeller((previousState) => ({ ...previousState, [name]: value }));
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

  const handleChangeUpdatePassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormUpdatePassword((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const checkFromStore = () => {
    const { province, city, district, spesificAddress, subDistrict, noWa, noGopay,noRek } =
      formStore;
    const emptyFields = Object.entries(formStore).filter(
      ([key, value]) => !value
    );
    if (emptyFields.length > 0) {
      toast.error("Harap isi semua inputan!", { position: "top-right" });
      return;
    }
    const nameProvince: any = provinces.find(
      (provinsi: any) => provinsi.id === province
    );
    const nameCity: any = cities.find((kota: any) => kota.id === city);
    const nameDistrict: any = districts.find(
      (kecamatan: any) => kecamatan.id === district
    );
    const nameSubDistrict: any = subDistricts.find(
      (desa: any) => desa.id === subDistrict
    );
    setFormStore((prevState) => ({
      ...prevState,
      province: nameProvince?.name,
    }));
    setFormStore((prevState) => ({ ...prevState, city: nameCity?.name }));
    setFormStore((prevState) => ({
      ...prevState,
      district: nameDistrict?.name,
    }));
    setFormStore((prevState) => ({
      ...prevState,
      subDistrict: nameSubDistrict?.name,
    }));
    setIsFull(true);
  };
  const handleFormStore = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formStore)
    dispatch(update_info_profile_store(formStore));
    setShowFormStore(!showFormStore);
  };

  const handleFormSeller = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(update_info_profile_seller(formSeller));
    setShowForm(!showForm);
  };

  const handleFormUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(change_password_seller(formUpdatePassword));
  };

  useEffect(() => {
    if (errorsMsg) {
      toast.error(errorsMsg, { position: "top-right" });
      dispatch(messageClear());
    }
    if (successMsg) {
      toast.success(successMsg, { position: "top-right" });
      setFormUpdatePassword({
        email: "",
        oldPassword: "",
        newPassword: "",
      });
      dispatch(messageClear());
    }
  }, [errorsMsg, successMsg]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://api.binderbyte.com/wilayah/provinsi?api_key=61f6a81a4bf681041a43f94419682c8e0b2493c80b6f5aa82d8b1809b6a3adc2"
        );
        setProvinces(response.data.value);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, [formStore.province]);

  const fetchCities = async (provinceId: any) => {
    try {
      const response = await axios.get(
        `https://api.binderbyte.com/wilayah/kabupaten?api_key=61f6a81a4bf681041a43f94419682c8e0b2493c80b6f5aa82d8b1809b6a3adc2&id_provinsi=${provinceId}`
      );
      setCities(response.data.value);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchDistricts = async (cityId: any) => {
    try {
      const response = await axios.get(
        `https://api.binderbyte.com/wilayah/kecamatan?api_key=61f6a81a4bf681041a43f94419682c8e0b2493c80b6f5aa82d8b1809b6a3adc2&id_kabupaten=${cityId}`
      );
      setDistricts(response.data.value);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchSubDistricts = async (districtId: any) => {
    try {
      const response = await axios.get(
        ` https://api.binderbyte.com/wilayah/kelurahan?api_key=61f6a81a4bf681041a43f94419682c8e0b2493c80b6f5aa82d8b1809b6a3adc2&id_kecamatan=${districtId}`
      );
      console.log(response.data.value);
      setSubDistricts(response.data.value);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };
  if(userInfo?.role !== "seller"){
    router.push("/home")
  } else{
    return (
      <>
        <section className="h-full flex flex-col justify-between space-y-6 text-cyan-500 ">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className=" flex w-full lg:w-1/3 bg-white rounded-xl p-8 items-center">
              {userInfo?.image ? (
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer  bg-slate-50  border-gray-600 hover:border-gray-500 hover:bg-gray-600 relative"
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
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer  bg-slate-50  border-gray-600 hover:border-gray-500 hover:bg-slate-100"
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
                            <span className="font-semibold">
                              klik untuk upload
                            </span>{" "}
                            atau drag dan drop
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
            <div className="flex flex-col lg:flex-wrap w-full lg:w-2/3 gap-6 bg-white text-slate-700 rounded-xl p-8">
              <div
                className={`relative rounded-xl p-4  ${
                  showForm
                    ? "bg-slate-100 text-slate-700 pt-10 "
                    : "bg-cyan-500 text-white pr-24"
                }`}
              >
                {showForm ? (
                  <>
                    <button
                      className=" w-10 h-10 flex justify-center items-center rounded-sm text-slate-700 bg-slate-200 hover:text-slate-400 absolute top-0 right-0"
                      onClick={() => setShowForm(!showForm)}
                    >
                      <X />
                    </button>
                    <form
                      className="space-y-6 relative rounded-xl w-full"
                      onSubmit={handleFormSeller}
                    >
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-slate-700"
                        >
                          Nama
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="border text-sm rounded-lg outline-none block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-slate-700 focus:ring-cyan-500 focus:border-cyan-500"
                          placeholder="ketikkan nama anda"
                          value={formSeller.name}
                          onChange={handleChangeSeller}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-slate-700"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          className=" border  text-sm rounded-lg outline-none block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-slate-700 focus:ring-cyan-500 focus:border-cyan-500"
                          placeholder="ketikkan email anda"
                          value={formSeller.email}
                          onChange={handleChangeSeller}
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
                          "Perbarui Data"
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <button
                      className=" w-10 h-10 flex justify-center items-center rounded-sm bg-yellow-300 hover:bg-yellow-400 text-white absolute top-2 right-2"
                      onClick={() => setShowForm(!showForm)}
                    >
                      <SquarePen />
                    </button>
                    <div className="space-y-4 ">
                      <p>Nama : {userInfo?.name}</p>
                      <p>Email : {userInfo?.email}</p>
                      <p>Status : {userInfo?.status}</p>
                    </div>
                  </>
                )}
              </div>
              {!userInfo?.shopInfo || showFormStore ? (
                <form
                  className="space-y-6 relative rounded-xl p-6 bg-slate-100 text-slate-700"
                  onSubmit={handleFormStore}
                >
                  <button
                    className=" w-10 h-10 flex justify-center items-center rounded-sm text-slate-700 bg-slate-200 hover:text-slate-400 absolute top-0 right-0"
                    onClick={() => setShowFormStore(!showFormStore)}
                  >
                    <X />
                  </button>
                  <div>
                    <label
                      htmlFor="shopName"
                      className="block mb-2 text-sm font-medium text-slate-700"
                    >
                      Nama Toko
                    </label>
                    <input
                      type="text"
                      name="shopName"
                      className="border text-sm rounded-lg outline-none block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-slate-700 focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="ketikkan nama toko anda"
                      onChange={handleChange}
                      value={formStore.shopName}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="province">Provinsi</label>
                    <select
                      className="p-2 outline-none border border-slate-500 rounded-md"
                      name="province"
                      value={formStore.province}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Pilih Provinsi
                      </option>
                      {provinces.length > 0 &&
                        provinces?.map((province: any) => (
                          <option key={province?.id} value={province?.id}>
                            {province?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="city">Kota</label>
                    <select
                      className="p-2 outline-none border border-slate-500 rounded-md"
                      name="city"
                      value={formStore.city}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Pilih Kota
                      </option>
                      {cities.length > 0 &&
                        cities.map((city: any) => (
                          <option key={city?.id} value={city?.id}>
                            {city?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="district">Kecamatan</label>
                    <select
                      className="p-2 outline-none border border-slate-500 rounded-md"
                      name="district"
                      value={formStore.district}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Pilih Kecamatan
                      </option>
                      {districts.length > 0 &&
                        districts.map((district: any) => (
                          <option key={district?.id} value={district?.id}>
                            {district?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="subDistrict">Desa</label>
                    <select
                      className="p-2 outline-none border border-slate-500 rounded-md"
                      name="subDistrict"
                      value={formStore.subDistrict}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Pilih Desa
                      </option>
                      {subDistricts.length > 0 &&
                        subDistricts.map((subDistrict: any) => (
                          <option key={subDistrict?.id} value={subDistrict?.id}>
                            {subDistrict?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="spesificAddress"
                      className="block mb-2 text-sm font-medium text-slate-700"
                    >
                      Alamat Spesifik
                    </label>
                    <input
                      type="text"
                      name="spesificAddress"
                      className=" border  text-sm rounded-lg outline-none block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-slate-700 focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="ketikkan alamat spesifik anda"
                      onChange={handleChange}
                      value={formStore.spesificAddress}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="noRek"
                      className="block mb-2 text-sm font-medium text-slate-700"
                    >
                      Nomer Rekening BRI
                    </label>
                    <input
                      type="text"
                      name="noRek"
                      className=" border  text-sm rounded-lg outline-none block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-slate-700 focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="ketikkan nomer rekening anda"
                      onChange={handleChange}
                      value={formStore.noRek}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="noWa"
                      className="block mb-2 text-sm font-medium text-slate-700"
                    >
                      Nomer WA
                    </label>
                    <input
                      type="text"
                      name="noWa"
                      className=" border  text-sm rounded-lg outline-none block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-slate-700 focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="ketikkan nomer whatshapp anda"
                      onChange={handleChange}
                      value={formStore.noWa}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="noGopay"
                      className="block mb-2 text-sm font-medium text-slate-700"
                    >
                      Nomer Gopay
                    </label>
                    <input
                      type="text"
                      name="noGopay"
                      className=" border  text-sm rounded-lg outline-none block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-slate-700 focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="ketikkan nomer gopay"
                      onChange={handleChange}
                      value={formStore.noGopay}
                    />
                  </div>
                  {isFull ? (
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
                        "Perbarui Data"
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={checkFromStore}
                      className="text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                    >
                      Perbarui Data
                    </button>
                  )}
                </form>
              ) : (
                <div className="relative rounded-xl p-4 pr-24 bg-cyan-500 text-white ">
                  <button
                    className=" w-10 h-10 flex justify-center items-center rounded-sm bg-yellow-300 hover:bg-yellow-400 text-white absolute top-2 right-2"
                    onClick={() => setShowFormStore(!showFormStore)}
                  >
                    <SquarePen />
                  </button>
                  <div className="space-y-4 ">
                    <p>Nama Toko : {userInfo.shopInfo?.shopName}</p>
                    <p>Provinsi : {userInfo.shopInfo?.province}</p>
                    <p>Kota: {userInfo.shopInfo?.city}</p>
                    <p>Kecamatan : {userInfo.shopInfo?.district}</p>
                    <p>Desa : {userInfo.shopInfo?.subDistrict}</p>
                    <p>Alamat Spesifik : {userInfo.shopInfo?.spesificAddress}</p>
                    <p>No Wa : {userInfo.shopInfo?.noWa}</p>
                    <p>No Gopay : {userInfo.shopInfo?.noGopay}</p>
                    <p>No Rek BRI : {userInfo.shopInfo?.noRek}</p>
                  </div>
                </div>
              )}
  
              <form
                className="space-y-6 relative rounded-xl p-6 bg-slate-100"
                onSubmit={handleFormUpdatePassword}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-slate-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="border  text-sm rounded-lg outline-none block w-full p-2.5 border-gray-600 placeholder-gray-400 text-slate-700 focus:border-cyan-500"
                    placeholder="ketikkan email anda"
                    onChange={handleChangeUpdatePassword}
                    value={formUpdatePassword.email}
                  />
                </div>
                <div>
                  <label
                    htmlFor="oldPassword"
                    className="block mb-2 text-sm font-medium text-slate-700"
                  >
                    Password lama
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    className=" border  text-sm rounded-lg outline-none block w-full p-2.5 border-gray-600 placeholder-gray-400 text-slate-700 focus:border-cyan-500"
                    placeholder="ketikkan password lama anda"
                    onChange={handleChangeUpdatePassword}
                    value={formUpdatePassword.oldPassword}
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block mb-2 text-sm font-medium text-slate-700"
                  >
                    Password baru
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    className=" border  text-sm rounded-lg outline-none block w-full p-2.5 border-gray-600 placeholder-gray-400 text-slate-700 focus:border-cyan-500"
                    placeholder="ketikkan password baru anda"
                    onChange={handleChangeUpdatePassword}
                    value={formUpdatePassword.newPassword}
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
  }
  
};

export default Profile;
