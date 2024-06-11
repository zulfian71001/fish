import { PropsModal } from "@/utils/types";
import React from "react";

const Modal = (props: PropsModal) => {
  const { handleClick, closeModal, modal,id } = props;

  if (!modal) return null;
  
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-black/50 z-50" onClick={closeModal}>
      <div className="w-[50%] bg-slate-50 lg:w-[400px] lg:h-[220px] py-6 px-10  rounded-lg">
        <div className="w-full space-y-4 text-gray-400 text-center">
        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
          <h3>Apakah anda yakin menghapus produk ini ?</h3>
          <div className="w-full flex justify-between items-center">
            <button onClick={()=> id && handleClick(id)} className="p-2 px-6 bg-red-600 hover:bg-red-700 rounded-md text-slate-50">Hapus</button>
            <button onClick={closeModal} className="p-2 px-6 bg-slate-500 hover:bg-slate-700 rounded-md text-slate-50">Tidak</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
