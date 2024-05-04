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
    address: "",
    post: "",
    payment: "",
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    setDataShipping({ ...dataShipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, province, city, district, address, post, payment } =
      dataShipping;
    if (
      name &&
      phone &&
      province &&
      city &&
      district &&
      address &&
      post &&
      payment
    ) {
      if (payment == "cod") {
        setIsNavigate("/home");
      }
      setIsFull(true);
    }

    console.log(dataShipping);
  };

  useEffect(() => {
    const client_key = transactionToken;
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", client_key);
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
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
    setTimeout(() => {
      setIsOrdering(false); 
    }, 3000);
  };

  const showPayment = () => {
    dispatch(process_transaction(orderId));
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

  useEffect(() => {
    if (!loading) {
      window.snap?.pay(transactionToken);
    }
  }, [loading]);

  return (
    <div className="min-h-[85vh] w-full bg-slate-100">
      <div className="w-full h-full flex gap-2">
        {isShowPayment ? (
          <div className="w-[60%] flex flex-col items-end mx-8">
          <button
            className={`w-full hover:bg-cyan-700 text-white p-2 rounded-md bg-cyan-600`}
            onClick={showPayment}
          >
            Bayar Sekarang
          </button>
          </div>

        ) : (
          <>
            <div className="w-[60%] flex flex-col items-end mx-8">
              <div className="w-full flex flex-col p-10 bg-white rounded-md my-10 gap-6">
                {!isFull ? (
                  <>
                    <h5 className="text-xl font-semibold">
                      Shipping information
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
                        <label htmlFor="phone">Phone</label>
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
                        <input
                          type="text"
                          className="p-2 outline-none border border-slate-500 rounded-md"
                          name="province"
                          placeholder="Provinsi"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="city">Kota</label>
                        <input
                          type="text"
                          className="p-2 outline-none border border-slate-500 rounded-md"
                          placeholder="Kota"
                          name="city"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="district">Kecamatan</label>
                        <input
                          type="text"
                          className="p-2 outline-none border border-slate-500 rounded-md"
                          placeholder="Kecamatan"
                          name="district"
                          onChange={handleChange}
                        />
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
                          Save
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div>
                    <p>Dikirim ke {dataShipping.name}</p>
                    <div className="flex gap-1">
                      <p className="bg-cyan-300 text-cyan-700 font-medium mr-2 px-2.5 py-0.5 rounded">
                        Home
                      </p>
                      <p className=" text-black font-medium">
                        {dataShipping.address} {dataShipping.district}{" "}
                        {dataShipping.city} {dataShipping.province}
                      </p>
                      <p
                        className="text-cyan-600 hover:text-cyan-700 font-semibold cursor-pointer px-2"
                        onClick={() => setIsFull(false)}
                      >
                        Ganti
                      </p>
                    </div>
                    <p className="text-black">Email to {userInfo?.email}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full lg:w-[40%] h-full bg-white p-6 mt-10 mr-10 rounded-md space-y-4">
              <p className="text-xl font-semibold">Orders</p>
              <div className="flex justify-between">
                <p>Total items</p>
                <p>{buy_item_product}</p>
              </div>
              <div className="flex justify-between">
                <p>Ongkos Kirim</p>
                <p>Rp. {shipping_fee}</p>
              </div>
              <div className="flex justify-between">
                <p>Total pembayaran</p>
                <p>Rp. {price + shipping_fee}</p>
              </div>
              <button
                disabled={!isFull || isOrdering}
                className={`w-full hover:bg-cyan-700 text-white p-2 rounded-md ${
                  isFull ? "bg-cyan-600" : "bg-cyan-300"
                }`}
                onClick={placeOrder}
              >
                 {isOrdering ? 'Processing...' : 'Order'} 
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Shipping;
