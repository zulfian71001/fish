"use client";
import React, { useState } from "react";
import Heading from "../back-office/Heading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import {
  get_orders,
  messageClear,
  update_status_customer_acceptance,
} from "@/GlobalRedux/features/orderReducer";
import {
  convertStatusDelivery,
  convertStatus,
  convertRupiah,
} from "@/utils/convert";
import Pagination from "../back-office/Pagination";
import toast from "react-hot-toast";
import ModalApproveProduct from "./ModalApproveProduct";
import { process_transaction } from "@/GlobalRedux/features/paymentReducer";

declare global {
  interface Window {
    snap: any;
  }
}
const OrdersUser = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { userInfo } = useAppSelector((state) => state.auth);
  const { orderId, myOrders, totalOrders, errorsMsg, successMsg } =
    useAppSelector((state) => state.order);
  const { transactionToken, loading } = useAppSelector(
    (state) => state.payment
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [status, setStatus] = useState<string>("all");
  const handleCloseModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    dispatch(
      get_orders({
        status: status,
        customerId: userInfo._id,
        perPage,
        page: currentPage,
      })
    );
  }, [status, userInfo._id, perPage, currentPage]);

  const updateCustomerAcceptance = (orderId: string) => {
    dispatch(
      update_status_customer_acceptance({
        orderId,
        info: { customer_acceptance: "received" },
      })
    );
  };


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
      dispatch(
        get_orders({
          status: status,
          customerId: userInfo._id,
          perPage,
          page: currentPage,
        })
      );
      dispatch(messageClear());
    }
  }, [errorsMsg, successMsg]);

  return (
    <section className="w-full flex flex-col justify-between p-8 rounded-xl space-y-6 bg-slate-50">
      <div className="flex items-center justify-between">
        <Heading title="Detail Orders" />
        <select
          className="bg-cyan-500 text-white border-none outline-none"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setStatus(e.target.value)
          }
        >
          <option value="all">Semua</option>
          <option value="pending">Tertunda</option>
          <option value="processing">Proses</option>
          <option value="delivery">Pengiriman</option>
          <option value="placed">sampai</option>
          <option value="cancelled">batal</option>
        </select>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md">
          <thead className="text-xs uppercase bg-cyan-600 text-slate-100  dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id Order
              </th>
              <th scope="col" className="px-6 py-3">
                Harga
              </th>
              <th scope="col" className="px-6 py-3">
                Status Pembayaran
              </th>
              <th scope="col" className="px-6 py-3">
                Status Order
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {myOrders?.length > 0 ? (
              myOrders.map((data: any, i: number) => (
                <tr
                  key={i}
                  className="bg-cyan-500 border-b dark:bg-gray-800 text-slate-100  dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-slate-100 whitespace-nowrap dark:text-white"
                  >
                    {data._id}
                  </th>
                  <td className="px-6 py-4">{convertRupiah(data.price)}</td>
                  <td className="px-6 py-4">
                    {convertStatus(data.payment_status)}
                  </td>
                  <td className="px-6 py-4">
                    {convertStatusDelivery(data.delivery_status)}
                  </td>
                  <td className=" px-6 py-4 items-center ">
                    <div className="flex  items-center gap-4">
                      <ModalApproveProduct
                        id={data._id}
                        handleClick={() => updateCustomerAcceptance(data._id)}
                        modal={showModal}
                        closeModal={handleCloseModal}
                      />

                      <button
                        className=" py-1 px-2 flex justify-center items-center  bg-green-400 hover:bg-green-600"
                        onClick={() =>
                          router.push(`/dashboard/orders/detail/${data._id}`)
                        }
                      >
                        Lihat
                      </button>
                      {data?.payment_status == "paid" &&
                      data?.customer_acceptance == "unreceived" ? (
                        <button
                          className=" py-1 px-2 flex justify-center items-center  bg-green-400 hover:bg-green-600"
                          onClick={() => setShowModal(true)}
                        >
                          Terima Barang
                        </button>
                      ) : data?.delivery_status !== "cancelled" &&
                        data?.payment_status == "unpaid" && data?.payment_method == "transfer" ? (
                        <button
                          className=" py-1 px-2 flex justify-center items-center  bg-green-400 hover:bg-green-600"
                          onClick={showPayment}
                        >
                          Bayar 
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Tidak ada order.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalOrders > perPage && (
        <Pagination
          pageNumber={currentPage}
          setPageNumber={setCurrentPage}
          totalItems={totalOrders}
          perPage={perPage}
          showItems={3}
        />
      )}
    </section>
  );
};

export default OrdersUser;
