import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import api from "@/app/api/api";
import {
  requestData,
  requestDataRegister,
  serverResponse,
  RejectedAction,
  serverResponseRegister,
  IAuth,
  IJwtPayload,
  IFormStore,
  IChatUserRedux,
  IBackOfficeChatRedux,
} from "@/utils/types";


//       const decodeToken: IJwtPayload = jwtDecode(token);
//       const expired = new Date(decodeToken.exp * 1000);
//       if (expired < new Date()) {
//         localStorage.removeItem("accessToken");
//         return "";
//       } else {
//         return decodeToken.role;
//       }
//     } else {
//       return "";
//     }
//   };
const initialState: IBackOfficeChatRedux = {
  successMsg: "",
  errorsMsg: "",
  customers:[],
  messages:[],
  activeCustomer:[],
  activeSeller:[],
  messageNotification:[],
  activeAdmin:[],
  friends:[],
  seller_admin_message:[],
  currentSeller:{},
  currentCustomer:{}
};

export const get_customers = createAsyncThunk(
  "chat/get_customers",
  async ({sellerId}:{sellerId:string}, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/chat/seller/get-customers/${sellerId}`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
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
      const { data } = await api.get(
        `/chat/seller/get-customer-message/${customerId}`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
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
      console.log(data);
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
    // setSuccessMsg: (state, action: PayloadAction<string>) => {
    //   state.successMsg = action.payload;
    // },
    // setErrorsMsg: (state, action: PayloadAction<string>) => {
    //   state.errorsMsg = action.payload;
    // },
    // setLoader: (state, action: PayloadAction<boolean>) => {
    //   state.loader = action.payload;
    // },
    messageClear: (state) => {
      state.errorsMsg = "";
      state.successMsg = "";
    },
    updateMessageSeller:(state,action)=>{
      state.messages = [...state.messages,action.payload]
    },
    updateActiveCustomer:(state,action)=>{
      state.activeCustomer = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_customers.fulfilled, (state, action) => {
        state.customers = action.payload.customers;
      })
      .addCase(get_customer_message.fulfilled, (state, action) => {
        state.currentCustomer = action.payload.currentCustomer
        state.messages = action.payload.messages
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
      });
    //     .addCase(admin_login.fulfilled, (state, action) => {
    //       state.loader = false;
    //       state.successMsg = action.payload.message as string;
    //       state.role = getRoleFromToken(action.payload.token);
    //     })
    //       .addCase(add_info_profile.rejected, (state, action) => {
    //         state.loader = false;
    //         state.errorsMsg = action.payload as string;
    //       });
  },
});

export const { messageClear, updateMessageSeller, updateActiveCustomer } = backOfficeChatSlice.actions;

export default backOfficeChatSlice.reducer;
