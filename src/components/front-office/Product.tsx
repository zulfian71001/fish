import { PropsProduct } from "@/utils/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Ratings from "./Ratings";
import { convertRupiah } from "@/utils/convert";

const Product = (props: PropsProduct) => {
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
    <div className="transition-all duration-300 h-[360px] md:w-[175px] md:h-96 border-2 border-slate-300 hover:shadow-2xl rounded-lg pb-8 ease-in">
      <div className="w-full h-2/3 relative">
        {Array.isArray(images) && (
          <Image
            src={images[0]}
            fill={true}
            alt="gambar"
            className="w-32 h-32 object-cover"
          />
        )}
      </div>
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
            By <span className="text-cyan-500">{shopName}</span>
          </p>
        </div>
        <div className="flex justify-between items-center text-cyan-500">
          {stock > 0 ? (
            <>
              <p>{convertRupiah(price)}</p>
              <button
                className="p-2 bg-cyan-500/20  rounded-md"
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
