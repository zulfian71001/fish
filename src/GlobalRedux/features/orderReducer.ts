import api from "@/app/api/api";
import { GetOrdersParams, IOrder, orderProps, RejectedAction,searchData } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IOrder = {
  myOrders: [],
  errorsMsg: "",
  successMsg: "",
  myOrder: {},
  orderId:"",
  order:{},
  orders:[],
  totalOrders:0
};

export const place_order = createAsyncThunk(
  "order/place_order ",
  async ({price, products,shipping_fee,shippingInfo,userId,navigate,items}:orderProps, { fulfillWithValue, rejectWithValue }) => {
    try {
      
      const { data } = await api.post(`/home/order/place-order`,{
        price, products,shipping_fee,shippingInfo,userId,navigate,items
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      console.log(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const get_orders = createAsyncThunk(
  "order/get_orders", async({customerId, status, page, perPage}:GetOrdersParams, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/home/order/get-orders/${customerId}/${status}?page=${page}&&perPage=${perPage}`);
      console.log(data)
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
)

export const get_admin_orders = createAsyncThunk(
  "order/get_admin_orders", async({perPage,page, searchValue }:searchData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/admin/get-orders?page=${page}&&perPage=${perPage}&&searchValue=${searchValue}`, {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
)
export const get_admin_orders_payment = createAsyncThunk(
  "order/get_admin_orders_payment", async({perPage,page, searchValue }:searchData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/admin/get-orders-payment?page=${page}&&perPage=${perPage}&&searchValue=${searchValue}`, {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
)

export const get_seller_orders = createAsyncThunk(
  "order/get_seller_orders", async({perPage,page, searchValue, sellerId }:searchData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/seller/get-orders/${sellerId}?page=${page}&&perPage=${perPage}&&searchValue=${searchValue}`, {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
)

export const get_order = createAsyncThunk(
  "order/get_order", async(orderId:string , { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/home/order/get-order/${orderId}`);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
)

export const get_admin_order = createAsyncThunk(
  "order/get_admin_order", async(orderId:string , { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/admin/get-order/${orderId}`,{withCredentials:true});
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
)

export const get_seller_order = createAsyncThunk(
  "order/get_seller_order", async(orderId:string , { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/seller/get-order/${orderId}`,{withCredentials:true});
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
)

export const admin_order_status_update = createAsyncThunk(
  "order/admin_order_status_update", async({orderId, info}:{orderId:string, info:any} , { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/admin/order-status/update/${orderId}`,info,{withCredentials:true});
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
)

export const seller_order_status_update = createAsyncThunk(
  "order/seller_order_status_update", async({orderId, info}:{orderId:string, info:any} , { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/seller/order-status/update/${orderId}`,info,{withCredentials:true});
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
)

export const update_status_customer_acceptance = createAsyncThunk(
  "order/update_status_customer_acceptance", async({orderId, info}:{orderId:string, info:any} , { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/home/order/order-status-acceptance/${orderId}`,info,{withCredentials:true});
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
)

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    messageClear: (state) => {
      state.errorsMsg = "";
      state.successMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(place_order.fulfilled, (state, action) => {
        state.successMsg = action.payload.message as string;
        state.order = action.payload.order;
        state.orderId = action.payload.orderId;
      })
      .addCase(place_order.rejected, (state, action) => {
        state.errorsMsg = action.payload as string;
      })    
      .addCase(get_orders.fulfilled, (state, action) => {
        state.myOrders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders
      })
      .addCase(get_order.fulfilled, (state, action) => {
        state.myOrder = action.payload.order;
      })
      .addCase(get_admin_orders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(get_admin_orders_payment.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(get_admin_order.fulfilled, (state, action) => {
        state.order = action.payload.order;
      })
      .addCase(admin_order_status_update.fulfilled, (state, action) => {
        state.successMsg = action.payload.message;
      })      
      .addCase(admin_order_status_update.rejected, (state, action) => {
        state.errorsMsg = action.payload as string;
      })
      .addCase(get_seller_orders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(get_seller_order.fulfilled, (state, action) => {
        state.order = action.payload.order;
      })
      .addCase(seller_order_status_update.fulfilled, (state, action) => {
        state.successMsg = action.payload.message;
      })      
      .addCase(seller_order_status_update.rejected, (state, action) => {
        state.errorsMsg = action.payload as string;
      })
      .addCase(update_status_customer_acceptance.fulfilled, (state, action) => {
        state.successMsg = action.payload.message;
      })      
      .addCase(update_status_customer_acceptance.rejected, (state, action) => {
        state.errorsMsg = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
export const { messageClear } = orderSlice.actions;
