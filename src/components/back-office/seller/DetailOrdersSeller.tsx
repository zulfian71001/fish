"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import orang from "@/assets/orang.jpeg";
import Heading from "../Heading";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import {
  admin_order_status_update,
  get_admin_order,
  get_seller_order,
  messageClear,
  seller_order_status_update,
} from "@/GlobalRedux/features/orderReducer";
import { searchData } from "@/utils/types";
import Pagination from "@/components/back-office/Pagination";
import {
  convertStatusDelivery,
  convertStatus,
  convertRupiah,
} from "@/utils/convert";
import toast from "react-hot-toast";

const DetailOrders = ({ orderId }: { orderId: string }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { order, successMsg, errorsMsg } = useAppSelector((state) => state.order);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  const [status, setStatus] = useState<string>(order?.delivery_status);
  const [payment, setPayment] = useState<string>(order?.payment_status);

  useEffect(() => {
    dispatch(get_seller_order(orderId));
  }, [orderId]);

  useEffect(() => {
    setStatus(order?.delivery_status);
  }, [order]);

    useEffect(() => {
    if (errorsMsg) {
      toast.error(errorsMsg, { duration: 3000, position: "top-right" });
      dispatch(messageClear());
    }
    if (successMsg) {
      toast.success(successMsg, { duration: 3000, position: "top-right" });
      dispatch(messageClear());
    }
  }, [errorsMsg, successMsg]);

  const update_status = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      seller_order_status_update({ orderId, info: { status: e.target.value, payment: e.target.value } })
    );
    dispatch(get_seller_order(orderId));

    setStatus(e.target.value);
  };

  return (
    <section className="h-full flex flex-col justify-between p-8 rounded-xl space-y-6 bg-slate-50 text-cyan-500">
      <div className="flex items-center justify-between">
        <Heading title="Detail Order" />
       
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-4">
          <div>
            <p>
              #{order?._id} <span>{order?.date}</span>
            </p>
            <p>
             Metode Pembayaran : {order?.payment_method}
            </p>
            <div className="flex items-center gap-4 mt-4">
          <p className="text-md font-bold">Status Order</p>
          <select
            className="bg-cyan-500 text-white border-none outline-none"
            onChange={update_status}
            value={status}
          >
            <option value="pending">Tertunda</option>
            <option value="processing">Proses</option>
            <option value="placed">Sampai</option>
            <option value="cancelled">Batal</option>
          </select>
        </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm">
              {order?.shippingInfo?.address} {order?.shippingInfo?.city}{" "}
              {order?.shippingInfo?.province}
            </p>
            <div className="flex items-center gap-4">
          <p className="text-md font-bold">Status Pembayaran</p>
          <select
            className="bg-cyan-500 text-white border-none outline-none"
            onChange={update_status}
            value={payment}
          >
            <option value="paid">Lunas</option>
            <option value="unpaid">belum bayar</option>
          </select>
        </div>
            <p>Harga : {convertRupiah(order?.price)}</p>
          </div>
          <div>
            {order?.products &&
              order.products.map((data: any, i: number) => (
                <div className="flex items-center gap-2" key={i}>
                  <Image
                    src={data.images[0]}
                    alt="gambar"
                    className="w-12 h-14 object-contain"
                    width={500}
                    height={500}
                  />
                  <div>
                    <p>{data.name}</p>
                    <p>jumlah : {data.quantity}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="space-y-6">
          {order?.suborder &&
            order?.suborder?.map((data: any, i: number) => (
              <div key={i}>
                <p>
                  {" "}
                  Order seller {i + 1} :{" "}
                  {convertStatusDelivery(data.delivery_status)}
                </p>
                {data.products?.map((data: any, i: number) => (
                  <div className="flex items-center gap-2" key={i}>
                    <Image
                      src={data.images[0]}
                      alt="gambar"
                      className="w-12 h-14 object-contain"
                      width={500}
                      height={500}
                    />
                    <div>
                      <p>{data.name}</p>
                      <p>jumlah : {data.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default DetailOrders;
