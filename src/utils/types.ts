import { Id } from "@reduxjs/toolkit/dist/tsHelpers";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { StaticImageData } from "next/image";
import React, { SetStateAction, Dispatch, MouseEventHandler } from "react";

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

interface userInfo {
  _id:string
  name:string
  image:string
  token:string
  role:string
}
export interface IAuth {
  successMsg: string;
  errorsMsg: string;
  loader: boolean;
  userInfo: Partial<userInfo>;
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
  sellerId?: string;
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
  province:string
  city: string;
  district: string;
  subDistrict: string;
  spesificAddress: string;
  noWa:string;
  noRek: string;
  noGopay: string;
}

export interface IFormSeller {
  name: string;
  email: string;
  sellerId?: string;
}

export interface IFormUpdatePassword {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface IFormUpdatePasswordUser {
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
  stock:number
  id: string;
  onClickHandle: (id: string) => void;
}

export interface CartsProps {
  name: string;
  products: [];
}

export interface IPayout {
  sellerId: string;
  price: number;
}

export interface IBankAccount {
  account: string;
  name: string;
  bank:string
}

export interface ShippingProps {
  name: string;
  province: string;
  address: string;
  phone: string;
  city: string;
  post: string;
  district: string;
  subDistrict: string;
  payment: string;
}

export interface IHome {
  categories: [];
  products: [];
  product: {};
  totalProducts: number;
  perPage: number;
  errorsMsg: string;
  successMsg: string;
  rating_review:[]
  reviews:[]
  totalReviews:number
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
  orderId: string;
  order: {};
  orders:[],
  totalOrders:number
}

export interface IPayment {
  transactionToken: string;
  errorsMsg: string;
  successMsg: string;
  loading: boolean;
}

export interface requestCart {
  userId: string;
  productId: string;
  quantity: number;
}

export interface orderProps {
  price: number;
  products: [];
  shipping_fee: number;
  shippingInfo: any;
  userId: string;
  navigate: any;
  items: number;
}

export interface PropsModal {
  handleClick: (id: string) => void;
  closeModal: () => void;
  modal: boolean;
  id?: string;
}

export interface GetOrdersParams {
  customerId: string;
  status: string;
  perPage:number
  page:number
}
export interface GetDashboardParams {
  userId: string;
}

export interface IDashboardUser {
  recentOrders: [];
  errorsMsg: string;
  successMsg: string;
  totalOrders: number;
  pendingOrder: number;
  cancelledOrder: number;
}

export interface NumberDataDashboardUser {
  totalOrders?: number;
  pendingOrder?: number;
  cancelledOrder?: number;
}

export interface RatingProps {
  className?: string;
  count: number;
  value: number;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  size?: number;
  edit?: boolean;
  isHalf?: boolean;
  onChange?: (value: number) => void;
  emptyIcon?: React.ReactElement;
  halfIcon?: React.ReactElement;
  fullIcon?: React.ReactElement;
}

export interface reviewProps {
  rating:number
  input:string
}

export interface fdMessages {
  id?:string
  senderId:string,
  senderName:string,
  receiverId:string,
  message:string,
status?:string
}

export interface  myFriends {
  fdId:string,
  name:string,
  image:string,
}

export interface IChatUserRedux {
  successMsg: string;
  errorsMsg: string;
  my_friends:myFriends[],
  fd_messages: fdMessages[],
  currentFd:{}
}
export interface IBackOfficeChatRedux {
  successMsg: string;
  errorsMsg: string;
  customers:Partial<myFriends>[],
  sellers:Partial<myFriends>[],
  messages:fdMessages[],
  activeCustomer:Partial<myFriends>[],
  activeSeller:Partial<myFriends>[],
  messageNotification:[],
  activeAdmin:[],
  friends:[],
  seller_admin_message:Partial<fdMessages>[],
  currentSeller:{},
  currentCustomer:{}
}