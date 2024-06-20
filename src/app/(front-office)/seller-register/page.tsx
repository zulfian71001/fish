"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LayoutAuth from "@/components/front-office/LayoutAuth";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { seller_register, messageClear } from "@/GlobalRedux/features/authReducer";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import cover from "@/assets/daftarSeller.jpg"

const signInSchema = z.object({
  name: z.string().min(3, "minimal 3 karakter"),
  email: z.string().email("harus menggunakan email yang valid"),
  password: z.string().min(6, "password minimal 6 karakter"),
});

function RegisterSellerPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loader, errorsMsg, successMsg } = useAppSelector(
    (state) => state.auth
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof signInSchema>) {
    dispatch(seller_register(values));
  }
  useEffect(() => {
    if (errorsMsg) {
      toast.error(errorsMsg, { duration: 3000, position: "top-right" });
      dispatch(messageClear());
    }
    if (successMsg) {
      toast.success(successMsg, { duration: 3000, position: "top-right" });
      dispatch(messageClear());
      router.push('/seller/dashboard')
    }
  }, [errorsMsg, successMsg,dispatch, router]);
  return (
    <>
    <Toaster/>
      <LayoutAuth
        title="Register"
        desc="Sudah mempunyai akun ?"
        gambar={cover}
        namelink="login disini"
        link="/login"
        formLayout={
          <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nama
              </label>
              <input
                type="name"
                id="name"
                className="bg-gray-50 border focus:ring-1 border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                placeholder="ketikkan nama anda"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name?.message}</p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                placeholder="ketikkan email anda"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email?.message}</p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                placeholder="ketikkan password anda"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password?.message}</p>
              )}
            </div>
            <button
              disabled={loader ? true : false}
              type="submit"
              className="text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              {loader ? (
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-400"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                "Register"
              )}
            </button>
          </form>
        }
      />
    </>
  );
}

export default RegisterSellerPage;
