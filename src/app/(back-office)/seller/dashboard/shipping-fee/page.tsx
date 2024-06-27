"use client";
import React, { useState, ChangeEvent, useEffect, FormEvent } from "react";
import Heading from "@/components/back-office/Heading";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import {
  messageClear,
} from "@/GlobalRedux/features/sellerReducer";
import toast from "react-hot-toast";
import { change_shipping_fee } from "@/GlobalRedux/features/sellerReducer";

const OrdersUser = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo, role } = useAppSelector((state) => state.auth);
  const { shipping_fee, successMsg, errorsMsg } = useAppSelector((state) => state.seller);
  const [shipping_feeState, setShipping_feeState] = useState<number>(
    userInfo?.shipping_fee || 0
  );

  useEffect(() => {
    setShipping_feeState(userInfo?.shipping_fee);
  }, [shipping_fee]);


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

  const handleOngkir = (e: FormEvent) => {
    e.preventDefault();
    dispatch(change_shipping_fee({
      sellerId:userInfo._id,
      shipping_fee:shipping_feeState
    }))
  };
  if (role !== "seller") {
    router.push("/home");
    return null;
  } 
  return (
    <section className="w-full flex flex-col justify-between p-8 rounded-xl space-y-6 bg-slate-50">
      <Heading title="Ongkir" />
      <form onSubmit={handleOngkir} className="space-y-4">
        <label
          htmlFor="shippingFee"
          className="block mb-2 text-sm font-medium text-slate-700"
        >
          Ongkir
        </label>
        <input
          type="number"
          name="shippingFee"
          className="border text-sm rounded-lg outline-none block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-slate-700 focus:ring-cyan-500 focus:border-cyan-500"
          placeholder="ketikkan ongkir"
          value={shipping_feeState}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setShipping_feeState(Number(e.target.value))
          }
        />
        <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white p-1.5 rounded-md">
          Perbarui
        </button>
      </form>
    </section>
  );
};

export default OrdersUser;
