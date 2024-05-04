import Logo from "@/assets/logo.png";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="flex w-full flex-col border-t-2 border-slate-400 px-10">
      <div className="w-full flex flex-col md:flex-row md:gap-x-36 md:py-12 text-lg md:justify-center">
        <div className="space-y-4  text-black">
          <div className="w-32 ">

          <Image src={Logo} alt="logo" className="rounded-md" />
          </div>
          <p className="">Email: Zulfiandev@gmail.com</p>
        </div>
        <div className="gap-1 text-slate-500 flex flex-col ">
          <p className="text-black font-bold text-xl">Useful Links</p>
          <Link href="#" className="hover:text-slate-700 ">About us</Link>
          <Link href="#" className="hover:text-slate-700 ">About our shop</Link>
          <Link href="#" className="hover:text-slate-700 ">Privacy policy</Link>
        </div>
        <div className="gap-1 text-slate-500 flex flex-col ">
          <p className="text-black font-bold text-xl">Useful Links</p>
          <Link href="#" className="hover:text-slate-700 ">Our Services</Link>
          <Link href="#" className="hover:text-slate-700 ">Projects</Link>
          <Link href="#" className="hover:text-slate-700 ">Contact</Link>
        </div>
        <div className="gap-4 text-slate-500 flex flex-col ">
          <p className="text-black font-bold text-xl">Ikuti Kami</p>
          <div className="flex gap-4">
          <Link href="#" className="flex items-center justify-center hover:bg-blue-600 w-10 h-10 text-white rounded-full bg-blue-500 "><Facebook /></Link>
          <Link href="#" className="flex items-center justify-center hover:bg-pink-600 w-10 h-10 text-white rounded-full bg-pink-500 "><Instagram /></Link>
          <Link href="#" className="flex items-center justify-center hover:bg-cyan-600 w-10 h-10 text-white rounded-full bg-cyan-500 "><Twitter /></Link>
          </div>
        
        </div>
      </div>
      <div className="w-full p-2 text-center font-semibold">
        <p>Copyright © 2022 All Rights Reserved | made by Zulfiandev</p>
      </div>
    </footer>
  );
};

export default Footer;
