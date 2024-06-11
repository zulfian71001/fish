"use client";
import { Bell, AlignJustify, Sun } from "lucide-react";
import { user_info } from "@/GlobalRedux/features/authReducer";
import { useAppSelector, AppDispatch } from "@/GlobalRedux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

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
      <form className="max-w-md ">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-slate-400 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-slate-500 dark:text-slate-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-black rounded-lg bg-transparent focus:border-cyan-300 border-2 border-slate-400 "
            placeholder="Search"
          />
        </div>

      </form>
      <div className="flex gap-3">
        <div>
          <p className="font-semibold line-clamp-1">{userInfo?.name?.split(" ")[0]}</p>

          <p className="text-xs font-light">{userInfo?.role}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-cyan-400"></div>
      </div>
    </div>
  );
};

export default HeaderDashboard;
