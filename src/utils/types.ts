import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { StaticImageData } from "next/image";
import { SetStateAction, Dispatch, MouseEventHandler } from "react";

export interface IPaginationProps {
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
  totalItems: number;
  perPage: number;
  showItems: number;
}

export interface IDataProduct {
  name: string;
  categoryName: string;
  stock: number;
  price: number;
  desc: string;
}

export interface IDataUpdateProduct {
  productId: string;
  name: string;
  categoryName: string;
  stock: number;
  price: number;
  desc: string;
}

export interface IChatUser {
  image: StaticImageData;
  name: string;
}

export interface IChangeImage {
  image: File;
  idx: number;
}

export interface RejectedAction {
  error: Error;
}

export type requestData = {
  email: string;
  password: string;
};

export type requestDataRegister = {
  email: string;
  password: string;
};

export interface serverResponse {
  token: string;
  message: string;
}
export interface serverResponseRegister {
  message: string;
}

export interface IAuth {
  successMsg: string;
  errorsMsg: string;
  loader: boolean;
  userInfo: string;
  role: string;
  token: string;
}
export interface ICategory {
  successMsg: string;
  errorsMsg: string;
  loader: boolean;
  categories: [];
  totalCategories: number;
  category: {};
}
export interface IJwtPayload {
  exp: number;
  role: string;
}

export interface requestDataCategory {
  name: string;
  image: File;
}
export interface searchData {
  perPage: number;
  page: number;
  searchValue: string;
  sellerId?:string
}

export interface responseDataCategory {
  message: string;
  categories: [];
}
export interface IDataCategory {
  image: string | StaticImport;
  name: string;
  _id: string;
}

export interface IProduct {
  successMsg: string;
  errorsMsg: string;
  loader: boolean;
  products: [];
  product: {};
  totalProducts: number;
}

export interface responseDataProduct {
  message: string;
  products: [];
}
export interface responseUpdateDataProduct {
  message: string;
  product: string;
}

export interface IDataMapProduct {
  _id: string;
  images: string | StaticImport;
  categoryName: string;
  name: string;
  desc: string;
  stock: number;
  price: number;
}

export interface requestEditDataProduct {
  productId: string;
  oldImage: string;
  newImage: File;
}

export interface IFormStore {
  shopName: string;
  city: string;
  district: string;
  spesificAddress: string;
}

export interface IFormUpdatePassword {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface ISeller {
  successMsg: string;
  errorsMsg: string;
  loader: boolean;
  sellers: [];
  seller: string;
  totalSellers: number;
}

export interface UpdataStatus {
  sellerId: string;
  status: string;
}

export interface PropsProduct {
  images: string | StaticImport;
  category: string;
  name: string;
  rating: number;
  price: number;
  shopName: string;
  id: string;
  onClickHandle: (id: string) => void;
}

export interface CartsProps {
  name: string;
  products: [];
}

export interface ShippingProps {
  name: string;
  province: string;
  address: string;
  phone: string;
  city: string;
  post: string;
  district: string;
  payment: string;
}

export interface IHome {
  categories: [];
  products: [];
  product: {};
}

export interface ICart {
  userId: string;
  cart_products: [];
  total_cart_products: number;
  buy_item_product: number;
  total_wishlist: number;
  wishlist: [];
  price: number;
  errorsMsg: string;
  successMsg: string;
  shipping_fee: number;
  outOfStockProducts: [];
}

export interface IOrder {
  myOrders: [];
  errorsMsg: string;
  successMsg: string;
  myOrder: {};
  orderId:string,
  order:{}
}

export interface IPayment {
  transactionToken:string,
  errorsMsg: string;
  successMsg: string;
  loading:boolean
}

export interface requestCart {
  userId: string;
  productId: string;
  quantity: number;
}

export interface orderProps {
  price:number
  products:[]
  shipping_fee:number
  shippingInfo:any
  userId:string
  navigate:any
  items:number
}