import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import { PREFIX } from "../helpers/API";
import axios, { AxiosError } from "axios";
import { LoginResponse } from "../interfaces/auth.interface";
import { Profile } from "../interfaces/user.interface";
import { RootState } from "./store";
import { ProfileAll } from "../interfaces/userForTask.interface";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
  registerErrorMessage?: string;
  editProfileErrorMessage?: string;
  profile?: Profile;
  profileAll?: ProfileAll;
  isUpdated?: boolean;
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}auth/login`, {
        email: params.email,
        password: params.password,
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);
export const registerUser = createAsyncThunk(
  "user/register",
  async (params: {
    lastName: string;
    firstName: string;
    userName: string;
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}auth/register`, {
        lastName: params.lastName,
        firstName: params.firstName,
        userName: params.userName,
        email: params.email,
        password: params.password,
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
  "user/getProfile",
  async (_, thunkApi) => {
    const jwt = thunkApi.getState().user.jwt;
    const { data } = await axios.get<Profile>(`${PREFIX}users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  }
);

export const getProfileAll = createAsyncThunk<
  ProfileAll,
  void,
  { state: RootState }
>("user/getProfileAll", async (_, thunkApi) => {
  const jwt = thunkApi.getState().user.jwt;
  const { data } = await axios.get<ProfileAll>(`${PREFIX}users/profile/all`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
});

export const updateProfile = createAsyncThunk(
  "user/profile/edit",
  async (userData: Profile, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const jwt = state.user.jwt;
    try {
      const formData = new FormData();

      Object.keys(userData).forEach((key) => {
        if (key !== "image") {
          formData.append(key, userData[key]);
        } else if (userData.image) {
          if (typeof userData.image === "string") {
            formData.append("imageUrl", userData.image); // Adding image URL
          } else if (userData.image[0].file) {
            formData.append("image", userData.image[0].file); // Adding image file
          }
        }
      });
      const { data } = await axios.put(
        `${PREFIX}users/profile/edit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/profile/edit-password",
  async (
    passwords: {
      password: string;
      newPassword: string;
    },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const jwt = state.user.jwt;
    try {
      const { data } = await axios.put(
        `${PREFIX}user/profile/edit-password`,
        {
          password: passwords.password,
          newPassword: passwords.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
    clearRegisterError: (state) => {
      state.registerErrorMessage = undefined;
    },
    clearEditProfileErrorMessage: (state) => {
      state.editProfileErrorMessage = undefined;
    },
    clearUpdateSuccess: (state) => {
      state.isPasswordUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.jwt = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(getProfileAll.fulfilled, (state, action) => {
      state.profileAll = action.payload;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.token;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.editProfileErrorMessage = action.error.message;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.editProfileErrorMessage = action.error.message;
    });
  },
});
export default userSlice.reducer;
export const userActions = userSlice.actions;
