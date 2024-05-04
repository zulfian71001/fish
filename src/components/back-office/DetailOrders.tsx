"use client";
import React, { useState } from "react";
import Image from "next/image";
import orang from "@/assets/orang.jpeg";
import Heading from "./Heading";

const DetailOrders = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  return (
    <section className="h-full flex flex-col justify-between p-8 rounded-xl space-y-6 bg-slate-800">
      <div className="flex items-center justify-between">
        <Heading title="Detail Orders" />
        <select className="bg-slate-900 border-none outline-none">
          <option value="active">Pending</option>
          <option value="active">Processing</option>
          <option value="WareHouse">WareHouse</option>
          <option value="active">Placed</option>
          <option value="nonActive">Cancelled</option>
        </select>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-6">
          <div>
            <p>
              #3451239789 <span>22 Agustus 2024</span>
            </p>
            <p className="font-semibold">Diantar untuk : Zulfian Nafis</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs">jln.pangean no.10 sekaran lamongan</p>
            <p>Status Pembayaran : Lunas</p>
            <p>Harga : Rp.400000</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Image
                src={orang}
                alt="gambar"
                className="w-12 h-14 object-contain"
              />
              <div>
                <p>baju kemeja putih</p>
                <p>jumlah : 2</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={orang}
                alt="gambar"
                className="w-12 h-14 object-contain"
              />
              <div>
                <p>baju kemeja putih</p>
                <p>jumlah : 2</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={orang}
                alt="gambar"
                className="w-12 h-14 object-contain"
              />
              <div>
                <p>baju kemeja putih</p>
                <p>jumlah : 2</p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <p>Seller 1 order : Pending</p>
            <div className="flex items-center gap-2 ">
              <Image
                src={orang}
                alt="gambar"
                className="w-12 h-14 object-contain"
              />
              <div>
                <p>baju kemeja putih</p>
                <p>jumlah : 2</p>
              </div>
            </div>
          </div>
          <div>
            <p>Seller 1 order : Pending</p>
            <div className="flex items-center gap-2 ">
              <Image
                src={orang}
                alt="gambar"
                className="w-12 h-14 object-contain"
              />
              <div>
                <p>baju kemeja putih</p>
                <p>jumlah : 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailOrders;
