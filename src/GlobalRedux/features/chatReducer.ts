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
const initialState: IChatUserRedux = {
  successMsg: "",
  errorsMsg: "",
  my_friends: [],
  fd_messages: [],
  currentFd: {},
};

export const add_friend = createAsyncThunk(
  "chat/add_friend",
  async (info: any, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/add-customer-friend",
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

export const send_message = createAsyncThunk(
  "chat/send_message",
  async (info: any, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/send-message-to-seller",
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

export const chatSlice = createSlice({
  name: "chat",
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
    updateMessage: (state, action) => {
        state.fd_messages = [...state.fd_messages, action.payload];
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_friend.fulfilled, (state, action) => {
        state.currentFd = action.payload.currentFd;
        state.my_friends = action.payload.myFriend;
        state.fd_messages = action.payload.messages;
      })
      .addCase(send_message.fulfilled, (state, action) => {
        let tempFriends = state.my_friends;
        let index = tempFriends.findIndex(
          (f) => f.fdId === action.payload.messages.receiverId
        );
        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }
        state.my_friends = tempFriends;
        state.fd_messages = [...state.fd_messages, action.payload.messages];
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

export const { messageClear, updateMessage } = chatSlice.actions;

export default chatSlice.reducer;
