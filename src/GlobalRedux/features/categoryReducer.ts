import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/app/api/api";
import {
  RejectedAction,
  ICategory,
  requestDataCategory,
  responseDataCategory,
  searchData
} from "@/utils/types";

const initialState: ICategory = {
  successMsg: "",
  errorsMsg: "",
  loader: false,
  categories: [] ,
  category:{},
  totalCategories:0
};

export const add_category = createAsyncThunk(
  "category/add_category",
  async (info: requestDataCategory, { rejectWithValue, fulfillWithValue }) => {
    const { name, image } = info;
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const { data } = await api.post<responseDataCategory>(
        "/add-category",
        formData,
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

export const get_category = createAsyncThunk(
  "category/get_category",
  async (categoryId:string, { rejectWithValue, fulfillWithValue }) => {
    try {

      const { data } = await api.get(
        `/get-category/${categoryId}`,
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

export const delete_category = createAsyncThunk(
  "category/delete_category",
  async (categoryId:string, { rejectWithValue, fulfillWithValue }) => {
    try {

      const { data } = await api.delete(
        `/delete-category/${categoryId}`,
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

export const get_categories = createAsyncThunk(
  "category/get_categories",
  async (info: searchData, { rejectWithValue, fulfillWithValue }) => {
    const { perPage, page, searchValue } = info;
    try {

      const { data } = await api.get(
        `/get-categories?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
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

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    messageClear: (state) => {
      state.errorsMsg = "";
      state.successMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_category.pending, (state) => {
        state.loader = true;
      })
      .addCase(add_category.rejected, (state, action) => {
        state.loader = false;
        state.errorsMsg = action.payload as string;
      })
      .addCase(add_category.fulfilled, (state, action) => {
        state.loader = false;
        state.successMsg = action.payload.message as string;
        state.categories = action.payload.categories
      }).addCase(get_categories.fulfilled, (state, action) => {
        state.loader = false
        state.totalCategories = action.payload.totalCategories
        state.categories = action.payload.categories
      })
      .addCase(get_category.fulfilled, (state, action) => {
        state.loader = false
        state.category = action.payload.category
      })
      .addCase(delete_category.fulfilled, (state, action) => {
        state.loader = false
        state.successMsg= action.payload.message  as string
      })
  },
});

export const { messageClear } = categorySlice.actions;

export default categorySlice.reducer;
