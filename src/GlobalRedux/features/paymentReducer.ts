import api from "@/app/api/api";
import {

  IBankAccount,
  IPayment,
  IPayout,
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
  "payment/process_transaction",
  async ({ id }: { id: string }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/home/payment/process-transaction`, { id });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data.error : error.message);
    }
  }
);

export const admin_payout_to_seller = createAsyncThunk(
  "payment/admin_payout_to_seller",
  async (info:IPayout, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/home/admin/admin-payout-to-seller`, info);
      console.log(data)
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data.error : error.message);
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
    clearTransactionToken:(state)=>{
      state.transactionToken=""
    }
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

  },
});

export default paymentSlice.reducer;
export const { messageClear, clearTransactionToken } = paymentSlice.actions;
