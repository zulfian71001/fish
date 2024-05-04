"use client";
import Link from "next/link";
import Carts from "./Carts";
import Navbar from "./Navbar";
import Logo from "@/assets/logo.png";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { useEffect } from "react";
import { get_products_cart } from "@/GlobalRedux/features/cartReducer";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useAppSelector((state) => state.auth);
  const {
    cart_products,
    total_cart_products,
    outOfStockProducts,
    shipping_fee,
    buy_item_product, price
  } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(get_products_cart(userInfo?._id));
  }, []);

  return (
    <div className="min-h-[85vh] w-full bg-slate-100">
      <div className="flex flex-col lg:flex-row gap-2 ">
        <div className="w-full lg:w-2/3 min-h-[85vh] flex flex-col p-10">
          {cart_products?.length > 0 || outOfStockProducts?.length > 0 ? (
            <>
              {/* <div className="w-full lg:w-[800px] rounded-md text-slate-700 border my-1 p-4 bg-white">
                <div className="bg-white p-4">
                  <h2 className="text-md text-cyan-500 font-semibold">
                    stok produk{" "}
                    {cart_products?.length}
                  </h2>
                </div>
              </div> */}
              {cart_products.map((data: any, i: number) => (
                <Carts key={i} name={data.shopName} products={data.products} />
              ))}
            </>
          ) : (
            <div className="flex flex-col gap-10 items-center justify-center">
              <p className="text-3xl font-bold">
                tidak ada produk dalam keranjang
              </p>
              <Link href="/home">
                {" "}
                <button className="bg-cyan-500 text-white p-3 rounded-md hover:bg-cyan-600">
                  Belanja sekarang
                </button>
              </Link>
            </div>
          )}
          {outOfStockProducts?.length > 0 && (
            <>
              <div className="w-full lg:w-[800px] rounded-md text-slate-700 border my-1 p-4 bg-white">
                <div className="bg-white p-4">
                  <h2 className="text-md text-cyan-500 font-semibold">
                    stok produk{" "}
                    {outOfStockProducts?.length}
                  </h2>
                </div>
              </div>
              {outOfStockProducts.map((data: any, i: number) => (
                <Carts key={i} name={data.shopName} products={data.products} />
              ))}
            </>
          )}
        </div>
        {
          cart_products.length > 0 && (
            <div className="w-full lg:w-1/3 h-full bg-white p-6 mt-10 mr-10 rounded-md space-y-4">
          <p className="text-xl font-semibold">Orders</p>
          <div className="flex justify-between">
            <p>{buy_item_product} items</p>
            <p>Rp. {price}</p>
          </div>
          <div className="flex justify-between">
            <p>Ongkir</p>
            <p>Rp. {shipping_fee}</p>
          </div>
          <div className="flex justify-between">
            <p>Total</p>
            <p>Rp. {price + shipping_fee}</p>
          </div>
          <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-md" onClick={()=>router.push('/shipping')}>
            checkout
          </button>
        </div>
          )
        }
        
      </div>
    </div>
  );
};

export default CartPage;
