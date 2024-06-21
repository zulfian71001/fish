"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { LayoutDashboard, LogOut, X } from "lucide-react";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { deleteCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { useDispatch } from "react-redux";
import { logout, setUserInfo, user_info } from "@/GlobalRedux/features/authReducer";
import { RiShoppingCartLine } from "react-icons/ri";
import { hasCookie } from "cookies-next";
import { setCookie } from "cookies-next";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { total_cart_products, userId } = useAppSelector((state) => state.cart);
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      setCookie("accessToken", token);
      localStorage.setItem("accessToken", token);
      dispatch(user_info(token));
    } else {
      dispatch(setUserInfo());
      dispatch(logout())
      localStorage.removeItem("accessToken");
      deleteCookie("accessToken");
      router.push("/home");
    }
  }, [token]);

  const pathname = usePathname();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalBackOffice, setOpenModalBackOffice] =
    useState<boolean>(false);
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
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

  const submitSearch = () => {
    router.push(`/products?searchValue=${searchValue}`);
  };

  const redirectCart = () => {
    if (userInfo.role == "customer") {
      router.push("/cart");
    } else {
      router.push("/login");
    }
  };

  const Content = [
    {
      name: "Produk",
      url: "/products",
    },
    {
      name: "Daftar Seller",
      url: "/seller-register",
    },
    {
      name: "Masuk Seller",
      url: "/seller-login",
    },
  ];
  const handleLogout = () => {
    setOpenModal(false);
    dispatch(setUserInfo());
    localStorage.removeItem("accessToken");
    deleteCookie("accessToken");
    if (pathname == "/home") {
      window?.location?.reload();
    } else {
      router.push("/home");
    }
  };

  return (
    <nav
      className={` flex flex-col ${
        isScroll ? "bg-white border border-slate-50" : "bg-transparent"
      }`}
    >
      <div className="bg-cyan-500/20 text-cyan-800 flex justify-center md:justify-end lg:pr-6 text-xs md:text-sm">
        <Link href="/home" className="px-4 py-2 text-md  hover:text-cyan-400 ">
          Beranda
        </Link>
        {userInfo.role == "seller" || userInfo.role == "admin" ? (
          <Link
            href="/products"
            className="px-4 py-2 text-md  hover:text-cyan-400 "
          >
            Produk
          </Link>
        ) : (
          Content.map((item: any, i: number) => (
            <Link
              key={i}
              href={item.url}
              className="px-4 py-2 hover:text-cyan-400 "
            >
              {item.name}
            </Link>
          ))
        )}
      </div>
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center px-4 xl:px-10 gap-4 xl:gap-0">
        <div className="flex lg:gap-4 justify-between items-center my-1">
          <div className={`hidden lg:flex relative w-36 h-16 `}>
            <Image
              src={Logo}
              alt="logo"
              fill={true}
              className="rounded-xl object-cover "
            />
          </div>
          <div className="flex items-center justify-center relative w-[92%]">
            <input
              type="text"
              className="p-1 px-10 rounded-lg border-none ring-1 ring-slate-400 focus:outline-none focus:ring-cyan-300 outline-none w-full xl:w-[800px]"
              placeholder="Cari ikan di fish market"
              onChange={handleSearch}
              value={searchValue}
            />
            <CiSearch className="absolute left-2 h-7 w-6" />
            <button
              onClick={submitSearch}
              className="absolute bg-cyan-500 text-white -right-1 py-1.5 px-2  rounded-2xl"
            >
              Search
            </button>
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

        <div
          className={`hidden xl:flex  p-2 rounded-lg text-white cursor-pointer hover:bg-cyan-500/10  relative ${
            pathname == "/cart" ? "bg-slate-600/5   " : ""
          } `}
          onClick={redirectCart}
        >
          <RiShoppingCartLine className="w-6 h-6 text-slate-500 font-normal" />
          {userId == userInfo._id && total_cart_products != 0 ? (
            <p className="text-xs absolute -top-2 -right-2 p-1 px-2.5 rounded-full bg-red-700 ">
              {total_cart_products}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={`xl:flex hidden gap-4 relative`}>
          {userInfo?.role == "customer" ? (
            <div
              className="flex items-center justify-between gap-2 hover:bg-cyan-500/10 p-2 rounded-md cursor-pointer"
              onClick={() => setOpenModal(!openModal)}
            >
              <div className="w-8 h-8 rounded-full relative">
                {userInfo?.image ? (
                  <Image src={Logo} alt="profile" fill={true} />
                ) : (
                  <div className="bg-cyan-500 w-8 h-8 rounded-full"></div>
                )}
              </div>
              <p>{userInfo?.name}</p>
            </div>
          ) : userInfo?.role == "seller" || userInfo.role == "admin" ? (
            <div
              className="flex items-center justify-between gap-2 hover:bg-cyan-500/10 p-2 rounded-md cursor-pointer"
              onClick={() => setOpenModalBackOffice(!openModalBackOffice)}
            >
              <div className="w-8 h-8 rounded-full relative">
                {userInfo?.image ? (
                  <Image src={Logo} alt="profile" fill={true} />
                ) : (
                  <div className="bg-cyan-500 w-8 h-8 rounded-full"></div>
                )}
              </div>
              <p>{userInfo?.name}</p>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="p-1.5 border-2 text-base rounded-md border-cyan-200 px-4 hover:bg-cyan-500 hover:text-white"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="p-1.5 border-2 text-base rounded-md bg-cyan-500 text-white px-4 hover:bg-cyan-600"
              >
                Daftar
              </Link>
            </>
          )}
          <div
            className={`bg-white flex flex-col gap-1 shadow-xl text-slate-700 transition-all duration-500 rounded-md p-2 ${
              openModal ? "block absolute top-12 -left-6 z-[60]" : "hidden"
            }`}
          >
            <Link
              href="/dashboard"
              className={`flex gap-3 hover:bg-cyan-500 hover:text-white py-2 px-3 rounded-lg mx-1 ${
                pathname === "/dashboard" ? "bg-cyan-500 text-white" : ""
              }`}
            >
              <div>
                <LayoutDashboard />
              </div>
              <p>Dashboard</p>
            </Link>
            <button
              className={`flex gap-3  hover:bg-cyan-500 hover:text-white py-2 px-3 rounded-lg mx-1  `}
              onClick={handleLogout}
            >
              <div>
                <LogOut />
              </div>
              <p>Logout</p>
            </button>
          </div>
          <div
            className={`bg-white flex flex-col gap-1 shadow-xl text-slate-700 transition-all duration-500 rounded-md p-2 ${
              openModalBackOffice
                ? "block absolute top-12 -left-6 z-[60]"
                : "hidden"
            }`}
          >
            <button
              className={`flex gap-3  hover:bg-cyan-500 hover:text-white py-2 px-3 rounded-lg mx-1  `}
              onClick={handleLogout}
            >
              <div>
                <LogOut />
              </div>
              <p>Logout</p>
            </button>
          </div>
        </div>
        <div
          className={` duration-500 ease-in xl:hidden z-[60] ${
            isOpen
              ? "fixed left-0 right-0 bottom-0 top-0 bg-black/50 opacity-100"
              : "hidden opacity-0 -left-[100%]"
          }`}
        >
          <div
            className={`flex flex-col px-4 gap-6 pt-10 transition-all duration-500 ease-in ${
              isOpen
                ? "fixed right-[50%] md:right-[60%] left-0 top-0 bottom-0 bg-slate-50 opacity-100"
                : "hidden opacity-0 -left-[100%]"
            }`}
          >
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
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
                <div className="flex flex-col">
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
                  <button
                    className={`flex gap-3  hover:bg-cyan-500 hover:text-white py-2 px-3 rounded-lg mx-1  `}
                    onClick={handleLogout}
                  >
                    <div>
                      <LogOut />
                    </div>
                    <p>Logout</p>
                  </button>
                </div>
              ) : userInfo?.role == "seller" || userInfo.role == "admin" ? (
                <div className="flex flex-col">
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
                  <button
                    className={`flex gap-3  hover:bg-cyan-500 hover:text-white py-2 px-3 rounded-lg mx-1  `}
                    onClick={handleLogout}
                  >
                    <div>
                      <LogOut />
                    </div>
                    <p>Logout</p>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4 px-4">
                  <Link
                    href="/login"
                    className="p-1.5 border-2 text-base  rounded-md border-cyan-200 px-4 hover:bg-cyan-500 hover:text-white"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="p-1.5 border-2 text-base  rounded-md bg-cyan-500 text-white px-4 hover:bg-cyan-600"
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
