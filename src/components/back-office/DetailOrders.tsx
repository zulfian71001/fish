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
  
  const convertStatusDelivery = (status:string)=>{
    let statusData = "Tertunda"
    if(status == "pending"){
      return statusData
    }
    else if (status == "process") {
      return statusData = "Proses"
    }
    else if (status == "placed") {
      return statusData = "Sampai"
    }
    else {
      return statusData = "Batal"
    }
  }

  return (
    <section className="h-full flex flex-col justify-between p-8 rounded-xl space-y-6 bg-slate-50">
      <div className="flex items-center justify-between">
        <Heading title="Detail Orders" />
        <select className="bg-cyan-500 text-white border-none outline-none">
          <option value="pending">Tertunda</option>
          <option value="process">Proses</option>
          <option value="placed">Sampai</option>
          <option value="cancelled">Batal</option>
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
