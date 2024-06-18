"use client";
import Product from "./Product";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { get_products } from "@/GlobalRedux/features/homeReducer";
import { useRouter} from "next/navigation";
import { add_to_cart, messageClear } from "@/GlobalRedux/features/cartReducer";
import toast from "react-hot-toast";
import { convertRupiah } from "@/utils/convert";

const Products = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useAppSelector((state) => state.home);
  const { userInfo } = useAppSelector((state) => state.auth);
  const { errorsMsg, successMsg } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(get_products());
  }, []);
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
        dispatch(
          add_to_cart({
            userId: userInfo._id,
            productId: id,
            quantity: 1,
          })
        );
      }
   
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 my-10">
      {products &&
        products?.map((data: any, i: number) => (
          <Product
            name={data?.name}
            key={i}
            images={data?.images}
            shopName={data?.shopName}
            category={data?.categoryName}
            rating={data?.ratings}
            price={data?.price} 
            id={data?._id}
            onClickHandle={() => add_cart(data?._id)}
          />
        ))}
    </div>
  );
};

export default Products;
