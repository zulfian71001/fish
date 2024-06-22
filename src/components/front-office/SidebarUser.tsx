"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  LogOut,
  ShoppingBasket,
  MessageCircle,
  LockKeyhole,
  X
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { deleteCookie } from "cookies-next";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { useDispatch } from "react-redux";
import { logout, setUserInfo } from "@/GlobalRedux/features/authReducer";


const sidebarContent = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard />,
    url: "/dashboard",
  },
  {
    name: "Semua Order",
    icon: <ShoppingBasket />,
    url: "/dashboard/orders",
  },

  {
    name: "Chat ",
    icon: <MessageCircle />,
    url: "/dashboard/chat",
  },
  {
    name: "Ganti Password",
    icon: <LockKeyhole />,
    url: "/dashboard/change-password",
  },
];

const SidebarUser = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("accessToken")
    router.push("/home");
  };
  return (
    <>
      <div
        className={`hidden lg:block bg-slate-50 w-[265px] py-4 px-2 text-slate-700 rounded-lg shadow-lg`}
      >
        <div className=" flex flex-col space-y-1">
          {sidebarContent.map((item, i) => (
            <Link
              href={item.url}
              key={i}
              className={`flex gap-3 hover:bg-cyan-500 hover:text-white py-3 px-5 rounded-lg mx-1 ${
                item.url === pathname ? "bg-cyan-500 text-white" : ""
              }`}
            >
              <div>{item.icon}</div>
              <p>{item.name}</p>
            </Link>
          ))}
          <button className={`flex gap-3 hover:bg-cyan-500 hover:text-white py-3 px-5 rounded-lg mx-1  `} onClick={handleLogout}>
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
            ? "block bg-slate-50 text-slate-700  w-60 z-30 absolute left-4 top-4"
            : "hidden "
        }`}
      >
        <button
          className="absolute top-4 right-4 z-[60]"
          onClick={() => setIsOpen(false)}
        >
          <X />
        </button>
        <div className=" flex flex-col space-y-1 pt-12">
          {sidebarContent.map((item, i) => (
            <Link
              href={item.url}
              key={i}
              className={`flex gap-3 py-3 px-5 mx-1  rounded-lg hover:bg-cyan-500 hover:text-white ${
                item.url === pathname ? "bg-cyan-500 text-white" : ""
              }`}
            >
              <div>{item.icon}</div>
              <p>{item.name}</p>
            </Link>
          ))}
          <button className={`flex gap-3 py-3 px-5 mx-1 hover:bg-cyan-500 hover:text-white rounded-lg cursor-pointer`} onClick={handleLogout}>
            <div>
              <LogOut />
            </div>
            <p>Logout</p>
          </button>
        </div>
      </div>
      <button
        className={`lg:hidden w-10 h-10 z-20 flex justify-center items-center  my-2 bg-slate-50 text-slate-700 cursor-pointer hover:bg-cyan-500 hover:text-white rounded-md`} onClick={() => setIsOpen(true)} >
        <RxHamburgerMenu className="font-bold text-lg"/>
      </button>
    </>
  );
};

export default SidebarUser;
