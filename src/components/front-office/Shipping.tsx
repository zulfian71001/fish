"use client";
import { IDataProduct, ShippingProps } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { messageClear, place_order } from "@/GlobalRedux/features/orderReducer";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { process_transaction } from "@/GlobalRedux/features/paymentReducer";
import { convertRupiah } from "@/utils/convert";
import axios from "axios";
import api from "@/app/api/api";

declare global {
  interface Window {
    snap: any;
  }
}

const Shipping = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { orderId } = useAppSelector((state) => state.order);
  const { transactionToken, loading } = useAppSelector(
    (state) => state.payment
  );
  const { userInfo } = useAppSelector((state) => state.auth);
  const { cart_products, price, shipping_fee, buy_item_product } =
    useAppSelector((state) => state.cart);
  const { successMsg, errorsMsg } = useAppSelector((state) => state.order);
  const [isShowPayment, setIsShowPayment] = useState<boolean>(false);
  const [isFull, setIsFull] = useState<boolean>(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isNavigate, setIsNavigate] = useState<string>("/home");
  const [dataShipping, setDataShipping] = useState<ShippingProps>({
    name: "",
    phone: "",
    province: "",
    city: "",
    district: "",
    subDistrict: "",
    address: "",
    post: "",
    payment: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);

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
  }, [dataShipping.province]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setDataShipping((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "province") {
      setDataShipping((prevData) => ({
        ...prevData,
        city: "",
        district: "",
        subDistrict: "",
      }));
      fetchCities(value);
    } else if (name === "city") {
      setDataShipping((prevData) => ({
        ...prevData,
        district: "",
        subDistrict: "",
      }));
      fetchDistricts(value);
    } else if (name === "district") {
      setDataShipping((prevData) => ({
        ...prevData,
        subDistrict: "",
      }));
      fetchSubDistricts(value);
    } else {
      setDataShipping((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !dataShipping.name ||
      !dataShipping.phone ||
      !dataShipping.province ||
      !dataShipping.city ||
      !dataShipping.district ||
      !dataShipping.address ||
      !dataShipping.post ||
      !dataShipping.payment
    ) {
      toast.error(
        "Harap lengkapi semua kolom sebelum menyimpan data pengiriman.",
        { position: "top-right" }
      );
      return;
    }
    const {
      name,
      phone,
      province,
      city,
      district,
      subDistrict,
      address,
      post,
      payment,
    } = dataShipping;
    if (
      name &&
      phone &&
      province &&
      city &&
      district &&
      subDistrict &&
      address &&
      post &&
      payment
    ) {
      if (payment == "cod") {
        setIsNavigate("/dashboard/orders");
      }

      setIsFull(true);
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
    setDataShipping((prevState) => ({
      ...prevState,
      province: nameProvince.name,
    }));
    setDataShipping((prevState) => ({ ...prevState, city: nameCity.name }));
    setDataShipping((prevState) => ({
      ...prevState,
      district: nameDistrict.name,
    }));
    setDataShipping((prevState) => ({
      ...prevState,
      subDistrict: nameSubDistrict.name,
    }));
  };


  const placeOrder = () => {
    setIsOrdering(true);
    dispatch(
      place_order({
        price,
        products: cart_products,
        shipping_fee,
        shippingInfo: dataShipping,
        userId: userInfo._id,
        navigate: isNavigate,
        items: buy_item_product,
      })
    );
    router.push(`/dashboard/orders`);
    setTimeout(() => {
      setIsOrdering(false);
    }, 3000);
  };

  useEffect(() => {
    if (errorsMsg) {
      toast.error(errorsMsg, { position: "top-right" });
      dispatch(messageClear());
    }
    if (successMsg) {
      toast.success(successMsg, { position: "top-right" });
      setIsShowPayment(true);
      dispatch(messageClear());
      if (dataShipping.payment == "cod") {
        router.push(isNavigate);
      }
    }
  }, [errorsMsg, successMsg]);

  return (
    <div className="min-h-[85vh] w-full bg-slate-100">
      <div className="w-full h-full flex gap-2">
        <>
          <div className="w-[60%] flex flex-col items-end mx-8">
            <div className="w-full flex flex-col p-10 bg-white rounded-md my-10 gap-6">
              {!isFull ? (
                <>
                  <h5 className="text-xl font-semibold">
                    Informasi Pengiriman
                  </h5>
                  <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex flex-col">
                      <label htmlFor="name">Nama</label>
                      <input
                        type="text"
                        className="p-2 outline-none border border-slate-500 rounded-md"
                        name="name"
                        placeholder="Nama"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="phone">No. Tlp</label>
                      <input
                        type="text"
                        className="p-2 outline-none border border-slate-500 rounded-md"
                        name="phone"
                        placeholder="Phone"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="province">Provinsi</label>
                      <select
                        className="p-2 outline-none border border-slate-500 rounded-md"
                        name="province"
                        value={dataShipping.province}
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
                        value={dataShipping.city}
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
                        value={dataShipping.district}
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
                        value={dataShipping.subDistrict}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Pilih Desa
                        </option>
                        {subDistricts.length > 0 &&
                          subDistricts.map((subDistrict: any) => (
                            <option
                              key={subDistrict?.id}
                              value={subDistrict?.id}
                            >
                              {subDistrict?.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="address">Alamat Lengkap</label>
                      <input
                        type="text"
                        className="p-2 outline-none border border-slate-500 rounded-md"
                        placeholder="Alamat lengkap"
                        name="address"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="post">Kode Pos</label>
                      <input
                        type="text"
                        className="p-2 outline-none border border-slate-500 rounded-md"
                        placeholder="Kode Pos"
                        name="post"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full ">
                      <p>Pilih Pembayaran</p>
                      <select
                        className="text-black border-slate-500 outline-none h-10 w-full rounded-md "
                        onChange={handleChange}
                        name="payment"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Pilih Pembayaran
                        </option>
                        <option value="transfer">transfer</option>
                        <option value="cod">COD</option>
                      </select>
                    </div>

                    <div className="w-full flex items-end">
                      <button
                        type="submit"
                        className="bg-cyan-500 text-white font-semibold hover:bg-cyan-600 w-full p-3 rounded-md"
                      >
                        Simpan
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div>
                  <p>Dikirim ke {dataShipping.name}</p>
                  <div className="flex gap-1">
                    <p className="bg-cyan-100 text-cyan-700 font-medium mr-2 px-2 rounded-md">
                      Home
                    </p>
                    <p className=" text-black font-medium">
                      {dataShipping.address} {dataShipping.subDistrict}{" "}
                      {dataShipping.district} {dataShipping.city}{" "}
                      {dataShipping.province}
                    </p>
                    <p
                      className="text-cyan-600 hover:text-cyan-700 font-semibold cursor-pointer px-2"
                      onClick={() => setIsFull(false)}
                    >
                      Ganti
                    </p>
                  </div>
                  <p className="text-black">Email Kepada {userInfo?.email}</p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full lg:w-[40%] h-full bg-white p-6 mt-10 mr-10 rounded-md space-y-4">
            <p className="text-xl font-semibold">Order</p>
            <div className="flex justify-between">
              <p>Total items</p>
              <p>{buy_item_product}</p>
            </div>
            <div className="flex justify-between">
              <p>Ongkos Kirim</p>
              <p>{convertRupiah(shipping_fee)}</p>
            </div>
            <div className="flex justify-between">
              <p>Total pembayaran</p>
              <p>{convertRupiah(price + shipping_fee)}</p>
            </div>
            <button
              disabled={!isFull || isOrdering}
              className={`w-full  text-white p-2 rounded-md ${
                isFull ? "bg-cyan-600 hover:bg-cyan-700" : "bg-cyan-700"
              }`}
              onClick={placeOrder}
            >
              {isOrdering ? "Processing..." : "Buat Order"}
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default Shipping;
