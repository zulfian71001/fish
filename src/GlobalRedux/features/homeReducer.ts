import api from "@/app/api/api";
import { IHome, RejectedAction } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IHome = {
  categories: [],
  products: [],
  product: {},
  totalProducts: 0,
  perPage: 4,
  errorsMsg: "",
  successMsg: "",
  reviews:[],
  rating_review:[],
  totalReviews:0
};

export const get_categories = createAsyncThunk(
  "home/get_category",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/home/get-categories", {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return fulfillWithValue(data.categories);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const get_products = createAsyncThunk(
  "home/get_products",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/home/get-products",{
        headers: {
          'Content-Type': 'application/json'
        },}
      );
      return fulfillWithValue(data.products);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const get_product = createAsyncThunk(
  "home/get_product",
  async (id: string, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/home/get-product/${id}`);
      return fulfillWithValue(data.product);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const query_products = createAsyncThunk(
  "home/query_product",
  async (query: any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/query-products?category=${query.dataCategory}&&searchValue=${
          query.searchValue ? query.searchValue : ""
        }&&rating=${query.rating}&&sortPrice=${query.sortPrice}&&pageNumber=${
          query.currentPage
        }`
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      console.log(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const search_products = createAsyncThunk(
  "home/search_product",
  async (query: any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/search-products?searchValue=${
          query.searchValue ? query.searchValue : ""
        }&&rating=${query.rating}&&sortPrice=${query.sortPrice}&&pageNumber=${
          query.currentPage
        }`
      );
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const customer_review = createAsyncThunk(
  "review/customer_review",
  async (info: any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/home/customer/submit-review`, info);
      console.log(data);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      console.log(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const get_reviews = createAsyncThunk(
  "review/get_reviews", async({productId, pageNumber}:{productId:string, pageNumber:number}, {fulfillWithValue, rejectWithValue})=>{
    try {
      const {data} = await api.get(`/home/customer/get-reviews/${productId}?pageNumber=${pageNumber}`)
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
)

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    messageClear: (state) => {
      state.successMsg = "";
      state.errorsMsg = "";
    },
  },
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
      .addCase(query_products.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
        state.perPage = action.payload.perPage;
      })
      .addCase(search_products.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
        state.perPage = action.payload.perPage;
      })
      .addCase(customer_review.fulfilled, (state, action) => {
        state.successMsg= action.payload.message as string;
      })
      .addCase(customer_review.rejected, (state, action) => {
        state.errorsMsg= action.payload as string;
      })
      .addCase(get_reviews.fulfilled, (state, action) => {
        state.reviews = action.payload.reviews;
        state.totalReviews = action.payload.totalReviews;
        state.rating_review = action.payload.rating_review;
      });
  },
});
export const { messageClear } = homeSlice.actions;
export default homeSlice.reducer;
