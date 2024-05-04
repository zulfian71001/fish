import api from "@/app/api/api";
import { ICart, IOrder, orderProps, RejectedAction, requestCart } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IOrder = {
  myOrders: [],
  errorsMsg: "",
  successMsg: "",
  myOrder: {},
  orderId:"",
  order:{}
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
    //   .addCase(get_products_cart.fulfilled, (state, action) => {
    //     state.cart_products = action.payload.cart_products;
    //     state.price = action.payload.price;
    //     state.total_cart_products = action.payload.total_cart_products;
    //     state.shipping_fee = action.payload.shipping_fee;
    //     state.outOfStockProducts = action.payload.outOfStockProducts;
    //     state.buy_item_product = action.payload.buy_item_product;
    //   })
    //   .addCase(delete_products_cart.fulfilled, (state, action) => {
    //     state.successMsg = action.payload.message as string;
    //   })
    //   .addCase(quantity_inc.fulfilled, (state, action) => {
    //     state.successMsg = action.payload.message as string;
    //   })
    //   .addCase(quantity_dec.fulfilled, (state, action) => {
    //     state.successMsg = action.payload.message as string;
    //   });
  },
});

export default orderSlice.reducer;
export const { messageClear } = orderSlice.actions;
