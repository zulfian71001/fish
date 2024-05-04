"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  Plus,
  Barcode,
  LogOut,
  LayoutList,
  ShoppingBasket,
  CirclePercent,
  SquareUser,
  DollarSign,
  MessageCircle,
  X
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import Logo from "@/assets/logo.png";


const sidebarContent = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard />,
    url: "/seller/dashboard",
  },
  {
    name: "Tambah Produk",
    icon: <Plus />,
    url: "/seller/dashboard/add-product",
  },
  {
    name: "Semua Produk",
    icon: <Barcode />,
    url: "/seller/dashboard/products",
  },
  {
    name: "Orders",
    icon: <ShoppingBasket />,
    url: "/seller/dashboard/orders",
  },
  {
    name: "Pembayaran",
    icon: <DollarSign />,
    url: "/seller/dashboard/payment",
  },
  {
    name: "Chat Customers",
    icon: <MessageCircle />,
    url: "/seller/dashboard/customers-chat",
  },
  {
    name: "Chat Admin",
    icon: <MessageCircle />,
    url: "/seller/dashboard/admin-chat",
  },
  {
    name: "Profil",
    icon: <SquareUser />,
    url: "/seller/dashboard/profile",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    deleteCookie( "accessToken");
    router.push("/home");
  };
  return (
    <>
      <div
        className={`hidden lg:block bg-slate-50 space-x-6 w-60 h-screen text-slate-700 fixed top-0 left-0`}
      >
         <Link href="#" className="flex pl-6 mb-6 py-4 relative">
          <Image src={Logo} alt="logo" width={500} height={500} className="w-28"/>
        </Link>
        <div className=" flex flex-col space-y-6 ">
          {sidebarContent.map((item, i) => (
            <Link
              href={item.url}
              key={i}
              className={`flex gap-3 hover:text-cyan-300 ${
                item.url === pathname ? "text-cyan-300" : ""
              }`}
            >
              <div>{item.icon}</div>
              <p>{item.name}</p>
            </Link>
          ))}
          <button className={`flex gap-3 hover:text-cyan-300 cursor-pointer `} onClick={handleLogout}>
            <div>
              <LogOut />
            </div>
            <p>Logout</p>
          </button>
        </div>
      </div>
      <div
        className={`transition-all duration-500 ease-in ${
          isOpen
            ? "block bg-slate-700 space-x-6 w-60 h-screen text-white fixed top-0 left-0 z-30"
            : "hidden "
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsOpen(false)}
        >
          <X />
        </button>
        <Link href="#" className="flex pl-6 mb-6 py-4">
          Logo
        </Link>
        <div className=" flex flex-col space-y-6 ">
          {sidebarContent.map((item, i) => (
            <Link
              href={item.url}
              key={i}
              className={`flex gap-3 hover:text-cyan-300 ${
                item.url === pathname ? "text-cyan-300" : ""
              }`}
            >
              <div>{item.icon}</div>
              <p>{item.name}</p>
            </Link>
          ))}
          <button className={`flex gap-3 hover:text-cyan-300 cursor-pointer `} onClick={handleLogout}>
            <div>
              <LogOut />
            </div>
            <p>Logout</p>
          </button>
        </div>
      </div>
      <button
        className={`lg:hidden h-[88px] w-20 z-20 flex justify-center items-center fixed top-0 left-0 bg-slate-700 text-white cursor-pointer hover:bg-slate-800`}
        onClick={() => setIsOpen(true)}
      >
        <RxHamburgerMenu />
      </button>
    </>
  );
};

export default Sidebar;
