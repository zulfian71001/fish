import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import api from "@/app/api/api";
import {
  RejectedAction,
  IBackOfficeChatRedux,
} from "@/utils/types";

const initialState: IBackOfficeChatRedux = {
  successMsg: "",
  errorsMsg: "",
  customers: [],
  sellers: [],
  messages: [],
  activeCustomer: [],
  activeSeller: [],
  messageNotification: [],
  activeAdmin: [],
  friends: [],
  seller_admin_message: [],
  currentSeller: {},
  currentCustomer: {},
};

export const get_customers = createAsyncThunk(
  "chat/get_customers",
  async (
    { sellerId }: { sellerId: string },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(`/chat/seller/get-customers/${sellerId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const get_customer_message = createAsyncThunk(
  "chat/get_customer_message",
  async (customerId: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await api.get(
        `/chat/seller/get-customer-message/${customerId}`,
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

export const send_message_to_customer = createAsyncThunk(
  "chat/send_message_to_customer",
  async (info: any, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/seller/send-message-to-customer",
        info,
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
  "chat/get_sellers",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/admin/get-sellers`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const send_message_seller_admin = createAsyncThunk(
  "chat/send_message_seller_admin",
  async (info: any, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/admin/send-message-seller-admin",
        info,
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

export const get_admin_message = createAsyncThunk(
  "chat/get_admin_message",
  async (receiverId: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-admin-message/${receiverId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const get_seller_message = createAsyncThunk(
  "chat/get_seller_message",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await api.get(`/chat/get-seller-message`,  {
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

export const backOfficeChatSlice = createSlice({
  name: "backOfficeChat",
  initialState,
  reducers: {
    messageClear: (state) => {
      state.errorsMsg = "";
      state.successMsg = "";
    },
    updateMessageSeller: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    updateMessageAdmin: (state, action) => {
      state.seller_admin_message = [...state.seller_admin_message, action.payload];
    },
    updateSellerMessage: (state, action) => {
      state.seller_admin_message = [...state.seller_admin_message, action.payload];

    },
    updateActiveCustomer: (state, action) => {
      state.activeCustomer = action.payload;
    },
    updateActiveSeller: (state, action) => {
      state.activeSeller = action.payload;
    },
    updateActiveAdmin: (state, action) => {
      state.activeAdmin = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_customers.fulfilled, (state, action) => {
        state.customers = action.payload.customers;
      })
      .addCase(get_customer_message.fulfilled, (state, action) => {
        state.currentCustomer = action.payload.currentCustomer;
        state.messages = action.payload.messages;
      })
      .addCase(send_message_to_customer.fulfilled, (state, action) => {
        let tempFriends = state.customers;
        let index = tempFriends.findIndex(
          (f) => f.fdId === action.payload.messages.receiverId
        );
        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }
        state.customers = tempFriends;
        state.messages = [...state.messages, action.payload.messages];
        state.successMsg = "pesan terkirim";
      })
      .addCase(get_sellers.fulfilled, (state, action) => {
        state.sellers = action.payload.sellers;
      })
      .addCase(send_message_seller_admin.fulfilled, (state, action) => {
        state.seller_admin_message = [
          ...state.seller_admin_message,
          action.payload.messages,
        ];
        state.successMsg = "pesan terkirim";
      })
      .addCase(get_seller_message.fulfilled, (state, action) => {
        state.seller_admin_message = action.payload.messages;
      })
      .addCase(get_admin_message.fulfilled, (state, action) => {
        state.currentSeller = action.payload.currentSeller;
        state.seller_admin_message = action.payload.messages;
      });
  },
});

export const {
  messageClear,
  updateMessageSeller,
  updateMessageAdmin,
  updateActiveCustomer,
  updateActiveSeller,
  updateSellerMessage,
updateActiveAdmin
} = backOfficeChatSlice.actions;

export default backOfficeChatSlice.reducer;
