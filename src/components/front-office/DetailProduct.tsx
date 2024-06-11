"use client";
import React, { createContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import Ikan from "@/assets/ikan.jpeg";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Ratings from "./Ratings";
import { get_product } from "@/GlobalRedux/features/homeReducer";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { add_to_cart, messageClear } from "@/GlobalRedux/features/cartReducer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Reviews from "./Reviews";

const DetailProduct = ({ productId }: { productId: string }) => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const { product } = useAppSelector((state) => state.home);
  const { userInfo } = useAppSelector((state) => state.auth);
  const { errorsMsg, successMsg } = useAppSelector((state) => state.cart);
  const [quantity, setQuantity] =  useState<number>(1);
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    dispatch(get_product(productId));
  }, [productId]);

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


  const inc = () =>{
    const temp = quantity +1
    if(temp >= product.stock){
      toast.error('stok habis')
    } else{
      setQuantity(quantity+1)
    }
   }
   const dec = () =>{
    const temp = quantity - 1
    if(temp !== 0){
      setQuantity(quantity-1)
      
    }
   }
  const add_cart = (id: string) => {
    if (!userInfo) {
      router.push("/login");
    } else {
      if (userInfo.role == "customer") {
        dispatch(
          add_to_cart({
            userId: userInfo._id,
            productId: id,
            quantity: quantity,
          })
        );
      }
      else{
        router.push("/login");
      }
    }
   
  };

  return (
    <div className="w-full my-6">
      <div className="flex items-center gap-2 p-4 bg-cyan-100">
        <Link href={"/home"} className="hover:text-cyan-600">
          Home
        </Link>
        <MdOutlineKeyboardArrowRight />
        <Link
          href={`/detail-product/${productId}`}
          className="hover:text-cyan-600"
        >
          {product.name}
        </Link>
      </div>
      <div className="w-full flex flex-col lg:flex-row px-8 my-6">
        <div className="flex flex-col gap-8 relative w-full lg:w-1/2 border-2 border-slate-300 rounded-md">
          <Image
            src={image ? image : product.images[0]}
            alt="gambar"
            className="w-full object-contain"
            width={500}
            height={500}
          />
          {product?.images.length > 1 ? (
            <div className="w-full">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {product.images?.map((img: any, i: number) => (
                  <SwiperSlide
                    key={i}
                    onClick={() => setImage(img)}
                  >
                    <Image
                      src={img}
                      alt="gambar"
                      width={500}
                      height={500}
                      objectFit="contain"
                      objectPosition="center"
                      className="w-full h-full"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-full lg:w-1/2 space-y-6 mx-4 px-4 border">
          <h3 className="text-6xl font-semibold text-cyan-700">{product.name}</h3>
          <div className="flex gap-4">
            <div className="flex items-center">
              <Ratings ratings={4.5} />
            </div>
            <p className="text-cyan-600">(23 reviews)</p>
          </div>
          <p className="text-cyan-600 font-bold text-3xl">{product.price}</p>
          <p className="text-slate-700 text-xl">
            {product.desc}
          </p>
          {product.stock ? (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 bg-slate-300 text-black rounded-md ">
                <button className="px-4 py-3 hover:bg-slate-400" onClick={dec}>-</button>
                <p className=" p-3">{quantity}</p>
                <button className="px-4 py-3 hover:bg-slate-400" onClick={inc}>+</button>
              </div>
              <button className="bg-cyan-500 text-white py-3 px-8 rounded-md hover:bg-cyan-600" onClick={()=>add_cart(productId)}>
                Tambah Ke Keranjang
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="flex gap-6 py-6 items-center">
            <p className="font-bold text-2xl">Ketersediaan</p>
            <p className={`text-${product.stock ? "cyan" : "red"}-600`}>
              {product.stock ? `stok ada ${product.stock} kg` : "stok habis"}
            </p>
          </div>
          <div className="flex gap-4">
            {product.stock ? (
              ""
              // <button className="bg-cyan-500 py-3 px-8 rounded-md hover:bg-cyan-600 text-white">
              //   Buy Now
              // </button>
            ) : (
              ""
            )}
            <button className="bg-slate-300 text-black py-3 px-8 rounded-md hover:bg-slate-400" onClick={()=>router.push(`/dashboard/chat/${product.sellerId}`)}>
              Chat seller
            </button>
          
          </div>
        </div>
      </div>
      <div className="">
      <Reviews productId={product._id} productRating={product.ratings}/>
      </div>
    </div>
  );
};

export default DetailProduct;
