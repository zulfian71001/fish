"use client";
import { Bell, AlignJustify, Sun } from "lucide-react";
import { user_info } from "@/GlobalRedux/features/authReducer";
import { useAppSelector, AppDispatch } from "@/GlobalRedux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Image from "next/image";

const HeaderDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, userInfo } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      dispatch(user_info());
    }
  }, [token]);
  return (
    <div className="z-20 h-18 flex justify-between items-center bg-white text-cyan-500 py-4 px-8 fixed top-0 right-0 lg:left-60 left-20">
     
      <div>
        {userInfo?.image?.trim() !== "" ? (
          <div className="w-10 h-10 rounded-full bg-cyan-400">
            <Image
              src={userInfo?.image}
              alt="image"
              className="w-full h-full"
              fill={true}
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-cyan-400"></div>
        )}
      </div>
      <div>
        <p className="font-semibold line-clamp-1">
          {userInfo?.name?.split(" ")[0]}
        </p>

        <p className="text-xs font-light">{userInfo?.role}</p>
      </div>
    </div>
  );
};

export default HeaderDashboard;
