import { PropsProduct } from "@/utils/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Ratings from "./Ratings";
import { convertRupiah } from "@/utils/convert";
import {useRouter} from "next/navigation"

const Product = (props: PropsProduct) => {
  const router = useRouter()
  const {
    images,
    name,
    price,
    rating,
    id,
    category,
    stock,
    shopName,
    onClickHandle,
  } = props;
  return (
    <div className="transition-all duration-300 hover:scale-105 h-[380px] md:w-[240px] md:h-96 border-2 border-slate-300 hover:shadow-2xl rounded-lg pb-8 ease-in" >
      <Link className="w-full h-2/3 relative" href={`/detail-product/${id}`}>
        {Array.isArray(images) && (
          <Image
            src={images[0]}
            fill={true}
            alt="gambar"
            className="w-32 h-32 object-cover"
          />
        )}
      </Link>
      <div className="h-1/3 px-4 space-y-2">
        <p className="text-xs text-slate-400 mt-2">{category}</p>
        <div>
          <Link href={`/detail-product/${id}`}>
            <p className="line-clamp-1 text-cyan-500">{name}</p>
          </Link>
          <div className="flex">
            <Ratings ratings={rating} />
          </div>
          <p className="text-slate-400 text-xs">
            <span className="text-cyan-500 font-semibold">{shopName}</span>
          </p>
        </div>
        <div className="flex justify-between items-center text-cyan-500">
          {stock > 0 ? (
            <>
              <p>{convertRupiah(price)}</p>
              <button
                className="p-2 bg-cyan-500/20  rounded-md z-[100]"
                onClick={() => onClickHandle(id)}
              >
                <ShoppingCart />
              </button>
            </>
          ) : (
            <p className="font-semibold">Produk Habis</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
