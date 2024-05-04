"use client";
import Image from "next/image";
import { useState } from "react";
import {CartsProps} from "@/utils/types"
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { useEffect } from "react";
import { delete_products_cart, get_products_cart, messageClear, quantity_dec, quantity_inc } from "@/GlobalRedux/features/cartReducer";
import toast from "react-hot-toast";

const Carts = (props:CartsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useAppSelector((state) => state.auth);
  const {successMsg, errorsMsg} = useAppSelector((state) => state.cart);
  const [count, setCount] = useState<number>(0);
  const {name,products} = props
  const deleteProduct = (cartId:any) => {
    dispatch(delete_products_cart(cartId))
  }

  useEffect(() => {
    if (errorsMsg) {
      // toast.error(errorsMsg, { position: "top-right" });
      dispatch(messageClear());
    }
    if (successMsg) {
      // toast.success(successMsg, { position: "top-right" });
      dispatch(messageClear());
      dispatch(get_products_cart(userInfo?._id));
    }
  }, [errorsMsg, successMsg]);

   const inc = (quantity:number, stock:number, cartId:string) =>{
    const temp = quantity +1
    if(temp <= stock){
      dispatch(quantity_inc(cartId))
    }
   }
   const dec = (quantity:number, cartId:string) =>{
    const temp = quantity - 1
    if(temp !== 0){
      dispatch(quantity_dec(cartId))
    }
   }
  return (
    <div className="w-full lg:w-[800px] rounded-md text-slate-700 border my-1 p-4 bg-white">
      <p className="font-semibold">{name}</p>
      {
        products?.map((data:any, i:number) => (
          <div className="w-full flex flex-col lg:flex-row lg:justify-between justify-center items-center my-2" key={i}>
          <div className="w-full flex items-center justify-between px-10">
          <div className=" flex gap-6 items-center">
          <Image src={data?.productInfo?.images[0]} alt="image" className="w-36 h-32 object-contain" width={800} height={800}/>
        </div>
        <p>{data.productInfo?.name}</p>
          </div>
        <div className="w-full flex items-center justify-between px-10">
        <p>{data.productInfo?.price}</p>
        <div className="space-y-2 mt-4 lg:mt-0">
          <div className="w-full flex bg-slate-100 justify-between items-center p-2 rounded-md text-black">
            <button onClick={() => dec(data.quantity, data._id)} className="px-2 ">
              -
            </button>
            <p className="px-2 ">{data?.quantity}</p>
            <button onClick={() => inc(data.quantity, data.productInfo.stock, data._id)} className="px-2">
              +
            </button>
          </div>
          <button className="p-2 px-6 bg-red-700 rounded-md text-slate-50" onClick={()=>deleteProduct(data._id)}>
            Delete
          </button>
        </div>
        </div>
      
      </div>
        ))
      }
    
    
    </div>
  )
}

export default Carts
