import { PropsModal } from "@/utils/types";
import React from "react";
import Centang from "@/assets/centang.png"
import Image from "next/image";

const Modal = (props: PropsModal) => {
  const { handleClick, closeModal, modal,id } = props;

  if (!modal) return null;
  
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-black/50 z-50" onClick={closeModal}>
      <div className="w-[50%] bg-slate-50 lg:w-[400px] lg:h-[220px] py-6 px-10  rounded-lg">
        <div className="w-full space-y-4 text-gray-400 text-center">
            <Image src={Centang} alt="gambar" className="mx-auto mb-4 text-green-400 w-12 h-12 dark:text-gray-200"/>
          <h3>Apakah benar anda sudah menerima produk ini ?</h3>
          <div className="w-full flex justify-between items-center">
            <button onClick={()=> id && handleClick(id)} className="p-2 px-6 bg-green-400 hover:bg-green-500 rounded-md text-slate-50">Sudah</button>
            <button onClick={closeModal} className="p-2 px-6 bg-slate-500 hover:bg-slate-700 rounded-md text-slate-50">Tidak</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
