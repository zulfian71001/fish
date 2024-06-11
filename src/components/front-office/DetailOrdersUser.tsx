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
// import Heading from "./Heading";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import Heading from "@/components/back-office/Heading";
import { get_order } from "@/GlobalRedux/features/orderReducer";
import toast from "react-hot-toast";
import Ikan from "@/assets/ikan.jpeg";
import Link from "next/link";

const DetailOrdersUser = ({ orderId }: { orderId: string }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loader, userInfo } = useAppSelector((state) => state.auth);
  const { myOrder } = useAppSelector((state) => state.order);
  // const [dataCategory, setDataCategory] = useState<requestDataCategory>({
  //   name: "",
  //   image: new File([], ""),
  // });
  // const [image, setImage] = useState<string>(category ? category?.image : "");

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setDataCategory({
  //     ...dataCategory,
  //     name: e.target.value,
  //   });
  // };
  // const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files: FileList | null = e.target.files;
  //   if (files && files.length > 0) {
  //     setImage(URL.createObjectURL(files[0]));
  //     setDataCategory({ ...dataCategory, image: files[0] });
  //   }
  // };

  // const updatecategory = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log(image);
  //   console.log(dataCategory);
  //   // dispatch(add_category(category));
  // };

  // useEffect(() => {
  //   if (errorsMsg) {
  //     toast.error(errorsMsg, { duration: 3000, position: "top-right" });
  //     dispatch(messageClear());
  //   }
  //   if (successMsg) {
  //     toast.success(successMsg, { duration: 3000, position: "top-right" });
  //     dispatch(messageClear());
  //     setImage("");
  //   }
  // }, [errorsMsg, successMsg]);

  useEffect(() => {
    dispatch(get_order(orderId));
  }, [orderId]);

  return (
    <>
      <section className="p-8 rounded-xl space-y-4 bg-white w-full">
        <div className="flex items-center justify-between">
          <Heading title={"Detail Order"} />
        </div>

        <div className="flex flex-col w-full justify-center">
          <div className="flex gap-4 mb-4">
            <p className="font-semibold">
              {myOrder?._id}, <span>{myOrder?.date}</span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">
                Dikirim ke {myOrder?.shippingInfo?.name}
              </p>
              <p>
                <span className="bg-cyan-100 text-cyan-700 font-medium mr-2 px-2.5 py-0.5 rounded-md">
                  Home
                </span>
                <span className="text-slate-700">
                  {" "}
                  {myOrder?.shippingInfo?.address}{" "}
                  {myOrder?.shippingInfo?.district}{" "}
                  {myOrder?.shippingInfo?.city}{" "}
                  {myOrder?.shippingInfo?.province}
                </span>
              </p>
              <p className="text-slate-700">Email kepada {userInfo?.email}</p>
            </div>
            <div className="space-y-2">
              <p>Harga: {myOrder.price}</p>
              <p>
                Status Pembayaran:{" "}
                <span
                  className={`px-2.5 py-0.5 ${
                    myOrder.payment_status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  } rounded-md`}
                >
                  {myOrder.payment_status}
                </span>
              </p>
              <p>
                Status Pengiriman:{" "}
                <span
                  className={`px-2.5 py-0.5 ${
                    myOrder.delivery_status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  } rounded-md`}
                >
                  {myOrder.payment_status}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-3 text-slate-700">
            <p className="font-semibold mb-2">Produk</p>
            <div className="flex flex-col gap-4">
              {myOrder?.products?.map((product: any, i: number) => (
                <div key={i}>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <div>
                        {product?.images && product.images.length > 0 ? (
                          <Image
                            width={500}
                            height={500}
                            src={product.images[0]}
                            alt="produk"
                            className="w-[55px] h-[55px]"
                          />
                        ) : (
                          <div className="w-[55px] h-[55px] bg-gray-200">
                            Tidak ada gambar
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col text-sm">
                        <Link href={`/product/${myOrder.productId}`}>
                          {product.name}
                        </Link>
                        <p>banyak: {product.quantity}</p>
                      </div>
                    </div>
                    <div className="pl-4">
                      <p>Rp {product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailOrdersUser;
