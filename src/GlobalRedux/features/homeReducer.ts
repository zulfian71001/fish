import api from "@/app/api/api";
import { IHome, RejectedAction } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IHome = {
  categories: [],
  products: [],
  product: {},
};

export const get_categories = createAsyncThunk(
  "home/get_category",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/home/get-categories");
return fulfillWithValue(data.categories)
    } catch (error :RejectedAction | any) {
        console.log(error.response.data.error)
        return rejectWithValue(error.response.data.error)
    }
  }
);

export const get_products = createAsyncThunk(
  "home/get_products",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/home/get-products");
console.log(data.products)
return fulfillWithValue(data.products)
    } catch (error :RejectedAction | any) {
        console.log(error.response.data.error)
        return rejectWithValue(error.response.data.error)
    }
  }
);

export const get_product = createAsyncThunk(
  "home/get_product",async(id:string, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/home/get-product/${id}`)
      console.log(data)
      return fulfillWithValue(data.product)
    } catch (error :RejectedAction | any) {
        console.log(error.response.data.error)
        return rejectWithValue(error.response.data.error)
    }
  }
)

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_categories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(get_products.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(get_product.fulfilled, (state, action) => {
        state.product = action.payload;
      })
  },
});

export default homeSlice.reducer;
