"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import orang from "@/assets/orang.jpeg";
import {
  get_seller,
  update_status_seller,
  messageClear,
} from "@/GlobalRedux/features/sellerReducer";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import toast from "react-hot-toast";

const DetailSeller = ({ sellerId }: { sellerId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { seller, successMsg, errorsMsg } = useAppSelector(
    (state) => state.seller
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  const [status, setStatus] = useState<string>(seller?.status);
  const [show, setShow] = useState<boolean>(false);

  const updateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      update_status_seller({
        sellerId,
        status,
      })
    );
  };

  useEffect(() => {
    dispatch(get_seller(sellerId));
  }, [sellerId]);

  useEffect(() => {
    if (errorsMsg) {
      toast.error(errorsMsg, { position: "top-right" });
      dispatch(messageClear());
    }
    if (successMsg) {
      toast.success(successMsg, { position: "top-right" });
      dispatch(messageClear());
    }
  }, [successMsg, errorsMsg]);
  return (
    <>
      <section className="h-full flex flex-col justify-between p-8 rounded-xl space-y-6 bg-slate-50 text-cyan-500">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className=" flex items-center justify-center lg:w-1/4 relative ">
            {seller?.image ? (
              <Image
                src={seller.image}
                alt="gambar"
                width={300}
                height={300}
                className="w-72 object-contain"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center border border-cyan-500 text-center p-2">
                <p>Gambar belum diupload</p>
              </div>
            )}
          </div>
          <div className="flex flex-col lg:w-3/4 gap-6 flex-wrap">
            <div className="space-y-4">
              <h4>Informasi Seller</h4>
              <div className="p-4 lg:pr-24 bg-cyan-500 text-white space-y-4 rounded-xl">
                <p>Nama : {seller?.name}</p>
                <p>Email : {seller?.email}</p>
                <p>Role : {seller?.role}</p>
                <p>Status : {seller?.status}</p>
                <p>Akun Pembayaran : {seller?.payment}</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4>Alamat</h4>
              <div className="p-4 lg:pr-24 bg-cyan-500 text-white space-y-4 rounded-xl">
                <p>Nama Toko : {seller?.shopInfo?.shopName}</p>
                <p>Kota: {seller?.shopInfo?.city}</p>
                <p>Kecamatan : {seller?.shopInfo?.district}</p>
                <p>Alamat Spesifik : {seller?.shopInfo?.spesificAddress}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <form className="space-x-6" onSubmit={updateStatus}>
            <select
              className="bg-cyan-500 text-white border-none outline-none"
              value={status}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setStatus(e.target.value)
              }
            >
              <option value="active">Aktif</option>
              <option value="nonActive">Tidak Aktif</option>
              <option value="pending">Tertunda</option>
            </select>
            <button
              type="submit"
              className="text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Ganti
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default DetailSeller;
