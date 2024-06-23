"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { get_categories } from "@/GlobalRedux/features/homeReducer";
import Image from "next/image";

const Banner = dynamic(() => import("@/components/front-office/Banner"));
const Navbar = dynamic(() => import("@/components/front-office/Navbar"));
const Products = dynamic(() => import("@/components/front-office/Products"));
const Footer = dynamic(() => import("@/components/front-office/Footer"));

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useAppSelector((state) => state.home);
  const { userInfo} = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(get_categories());
  }, [dispatch]);

  return (
    <div className="w-full">
      <Navbar />
      <main className="w-full px-2 lg:px-10 flex flex-col">
        <Banner />
        <div>
          <div className="w-full flex flex-col items-center md:items-start">
            <div className="w-full flex gap-4 justify-center items-center">
              {categories.length > 0 &&
                categories.map((data: any, i: number) => (
                  <div
                  className="hover:bg-slate-100 p-2 rounded-md"
                    key={i}
                    onClick={() =>
                      router.push(
                        `/products/category?category=${data?.name}`
                      )
                    }
                  >
                    <div className="flex flex-col justify-center items-center gap-4 text-slate-700">
                      <div className="rounded-full w-36 h-36 object-cover">
                        {" "}
                        <Image
                        className="rounded-full"
                          src={data?.image}
                          alt="gambar"
                          width={500}
                          height={500}
                        />{" "}
                      </div>
                      <p>{data.name}</p>
                    </div>
                  </div>
                ))}
            </div>
            <h2 className="font-semibold text-4xl text-center my-10">PRODUK TERBARU</h2>
            <Products />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
