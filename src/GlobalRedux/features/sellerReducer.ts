import api from "@/app/api/api";
import {
  ISeller,
  RejectedAction,
  searchData,
  UpdataStatus,
} from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ISeller = {
  successMsg: "",
  errorsMsg: "",
  loader: false,
  sellers: [],
  seller: "",
  totalSellers: 0,
};

export const get_request_seller = createAsyncThunk(
  "seller/get_request_seller",
  async (info: searchData, { rejectWithValue, fulfillWithValue }) => {
    const { perPage, page, searchValue } = info;
    try {
      const { data } = await api.get(
        `/get-request-seller?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const get_sellers = createAsyncThunk(
  "seller/get_sellers",
  async (info:searchData, { fulfillWithValue, rejectWithValue }) => {
    const {searchValue, perPage, page} = info
    try {
      const { data } = await api.get(`/get-sellers?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const get_seller = createAsyncThunk(
  "seller/get_seller",
  async (sellerId: string, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/get-seller/${sellerId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const update_status_seller = createAsyncThunk(
  "seller/update_status_seller",
  async (info: UpdataStatus, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/update-status-seller`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const sellerReducer = createSlice({
  name: "seller",
  initialState,
  reducers: {
    messageClear: (state) => {
      state.errorsMsg = "";
      state.successMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_request_seller.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_request_seller.rejected, (state, action) => {
        state.loader = false;
        state.errorsMsg = action.payload as string;
      })
      .addCase(get_request_seller.fulfilled, (state, action) => {
        state.loader = false;
        state.successMsg = action.payload.message as string;
        state.sellers = action.payload.sellers;
        state.totalSellers = action.payload.totalSellers;
      }).addCase(get_seller.fulfilled, (state, action) => {
        state.loader = false;
        state.seller = action.payload.seller;
      }).addCase(update_status_seller.fulfilled, (state, action)=>{
        state.loader = false
        state.successMsg = action.payload.message as string
        state.seller = action.payload.seller
      }).addCase(update_status_seller.rejected, (state, action) => {
        state.loader = false;
        state.errorsMsg = action.payload as string;
      }).addCase(get_sellers.fulfilled, (state, action)=>{
        state.loader = false
        state.sellers = action.payload.sellers
        state.totalSellers = action.payload.totalSellers
      })
  },
});

export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
