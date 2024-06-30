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
import Logo from "@/assets/iwakmart.png";
import { logout, setUserInfo } from "@/GlobalRedux/features/authReducer";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { useDispatch } from "react-redux";

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
    name: "Semua Order",
    icon: <ShoppingBasket />,
    url: "/seller/dashboard/orders",
  },
  {
    name: "Ongkir",
    icon: <DollarSign />,
    url: "/seller/dashboard/shipping-fee",
  },
  {
    name: "Chat Pembeli",
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
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("accessToken")
    deleteCookie( "accessToken");
    router.push("/home");
  };
  return (
    <>
      <div
        className={`hidden lg:block bg-cyan-500 w-60 h-screen text-white fixed top-0 left-0`}
      >
         <Link href="#" className="flex pl-6 mb-6 py-4 relative">
          <Image src={Logo} alt="logo" width={500} height={500} className="w-28"/>
        </Link>
        <div className=" flex flex-col space-y-1 ">
          {sidebarContent.map((item, i) => (
            <Link
              href={item.url}
              key={i}
              className={`flex gap-3 hover:bg-white/30 py-3 px-5 rounded-lg mx-1 ${
                item.url === pathname ? "bg-white/30" : ""
              }`}
            >
              <div>{item.icon}</div>
              <p>{item.name}</p>
            </Link>
          ))}
          <button className={`flex gap-3 hover:bg-white/30 py-3 px-5 rounded-lg mx-1  `} onClick={handleLogout}>
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
            ? "block bg-cyan-500 w-60 h-screen text-white fixed top-0 left-0 z-30"
            : "hidden "
        }`}
      >
        <button
          className="absolute top-4 right-4 z-[60]"
          onClick={() => setIsOpen(false)}
        >
          <X />
        </button>
        <Link href="#" className="flex pl-6 mb-1 py-3 relative">
        <Image src={Logo} alt="logo" width={500} height={500} className="w-28"/>
        </Link>
        <div className=" flex flex-col space-y-1">
          {sidebarContent.map((item, i) => (
            <Link
              href={item.url}
              key={i}
              className={`flex gap-3 py-3 px-5 mx-1  rounded-lg hover:bg-white/30 ${
                item.url === pathname ? "bg-white/30" : ""
              }`}
            >
              <div>{item.icon}</div>
              <p>{item.name}</p>
            </Link>
          ))}
          <button className={`flex gap-3 py-3 px-5 mx-1 hover:bg-white/30 rounded-lg cursor-pointer`} onClick={handleLogout}>
            <div>
              <LogOut />
            </div>
            <p>Logout</p>
          </button>
        </div>
      </div>
      <button
        className={`lg:hidden h-[72px]  w-20 z-20 flex justify-center items-center fixed top-0 left-0 bg-cyan-500 text-white cursor-pointer hover:bg-cyan-600`}
        onClick={() => setIsOpen(true)}
      >
        <RxHamburgerMenu className="font-bold text-lg"/>
      </button>
    </>
  );
};

export default Sidebar;
