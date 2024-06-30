import Logo from "@/assets/iwakmart.png"
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="flex w-full flex-col border-t-2 border-slate-400 px-10 pt-6 lg:pt-0">
      <div className="w-full flex flex-col items-center lg:items-start lg:flex-row lg:gap-x-36 gap-y-10 lg:py-12 text-lg lg:justify-center">
        <div className="gap-4 flex flex-col items-center lg:justify-start  text-black ">
          <div className="w-32">
          <Image src={Logo} alt="logo" className="rounded-md" />
          </div>
        </div>
        <div className="gap-1 text-slate-500 flex flex-col items-center ">
          <p className="text-black font-bold text-md">Useful Links</p>
          <Link href="#" className="hover:text-slate-700 ">About us</Link>
          <Link href="#" className="hover:text-slate-700 ">About our shop</Link>
          <Link href="#" className="hover:text-slate-700 ">Privacy policy</Link>
        </div>
        <div className="gap-1 text-slate-500 flex flex-col items-center">
          <p className="text-black font-bold text-md">Useful Links</p>
          <Link href="#" className="hover:text-slate-700 ">Our Services</Link>
          <Link href="#" className="hover:text-slate-700 ">Projects</Link>
          <Link href="#" className="hover:text-slate-700 ">Contact</Link>
        </div>
      </div>
      <div className="w-full p-2 text-center font-semibold">
        <p>Copyright © 2024 All Rights Reserved | made by Zulfiandev</p>
      </div>
    </footer>
  );
};

export default Footer;
