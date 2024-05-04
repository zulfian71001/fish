"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { X } from "lucide-react";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import Dropdown from "./Dropdown";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { get_categories } from "@/GlobalRedux/features/homeReducer";
import { setUserInfo, user_info } from "@/GlobalRedux/features/authReducer";
import { RiShoppingCartLine } from "react-icons/ri";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { total_cart_products, userId } = useAppSelector((state) => state.cart);

  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (token) {
      dispatch(user_info());
    } else {
      dispatch(setUserInfo());
    }
  }, [token]);

  useEffect(() => {
    dispatch(get_categories());
  }, []);

  const pathname = usePathname();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const { categories } = useAppSelector((state) => state.home);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (typeof window !== undefined) {
      const changeBackground = () => {
        if (window.scrollY >= 80) {
          setIsScroll(true);
        } else {
          setIsScroll(false);
        }
      };
      window.addEventListener("scroll", changeBackground);
      return () => {
        window.removeEventListener("scroll", changeBackground);
      };
    }
  }, []);

  const redirectCart = () => {
    if (userInfo.role == "customer") {
      router.push("/cart");
    } else {
      router.push("/login");
    }
  };

  const Content = [
    {
      name: "Register Seller",
      url: "/seller-register",
    },
    {
      name: "Login Seller",
      url: "/seller-login",
    },
  ];

  return (
    <nav
      className={` flex flex-col ${
        isScroll ? "bg-white border border-slate-50" : "bg-transparent"
      }`}
    >
      <div className="bg-cyan-500/10 text-cyan-800 flex justify-end pr-6">
        <Link href="/home" className="px-4 py-2 text-md  hover:text-cyan-400 ">
          Home
        </Link>
        {userInfo.role == "seller" || userInfo.role == "admin"
          ? ""
          : Content.map((item: any, i: number) => (
              <Link
                key={i}
                href={item.url}
                className="px-4 py-2 text-md  hover:text-cyan-400 "
              >
                {item.name}
              </Link>
            ))}
      </div>
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center py-4 px-4 xl:px-10 gap-4 xl:gap-0">
        <div className="flex justify-between items-center ">
          <div className={`flex relative w-16 h-16`}>
            <Image
              src={Logo}
              alt="logo"
              fill={true}
              className="rounded-full object-cover"
            />
          </div>
          <button className={`xl:hidden flex`} onClick={() => setIsOpen(true)}>
            <RxHamburgerMenu />
          </button>
        </div>
        {/* <select
          className="bg-cyan-500 text-white border-none outline-none rounded-md"
          name="categoryName"
          defaultValue=""
        >
          <option value="" disabled>
            All Category
          </option>
          {categories &&
            categories.map((data: { name: string }, i: number) => (
              <option key={i} value={data.name} className="text-base py-20">
                {data.name}
              </option>
            ))}
        </select> */}
        <div className="flex items-center justify-center relative">
          <input
            type="text"
            className="p-2 px-10 rounded-lg border-none ring-1 ring-slate-400 focus:outline-none focus:ring-cyan-300 outline-none w-full xl:w-[800px]"
            placeholder="Cari ikan di fish market"
            onChange={handleSearch}
            value={search}
          />
          <CiSearch className="absolute left-2 h-7 w-6" />
        </div>
        <div
          className={`hidden xl:flex  p-2 rounded-lg text-white cursor-pointer hover:bg-slate-600/5  relative ${
            pathname == "/cart" ? "bg-slate-600/5   " : ""
          } `}
          onClick={redirectCart}
        >
          <RiShoppingCartLine className="w-6 h-6 text-slate-500 font-normal" />
          { userId == userInfo._id && total_cart_products != 0 ? (
            <p className="text-xs absolute -top-2 -right-2 p-1 px-2.5 rounded-full bg-red-700 ">
              {total_cart_products}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={`xl:flex hidden gap-4`}>
          {userInfo?.role == "customer" ? (
            <div className="flex items-center justify-between gap-2">
              <div className="w-10 h-10 rounded-full relative">
                {userInfo?.image ? (
                  <Image src={Logo} alt="profile" fill={true} />
                ) : (
                  <div className="bg-cyan-500 w-10 h-10 rounded-full"></div>
                )}
              </div>
              <p>{userInfo?.name}</p>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="p-2 border-2 text-base rounded-md border-cyan-200 px-4 hover:bg-cyan-500 hover:text-white"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="p-2 border-2 text-base rounded-md bg-cyan-500 text-white px-4 hover:bg-cyan-600"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
        <div
          className={`transition-all duration-500 ease-in lg:hidden ${
            isOpen
              ? "absolute left-0 right-0 bottom-0 top-0 bg-black/20 opacity-100"
              : "hidden opacity-0 right-[400px]"
          }`}
        >
          <div
            className={`flex flex-col items-center gap-6 pt-10 transition-all duration-500 ease-in ${
              isOpen
                ? "absolute left-[30%] right-0 bottom-0 top-0 bg-slate-50 opacity-100"
                : "hidden opacity-0 right-[400px]"
            }`}
          >
            <button
              className="absolute top-4 left-4"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
            <div className="relative p-4 w-28 h-24 mt-4 rounded-md">
              <Image src={Logo} alt="logo" fill={true} />
            </div>
            <div className="flex flex-col">
              <Link
                href="/home"
                className="px-4 py-2 text-md hover:text-cyan-400 "
              >
                Home
              </Link>
              {userInfo.role == "seller" || userInfo.role == "admin"
                ? ""
                : Content.map((item: any, i: number) => (
                    <Link
                      key={i}
                      href={item.url}
                      className="px-4 py-2 text-md hover:text-cyan-400 "
                    >
                      {item.name}
                    </Link>
                  ))}
            </div>
            <div className="z-10 flex gap-4">
              {userInfo?.role == "customer" ? (
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full relative">
                    {userInfo?.image ? (
                      <Image src={Logo} alt="profile" fill={true} />
                    ) : (
                      <div className="bg-cyan-500 w-full"></div>
                    )}
                  </div>
                  <p>{userInfo?.name}</p>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="p-2 border-2 text-base  rounded-md border-cyan-200 px-4 hover:bg-cyan-500 hover:text-white"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="p-2 border-2 text-base  rounded-md bg-cyan-500 text-white px-4 hover:bg-cyan-600"
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
