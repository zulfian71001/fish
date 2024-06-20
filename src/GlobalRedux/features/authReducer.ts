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
  IFormSeller,
  IFormUpdatePassword,
  IFormUpdatePasswordUser,
} from "@/utils/types";

const getRoleFromToken = (token: string | null) => {
  if (token) {
    const decodeToken: IJwtPayload = jwtDecode(token);
    const expired = new Date(decodeToken.exp * 1000);
    if (expired < new Date()) {
      localStorage.removeItem("accessToken");
      return "";
    } else {
      return decodeToken.role;
    }
  } else {
    return "";
  }
};

const initialState: IAuth = {
  successMsg: "",
  errorsMsg: "",
  loader: false,
  userInfo: "",
  role: "",
  token: "",
};
export const seller_register = createAsyncThunk(
  "auth/seller_register",
  async (info: requestDataRegister, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post<serverResponse>(
        "/seller-register",
        info,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info: requestData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post<serverResponse>("/admin-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const seller_login = createAsyncThunk(
  "auth/seller_login",
  async (info: requestData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post<serverResponse>("/seller-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const customer_login = createAsyncThunk(
  "auth/customer_login",
  async (info: requestData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post<serverResponse>("/customer-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const customer_register = createAsyncThunk(
  "auth/customer_register",
  async (info: requestDataRegister, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post<serverResponse>(
        "/customer-register",
        info,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const user_info = createAsyncThunk(
  "auth/user_info",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/get-user", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const upload_image_profile = createAsyncThunk(
  "auth/upload_image_profile",
  async (image: any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/upload-image-profile", image, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const add_info_profile = createAsyncThunk(
  "auth/add_info_profile",
  async (info:IFormStore, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/add-info-profile", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const update_info_profile_seller = createAsyncThunk(
  "auth/update_info_profile_seller",
  async (info:IFormSeller, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/update-info-profile-seller`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const update_info_profile_store = createAsyncThunk(
  "auth/update_info_profile_seller",
  async (info:IFormStore, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/update-info-profile-store`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const change_password_seller = createAsyncThunk(
  "auth/change_password_seller",
  async (info:IFormUpdatePassword, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/change-password-seller`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const change_password_user = createAsyncThunk(
  "auth/change_password_user",
  async (info:IFormUpdatePasswordUser, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/change-password-user`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error: RejectedAction | any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state) => {
      state.userInfo = ""
    },
    messageClear: (state) => {
      state.errorsMsg = "";
      state.successMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state) => {
        state.loader = true;
      })
      .addCase(admin_login.rejected, (state, action) => {
        state.loader = false;
        state.errorsMsg = action.payload as string;
      })
      .addCase(admin_login.fulfilled, (state, action) => {
        state.loader = false;
        state.successMsg = action.payload.message as string;
        state.role = getRoleFromToken(action.payload.token);
      })
        .addCase(seller_register.pending, (state) => {
          state.loader = true;
        })
        .addCase(seller_register.rejected, (state, action) => {
          state.loader = false;
          state.errorsMsg = action.payload as string;
        })
        .addCase(seller_register.fulfilled, (state, action) => {
          state.loader = false;
          state.successMsg = action.payload.message as string;
          state.role = getRoleFromToken(action.payload.token);
          state.token = action.payload.token;
        })
        .addCase(customer_register.pending, (state) => {
          state.loader = true;
        })
        .addCase(customer_register.rejected, (state, action) => {
          state.loader = false;
          state.errorsMsg = action.payload as string;
        })
        .addCase(customer_register.fulfilled, (state, action) => {
          state.loader = false;
          state.successMsg = action.payload.message as string;
          state.role = getRoleFromToken(action.payload.token);
          state.token = action.payload.token;
        })
        .addCase(seller_login.pending, (state) => {
          state.loader = true;
        })
        .addCase(seller_login.rejected, (state, action) => {
          state.loader = false;
          state.errorsMsg = action.payload as string;
        })
        .addCase(seller_login.fulfilled, (state, action) => {
          state.loader = false;
          state.successMsg = action.payload.message as string;
          state.role = getRoleFromToken(action.payload.token);
          state.token = action.payload.token;
        })
        .addCase(customer_login.pending, (state) => {
          state.loader = true;
        })
        .addCase(customer_login.rejected, (state, action) => {
          state.loader = false;
          state.errorsMsg = action.payload as string;
        })
        .addCase(customer_login.fulfilled, (state, action) => {
          state.loader = false;
          state.successMsg = action.payload.message as string;
          state.role = getRoleFromToken(action.payload.token);
          state.token = action.payload.token;
        })
        .addCase(user_info.fulfilled, (state, action) => {
          state.loader = false;
          state.userInfo = action.payload.userInfo;
        })
        .addCase(user_info.pending, (state, action) => {
          state.loader = true;
        })
        .addCase(user_info.rejected, (state, action) => {
          state.loader = false;
          state.errorsMsg = action.payload as string;
        })
        .addCase(upload_image_profile.fulfilled, (state, action) => {
          state.loader = false;
          state.userInfo = action.payload.userInfo;
          state.successMsg = action.payload.message ;
        })
        .addCase(upload_image_profile.pending, (state, _) => {
          state.loader = true;
        })
        .addCase(upload_image_profile.rejected, (state, action) => {
          state.loader = false;
          state.errorsMsg = action.payload as string;
        })
        .addCase(add_info_profile.fulfilled, (state, action) => {
          state.loader = false;
          state.userInfo = action.payload.userInfo;
          state.successMsg = action.payload.message ;
        })
        .addCase(add_info_profile.pending, (state, _) => {
          state.loader = true;
        })
        .addCase(add_info_profile.rejected, (state, action) => {
          state.loader = false;
          state.errorsMsg = action.payload as string;
        })
        .addCase(update_info_profile_seller.fulfilled, (state, action) => {
          state.loader = false;
          state.userInfo = action.payload.userInfo;
          state.successMsg = action.payload.message ;
        })
        .addCase(update_info_profile_seller.pending, (state, _) => {
          state.loader = true;
        })
        .addCase(update_info_profile_seller.rejected, (state, action) => {
          state.loader = false;
          state.errorsMsg = action.payload as string;
        })
        .addCase(change_password_seller.fulfilled, (state, action) => {
          state.loader = false;
          state.successMsg = action.payload.message ;
        })
        .addCase(change_password_seller.pending, (state, _) => {
          state.loader = true;
        })
        .addCase(change_password_seller.rejected, (state, action) => {
          state.loader = false;
          state.errorsMsg = action.payload as string;
        })
                .addCase(change_password_user.fulfilled, (state, action) => {
          state.loader = false;
          state.successMsg = action.payload.message ;
        })
        .addCase(change_password_user.pending, (state, _) => {
          state.loader = true;
        })
        .addCase(change_password_user.rejected, (state, action) => {
          state.loader = false;
          state.errorsMsg = action.payload as string;
        });
  },
});

export const { messageClear, setUserInfo } = authSlice.actions;

export default authSlice.reducer;
