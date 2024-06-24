"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  Settings,
  Users,
  LogOut,
  LayoutList,
  ShoppingBasket,
  MapPinned,
  MessageCircle,
  X,
  DollarSign,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { deleteCookie } from "cookies-next";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { logout, setUserInfo } from "@/GlobalRedux/features/authReducer";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";

const sidebarContent = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard />,
    url: "/admin/dashboard",
  },
  {
    name: "Semua Kategori",
    icon: <LayoutList />,
    url: "/admin/dashboard/categories",
  },
  {
    name: "Semua Seller",
    icon: <Users />,
    url: "/admin/dashboard/sellers",
  },
  {
    name: "Aktivasi Seller",
    icon: <Users />,
    url: "/admin/dashboard/sellers-status",
  },
  {
    name: "Ongkir",
    icon: <DollarSign />,
    url: "/admin/dashboard/shipping-fee",
  },
  {
    name: "Semua Order",
    icon: <ShoppingBasket />,
    url: "/admin/dashboard/orders",
  },
  {
    name: "Chat",
    icon: <MessageCircle />,
    url: "/admin/dashboard/sellers-chat",
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
    router.push("/admin-login");
  };
  return (
    <>
      <div
        className={`hidden lg:block bg-cyan-500 w-60 h-screen text-white fixed top-0 left-0 `}
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
          <div className={`flex gap-3 py-3 px-5 mx-1 hover:bg-white/30 rounded-lg  cursor-pointer `} onClick={handleLogout}>
            <div>
              <LogOut />
            </div>
            <p>Logout</p>
          </div>
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
        <div className=" flex flex-col space-y-1 ">
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
          <button className={`flex gap-3 py-3 px-5 mx-1 hover:bg-white/30 rounded-lg cursor-pointer `} onClick={handleLogout}>
            <div>
              <LogOut />
            </div>
            <p>Logout</p>
          </button>
        </div>
      </div>
      <button
        className={`lg:hidden h-[88px] w-20 z-20 flex justify-center items-center fixed top-0 left-0 bg-cyan-500 text-white cursor-pointer hover:bg-cyan-600`}
        onClick={() => setIsOpen(true)}
      >
        <RxHamburgerMenu className="font-bold text-lg"/>
      </button>
    </>
  );
};

export default Sidebar;
