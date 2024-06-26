import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/app/api/api";
import {
  RejectedAction,
  IProduct,
  responseDataProduct,
  searchData,
  IDataUpdateProduct,
  responseUpdateDataProduct,
  requestEditDataProduct,
} from "@/utils/types";

const initialState: IProduct = {
  successMsg: "",
  errorsMsg: "",
  loader: false,
  products: [],
  product: {},
  totalProducts: 0,
};

export const add_product = createAsyncThunk(
  "product/add_product",
  async (info: any, { rejectWithValue, fulfillWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await api.post<responseDataProduct>(
        "/add-product",
        info,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const get_products = createAsyncThunk(
  "product/get_products",
  async (info: searchData, { rejectWithValue, fulfillWithValue }) => {
    const { perPage, page, searchValue, sellerId } = info;
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await api.get(
        `/get-products?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}&&sellerId=${sellerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const get_product = createAsyncThunk(
  "product/get_product",
  async (productId: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await api.get(`/get-product/${productId}`,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const update_product = createAsyncThunk(
  "product/update_product",
  async (
    product: IDataUpdateProduct,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await api.post<responseUpdateDataProduct>(
        "/update-product",
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const update_product_image = createAsyncThunk(
  "product/update_product_image",
  async (
    productImage: requestEditDataProduct,
    { rejectWithValue, fulfillWithValue }
  ) => {
    const { oldImage, newImage, productId } = productImage;
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("productId", productId);
      const { data } = await api.post("/update-product-image", formData,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    messageClear: (state) => {
      state.errorsMsg = "";
      state.successMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(add_product.rejected, (state, action) => {
        state.loader = false;
        state.errorsMsg = action.payload as string;
      })
      .addCase(add_product.fulfilled, (state, action) => {
        state.loader = false;
        state.successMsg = action.payload.message as string;
        state.products = action.payload.products;
      })
      .addCase(get_products.fulfilled, (state, action) => {
        state.loader = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(get_product.fulfilled, (state, action) => {
        state.product = action.payload.product;
      })
      .addCase(update_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(update_product.rejected, (state, action) => {
        state.loader = false;
        state.errorsMsg = action.payload as string;
      })
      .addCase(update_product.fulfilled, (state, action) => {
        state.loader = false;
        state.successMsg = action.payload.message as string;
        state.product = action.payload.product;
      });
  },
});

export const { messageClear } = productSlice.actions;

export default productSlice.reducer;
