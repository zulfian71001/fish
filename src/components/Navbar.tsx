"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import classNames from "classnames";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import Button from "./elements/Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>{
    setSearch(e.target.value)
  }
useEffect(() => {
  if(typeof window  !== undefined){

    const changeBackground = () =>{
      if(window.scrollY >= 80){
        setIsScroll(true)
      }else{
        setIsScroll(false)
      }
    }
    window.addEventListener('scroll', changeBackground)
    return () => {
      window.removeEventListener('scroll', changeBackground)
    }
  }
},[])

  return (
    <nav className={`w-full flex justify-between items-center py-4 px-10 ${isScroll ? 'bg-white border border-slate-50' : 'bg-transparent'}`}>
      <div className={`md:flex hidden`}>
        Logo
        <span>Logo</span>
      </div>
      <div className="flex items-center justify-center relative">
        <input
          type="text"
          className="p-2 px-10 rounded-lg border-none ring-2 ring-blue-200 outline-none w-[800px]"
          placeholder="Cari ikan di fish market"
          onChange={handleSearch}
          value={search}
        />
        <CiSearch className="absolute left-2 h-7 w-6" />
      </div>
      <div>
      <CiShoppingCart className="w-10 h-10 cursor-pointer"/>
      </div>
      <div className={`md:flex hidden gap-4`}>
        <Button classname="border-blue-200 px-4">Masuk</Button>
        <Button classname="bg-blue-200 px-4">Daftar</Button>
      </div>

      <div className={`md:hidden flex`}>
        <RxHamburgerMenu  />
      </div>
      
    </nav>
  );
};

export default Navbar;
