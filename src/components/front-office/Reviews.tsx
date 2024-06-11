"use client";
import Ratings from "./Ratings";
import RatingTemp from "./RatingTemp";
import Pagination from "../back-office/Pagination";
import { ChangeEvent, useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { Rating } from "./Rating";
import { get_product } from "@/GlobalRedux/features/homeReducer";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import Link from "next/link";
import {
  customer_review,
  messageClear,
  get_reviews,
} from "@/GlobalRedux/features/homeReducer";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const Reviews = ({
  productId = "",
  productRating,
}: {
  productId: string;
  productRating: number;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { errorsMsg, successMsg, reviews, totalReviews, rating_review } =
    useAppSelector((state) => state.home);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const ReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const obj = {
      name: userInfo.name,
      productId,
      rating,
      review,
    };
    dispatch(customer_review(obj));
  };
  useEffect(() => {
    if (successMsg) {
      toast.success(successMsg, { position: "top-right" });
      setRating(0);
      setReview("");
      dispatch(get_product(productId));
      dispatch(messageClear());
    }
  }, [successMsg, productId]);

  useEffect(() => {
    if (productId) {
      dispatch(
        get_reviews({
          productId,
          pageNumber: currentPage,
        })
      );
    }
  }, [productId]);
  return (
    <>
      <div className="flex gap-10 md:flex-col py-3 px-10 ">
        <div className="flex flex-col gap-2 py-2">
          <div>
            <span className="text-|6xl front-semibold">{productRating}</span>
            <span className="text-3xl front-semibold text-slate-700">/5</span>
          </div>
          <div className="flex text-4xl">
            <Ratings ratings={productRating} />
          </div>
          <p className="text-slate-700 text-sm">{totalReviews} Semua Rating</p>
        </div>
        <div className="flex flex-col gap-2 py-2">
          {rating_review.length > 0 &&
            rating_review.map((data: any, i: number) => (
              <div className="flex gap-5 items-center" key={i}>
                <div className="flex gap-1 text-md w-[93px]">
                  <RatingTemp ratings={data.rating} />
                </div>
                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                  <div
                    className={`h-full bg-yellow-300 `}
                    style={{
                      width: `${Math.floor((100 * data.sum) / totalReviews)}%`,
                    }}
                  ></div>
                  <p className="text-sm text-slate-700 absolute -right-4 -top-1 w-[0%]">
                    {data.sum}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <h4 className="font-semibold py-2 text-slate-700">
          {totalReviews} Review Produk
        </h4>
        <div className="flex flex-col gap-8 pb-10 pt-4">
          {reviews.length > 0 &&
            reviews.map((data: any, i: number) => (
              <div className="flex flex-col gap-1" key={i}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 text-xl">
                    <RatingTemp ratings={data.rating} />
                  </div>
                  <span className="text-slate-700">{data.date}</span>
                </div>
                <span className="text-slate-700 text-md">{data.name}</span>
                <p className="text-slate-700 text-sm">{data.review}</p>
              </div>
            ))}
          <div className="flex justify-end">
            {totalReviews > 5 && (
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItems={20}
                perPage={perPage}
                showItems={Math.round(totalReviews / 5)}
              />
            )}
          </div>
        </div>
        <div>
          {!userInfo ? (
            <Link
              className="px-4 py-2 bg-cyan-500 text-white hover:bg-cyan-600 rounded-md"
              href="/login"
            >
              Masuk
            </Link>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex gap-1">
                <Rating
                  count={5}
                  value={rating}
                  edit={true}
                  onChange={(value) => setRating(value)}
                />
              </div>
              <form onSubmit={ReviewSubmit} className="space-y-2">
                <textarea
                  required
                  name=""
                  id=""
                  cols={30}
                  rows={5}
                  className="w-full border border-slate-500 focus:border-cyan-500 rounded-lg p-3"
                  placeholder="tulis komentar anda"
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setReview(e.target.value)
                  }
                  value={review}
                ></textarea>
                <button className="px-4 py-2 bg-cyan-500 text-white hover:bg-cyan-600 rounded-md">
                  Kirim
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
