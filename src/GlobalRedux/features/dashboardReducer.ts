import api from "@/app/api/api";
import { GetDashboardParams, IDashboardUser, RejectedAction } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IDashboardUser = {
    recentOrders: [],
    errorsMsg:'',
    successMsg:'',
    totalOrders: 0,
    pendingOrder:0,
    cancelledOrder:0
};

export const get_dashboard_index_data = createAsyncThunk(
  "dashboard/get_dashboard_index_data", async({userId}:GetDashboardParams, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/home/customer/get-dashboard-data/${userId}`);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
)

export const get_dashboard_index_data_admin = createAsyncThunk(
  "dashboard/get_dashboard_index_data_admin", async(_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/admin/get-dashboard-data`);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
)

export const get_dashboard_index_data_seller = createAsyncThunk(
  "dashboard/get_dashboard_index_data_seller", async({userId}:GetDashboardParams, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/seller/get-dashboard-data/${userId}`);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
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
      .addCase(get_dashboard_index_data_admin.fulfilled, (state, action) => {
        state.recentOrders = action.payload.recentOrders;
        state.pendingOrder = action.payload.pendingOrder;
        state.cancelledOrder = action.payload.cancelledOrder
        state.totalOrders = action.payload.totalOrders;
      })
  },
});

export default dashboardSlice.reducer;
export const { messageClear } = dashboardSlice.actions;
