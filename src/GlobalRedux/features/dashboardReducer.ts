import api from "@/app/api/api";
import { GetDashboardParams, ICart, IDashboardUser, IOrder, orderProps, RejectedAction, requestCart } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IDashboardUser = {
    recentOrders: [],
    errorsMsg:'',
    successMsg:'',
    totalOrders: 0,
    pendingOrder:0,
    cancelledOrder:0
};


// export const place_dashboard = createAsyncThunk(
//   "dashboard/place_dashboard ",
//   async ({price, products,shipping_fee,shippingInfo,userId,navigate,items}:dashboardProps, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const { data } = await api.post(`/home/dashboard/place-dashboard`,{
//         price, products,shipping_fee,shippingInfo,userId,navigate,items
//       });
//       console.log(data);
//       return fulfillWithValue(data);
//     } catch (error: RejectedAction | any) {
//       console.log(error.response.data.error);
//       return rejectWithValue(error.response.data.error);
//     }
//   }
// );

export const get_dashboard_index_data = createAsyncThunk(
  "dashboard/get_dashboard_index_data", async({userId}:GetDashboardParams, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/home/customer/get-dashboard-data/${userId}`);
      console.log(data);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      console.log(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
)

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    messageClear: (state) => {
      state.errorsMsg = "";
      state.successMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_dashboard_index_data.fulfilled, (state, action) => {
        state.recentOrders = action.payload.recentOrders;
        state.pendingOrder = action.payload.pendingOrder;
        state.cancelledOrder = action.payload.cancelledOrder
        state.totalOrders = action.payload.totalOrders;
      })
    //   .addCase(place_dashboard.rejected, (state, action) => {
    //     state.errorsMsg = action.payload as string;
    //   })    
    //   .addCase(get_dashboards.fulfilled, (state, action) => {
    //     state.mydashboards = action.payload.dashboards;
    //   })
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

export default dashboardSlice.reducer;
export const { messageClear } = dashboardSlice.actions;
