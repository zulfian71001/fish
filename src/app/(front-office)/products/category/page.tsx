"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/front-office/Navbar";
import {  CiStar } from "react-icons/ci";
import { ChangeEvent, useEffect, useState } from "react";
const Footer = dynamic(() => import("@/components/front-office/Footer"));
import { get_categories } from "@/GlobalRedux/features/homeReducer";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa6";
import { query_products } from "@/GlobalRedux/features/homeReducer";
import Product from "@/components/front-office/Product";
import { useRouter, useSearchParams } from "next/navigation";
import { add_to_cart, messageClear } from "@/GlobalRedux/features/cartReducer";
import toast from "react-hot-toast";
import Pagination from "@/components/back-office/Pagination";
import { RxHamburgerMenu } from "react-icons/rx";
import { X } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dataCategory = searchParams.get("category");
  const dispatch = useDispatch<AppDispatch>();
  const { products,totalProducts,perPage } = useAppSelector((state) => state.home);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rating, setRating] = useState<number>(0);
  const [sortPrice, setSortPrice] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { userInfo } = useAppSelector((state) => state.auth);
  const { errorsMsg, successMsg } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (errorsMsg) {
      toast.error(errorsMsg, { position: "top-right" });
      dispatch(messageClear());
    }
    if (successMsg) {
      toast.success(successMsg, { position: "top-right" });
      dispatch(messageClear());
    }
  }, [errorsMsg, successMsg]);

  const add_cart = (id: string) => {
    if (!userInfo) {
      router.push("/login");
    } else {
      if (userInfo.role == "customer") {
        dispatch(
          add_to_cart({
            userId: userInfo._id,
            productId: id,
            quantity: 1,
          })
        );
      } else {
        router.push("/login");
      }
    }
  };
  useEffect(() => {
    dispatch(get_categories());
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    dispatch(
      query_products({
        dataCategory,
        rating,
        currentPage,
        sortPrice,
      })
    );
  }, [dataCategory, rating, currentPage, sortPrice]);
  return (
    <div className="w-full ">
      <Navbar />
      <main className="w-full px-2 md:px-6 py-4 lg:px-10 flex gap-2 lg:gap-10 lg:py-10 bg-white relative min-h-screen">
        <div className={`hidden md:w-1/5 md:flex flex-col gap-10 border `}>
          <div className="">
            <h3 className="font-bold">Harga</h3>
            <select
              name=""
              id=""
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSortPrice(e.target.value)
              }
            >
              <option value="">Sort By</option>
              <option value="Low-to-High">Low to High</option>
              <option value="High-to-Low">High to Low</option>
            </select>
          </div>
          <div>
            <h3 className="font-bold">Rating</h3>
            <div className="flex flex-col gap-3">
              <div
                className={`text-yellow-300 gap-2 flex text-xl cursor-pointer hover:text-yellow-400 ${
                  rating === 5 && "text-yellow-500"
                }`}
                onClick={() => setRating(5)}
              >
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
              </div>
              <div
                className={`text-yellow-300 gap-2 flex text-xl cursor-pointer hover:text-yellow-400 ${
                  rating === 4 && "text-yellow-500"
                }`}
                onClick={() => setRating(4)}
              >
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
              </div>
              <div
                className={`text-yellow-300 gap-2 flex text-xl cursor-pointer hover:text-yellow-400 ${
                  rating === 3 && "text-yellow-500"
                }`}
                onClick={() => setRating(3)}
              >
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
              </div>
              <div
                className={`text-yellow-300 gap-2 flex text-xl cursor-pointer hover:text-yellow-400 ${
                  rating === 2 && "text-yellow-500"
                }`}
                onClick={() => setRating(2)}
              >
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
              </div>
              <div
                className={`text-yellow-300 gap-2 flex text-xl cursor-pointer hover:text-yellow-400 ${
                  rating === 1 && "text-yellow-500"
                }`}
                onClick={() => setRating(1)}
              >
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
              </div>
              <div
                className={`text-yellow-300 gap-2 flex text-xl cursor-pointer hover:text-yellow-400 ${
                  rating === 0 && "text-yellow-500"
                }`}
                onClick={() => setRating(0)}
              >
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
              </div>
            </div>
          </div>
        </div>
        <button className={`md:hidden flex bg-cyan-500 hover:bg-cyan-600 text-white h-full p-2`} onClick={() => setIsOpen(true)}>
          <RxHamburgerMenu />
        </button>
        <div
          className={` duration-500 ease-in md:hidden z-[60] ${
            isOpen
              ? "fixed left-0 right-0 bottom-0 top-0 bg-black/50 opacity-100"
              : "hidden opacity-0 -left-[100%]"
          }`}
        >
          <div
            className={`flex flex-col px-4 gap-6 pt-10 transition-all duration-500 ease-in ${
              isOpen
                ? "fixed right-[40%] left-0 top-0 bottom-0 bg-slate-50 opacity-100"
                : "hidden opacity-0 -left-[100%]"
            }`}
          >
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
            <div className={`flex flex-col gap-10  `}>
          <div className="">
            <h3 className="font-bold">Harga</h3>
            <select
              name=""
              id=""
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSortPrice(e.target.value)
              }
            >
              <option value="">Sort By</option>
              <option value="Low-to-High">Low to High</option>
              <option value="High-to-Low">High to Low</option>
            </select>
          </div>
          <div>
            <h3 className="font-bold">Rating</h3>
            <div className="flex flex-col gap-3">
              <div
                className={`text-yellow-300 gap-2 flex text-xl cursor-pointer hover:text-yellow-400 ${
                  rating === 5 && "text-yellow-500"
                }`}
                onClick={() => setRating(5)}
              >
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
              </div>
              <div
                className={`text-yellow-300 gap-2 flex text-xl cursor-pointer hover:text-yellow-400 ${
                  rating === 4 && "text-yellow-500"
                }`}
                onClick={() => setRating(4)}
              >
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
              </div>
              <div
                className={`text-yellow-300 gap-2 flex text-xl cursor-pointer hover:text-yellow-400 ${
                  rating === 3 && "text-yellow-500"
                }`}
                onClick={() => setRating(3)}
              >
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
              </div>
              <div
                className={`text-yellow-300 gap-2 flex text-xl cursor-pointer hover:text-yellow-400 ${
                  rating === 2 && "text-yellow-500"
                }`}
                onClick={() => setRating(2)}
              >
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
              </div>
              <div
                className={`text-yellow-300 gap-2 flex text-xl cursor-pointer hover:text-yellow-400 ${
                  rating === 1 && "text-yellow-500"
                }`}
                onClick={() => setRating(1)}
              >
                <span>
                  {" "}
                  <FaStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
              </div>
              <div
                className={`text-yellow-300 gap-2 flex text-xl cursor-pointer hover:text-yellow-400 ${
                  rating === 0 && "text-yellow-500"
                }`}
                onClick={() => setRating(0)}
              >
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
                <span>
                  {" "}
                  <CiStar />
                </span>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
        <div className="w-full lg:w-4/5 flex flex-col gap-6 border">
          {totalProducts > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.map((data: any, i: number) => (
                <Product
                  name={data.name}
                  key={i}
                  images={data.images}
                  shopName={data.shopName}
                  category={data.categoryName}
                  rating={data.ratings}
                  price={data.price}
                  id={data._id}
                  onClickHandle={() => add_cart(data._id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center pt-10 w-full h-full">
              <h3 className=" font-semibold text-slate-700">
                produk tidak ada 
              </h3>
            </div>
          )}
          <div>
            {totalProducts > perPage && (
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItems={totalProducts}
                perPage={perPage}
                showItems={Math.floor(totalProducts / perPage)}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
