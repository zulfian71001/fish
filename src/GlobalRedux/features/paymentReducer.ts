import api from "@/app/api/api";
import {

  IPayment,
  orderProps,
  RejectedAction,

} from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IPayment = {
  transactionToken: "",
  errorsMsg: "",
  successMsg: "",
  loading:true
};

export const process_transaction = createAsyncThunk(
  "payment/process_transaction ",
  async (id:string,
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await api.post(`/home/payment/process-transaction`, {id});
      console.log(data);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      console.log(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    messageClear: (state) => {
      state.errorsMsg = "";
      state.successMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(process_transaction.fulfilled, (state, action) => {
        state.loading = false
        state.transactionToken = action.payload.token;
      })
      .addCase(process_transaction.rejected, (state, action) => {
        state.loading = false
        state.errorsMsg = action.payload as string;
      })
      .addCase(process_transaction.pending, (state, action) => {
        state.loading = true;
      });
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

export default paymentSlice.reducer;
export const { messageClear } = paymentSlice.actions;
