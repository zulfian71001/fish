import api from "@/app/api/api";
import { ICart, RejectedAction, requestCart } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ICart = {
  userId: "",
  cart_products: [],
  total_cart_products: 0,
  buy_item_product:0,
  total_wishlist: 0,
  wishlist: [],
  price: 0,
  errorsMsg: "",
  successMsg: "",
  shipping_fee: 0,
  outOfStockProducts: [],
  
};

export const add_to_cart = createAsyncThunk(
  "cart/add_to_cart",
  async (info: requestCart, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/home/product/add-to-cart`, info);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error)
    }
  }
);

export const get_products_cart = createAsyncThunk(
  "cart/get_products_cart",
  async (userId:any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/home/product/get-products-cart/${userId}`);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error)
    }
  }
);

export const delete_products_cart = createAsyncThunk(
  "cart/delete_products_cart",
  async (cartId:any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/home/product/delete-products-cart/${cartId}`);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error)
    }
  }
);

export const quantity_inc = createAsyncThunk(
  "cart/quantity_inc",
  async (cartId:any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-inc/${cartId}`);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error)
    }
  }
);

export const quantity_dec = createAsyncThunk(
  "cart/quantity_dec",
  async (cartId:any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-dec/${cartId}`);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error)
    }
  }
);

export const make_shipping_fee = createAsyncThunk(
  "cart/make_shipping_fee",
  async (info: any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/home/make-shipping-fee`, info);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      console.log(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const change_shipping_fee = createAsyncThunk(
  "cart/change_shipping_fee",
  async ({shipping_fee}:{shipping_fee:number}, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/home/change-shipping-fee`, {shipping_fee});
      console.log(data);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      console.log(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const get_shipping_fee = createAsyncThunk(
  "cart/get_shipping_fee",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/home/get-shipping-fee`);
      console.log(data)
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      console.log(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    messageClear: (state) => {
      state.errorsMsg = "";
      state.successMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(add_to_cart.fulfilled, (state, action) => {
      state.successMsg = action.payload.message as string;
      state.total_cart_products = state.total_cart_products + 1
    })
    .addCase(add_to_cart.rejected, (state, action) => {
        state.errorsMsg = action.payload as string;
    })
    .addCase(get_products_cart.fulfilled, (state, action) => {
      state.userId = action.payload.userId
      state.cart_products = action.payload.cart_products
      state.price = action.payload.price
      state.total_cart_products =action.payload.total_cart_products
      state.shipping_fee = action.payload.shipping_fee
      state.outOfStockProducts = action.payload.outOfStockProducts
      state.buy_item_product = action.payload.buy_item_product
    })
    .addCase(delete_products_cart.fulfilled, (state, action) => {
      state.successMsg = action.payload.message as string;
    })
    .addCase(quantity_inc.fulfilled, (state, action) => {
      state.successMsg = action.payload.message as string;
    })
    .addCase(quantity_dec.fulfilled, (state, action) => {
      state.successMsg = action.payload.message as string;
    })
    .addCase(get_shipping_fee.fulfilled, (state, action) => {
      state.shipping_fee = action.payload.shipping_fee;
    })
    .addCase(change_shipping_fee.fulfilled, (state, action) => {
      state.shipping_fee = action.payload.shipping_fee;
    })
},
});

export default cartSlice.reducer;
export const { messageClear } = cartSlice.actions;
