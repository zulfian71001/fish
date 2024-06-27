"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearTransactionToken, process_transaction } from "@/GlobalRedux/features/paymentReducer";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { get_order } from "@/GlobalRedux/features/orderReducer";
import {
  convertRupiah,
} from "@/utils/convert";
import Heading from "@/components/back-office/Heading";
import Bri from "@/assets/bri.png";
import Bni from "@/assets/bni.png";
import Bca from "@/assets/bca.png";
import Gopay from "@/assets/gopay.png";
import { CircleAlert } from "lucide-react";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { myOrder } = useAppSelector((state) => state.order);
  const { transactionToken, loading } = useAppSelector((state) => state.payment);

  useEffect(() => {
    dispatch(get_order(params.id));
  }, [params.id]);

  const showPayment = () => {
    dispatch(process_transaction({ id: params.id }));
  };
  useEffect(()=>{
    clearTransactionToken()
  },[])

  useEffect(() => {
    if (transactionToken) {
      const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
      const script = document.createElement("script");
      script.src = snapScript;
      script.setAttribute("data-client-key", transactionToken);
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (!loading) {
          window.snap?.pay(transactionToken);
        }
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [transactionToken, loading]);

  return (
    <section className="w-full flex flex-col justify-between p-8 rounded-xl space-y-6 bg-slate-50">
      <div className="flex items-center justify-between">
        <Heading title="Pilihan Metode Pembayaran" />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
      <div className="w-24 h-24 rounded-md">
          <Image src={Bca} alt="bca" />
        </div>
        <div className="w-24 h-24 rounded-md">
          <Image src={Bri} alt="bri" />
        </div>
        <div className="w-24 h-24 rounded-md items-center flex">
          <Image src={Bni} alt="bni" />
        </div>
        <div className="w-24 h-24 rounded-md">
          <Image src={Gopay} alt="Gopay" />
        </div>
      </div>
      <div className="flex flex-col w-full justify-center">
        <div className="flex items-center gap-4 p-2 bg-red-200 text-red-700 rounded-md">
          <CircleAlert />
          <p>Waktu untuk membayar 10 menit, jika lebih dari 10 menit maka order gagal</p>
        </div>
        <div className="mt-3 text-slate-700">
          <p className=" flex justify-center items-center mb-2 font-bold">Produk yang dibeli</p>
          <div className="flex flex-col gap-4">
            {myOrder?.products?.map((product: any, i: number) => (
              <div key={i}>
                <div className="flex flex-col md:flex-row items-center md:justify-between md:items-center">
                  <div className="flex gap-2">
                    <div>
                      {product?.images && product.images.length > 0 ? (
                        <Image
                          width={500}
                          height={500}
                          src={product.images[0]}
                          alt="produk"
                          className="w-[100px] h-[100px]"
                        />
                      ) : (
                        <div className="w-[100px] h-[100px] bg-gray-200">
                          Tidak ada gambar
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col text-sm">
                    <p>banyak: {product?.quantity}</p>
                  </div>
                  <div className="pl-4">
                    <p>{convertRupiah(product?.price)}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between"><p className="font-bold">Total</p> <p>{convertRupiah(myOrder.price)}</p></div>
          </div>
        </div>
      </div>
      <button
        className=" py-3 px-2 flex justify-center items-center text-white  bg-cyan-500 hover:bg-cyan-600"
        onClick={showPayment}
      >
        Bayar Sekarang
      </button>
    </section>
  );
};

export default Page;
