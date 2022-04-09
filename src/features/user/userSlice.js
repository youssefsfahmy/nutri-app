import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendLink } from "../../keys_dev";

export const userLogin = createAsyncThunk("/account/sign_in", async (user) => {
  const token = localStorage.getItem("token");

  const response = await axios({
    method: "post",
    headers: {
      Authorization: "Bearer " + token, //the token is a variable which holds the token
    },
    url: `${backendLink}/account/sign_in`,
    data: { user: { email: user.email, password: user.password } },
  });

  return response.data;
});

export const addCalories = createAsyncThunk(
  "/account/add_calories",
  async (caloriesperday) => {
    const token = localStorage.getItem("token");
    const response = await axios({
      method: "post",
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
      url: `${backendLink}/account/add_calories`,
      data: { user: { caloriesperday: caloriesperday } },
    });
    if (response.data.statusCode === 0) {
      return true;
    }
    return response.data;
  }
);

export const checkauth = createAsyncThunk("/checkauth", async (location) => {
  const token = localStorage.getItem("token");
  const response = await axios({
    method: "post",
    headers: {
      Authorization: "Bearer " + token, //the token is a variable which holds the token
    },
    url: `${backendLink}/checkauth`,
  });
  return response.data;
});

export const userSignup = createAsyncThunk("/users/sign_up", async (user) => {
  const response = await axios({
    method: "post",

    url: `${backendLink}/users/sign_up`,
    data: {
      user: {
        email: user.email,
        password: user.password,
        // name: user.name,
        password_confirmation: user.password_confirmation,
        admin: false,
      },
    },
  });
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    name: "",
    caloriesperday: "",
    remainingcalories: "",
    token: "",
    status: "idle",
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.email = action.payload.user.email;
      state.name = action.payload.user.password;
    },
    logout: (state, action) => {
      state.email = "";
      state.name = "";
      state.token = "";
      state.status = "idle";
      state.error = null;
      localStorage.clear();
    },
    removeCalories: (state, action) => {
      state.caloriesperday = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        if (!action.payload.token) {
          state.status = "failed";
          state.error = action.payload.error;
        } else {
          state.email = action.payload.user.email;
          state.name = action.payload.user.password;
          state.caloriesperday = action.payload.user.caloriesperday;
          state.remainingcalories = action.payload.user.remainingcalories;
          state.token = action.payload.token;
          localStorage.clear();

          localStorage.setItem("token", action.payload.token);
          if (
            action.payload.user.caloriesperday === "" ||
            action.payload.user.caloriesperday === null
          ) {
            localStorage.setItem("calories", false);
          } else {
            localStorage.setItem("calories", true);
          }

          state.status = "succeeded";
        }
        // Add any fetched posts to the array
        // state.posts = state.posts.concat(action.payload);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(userSignup.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        if (action.payload.statusCode !== 0) {
          state.status = "failed";

          state.error = action.payload.error;
        } else {
          state.status = "succeededd";
        }
        // Add any fetched posts to the array
        // state.posts = state.posts.concat(action.payload);
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(checkauth.rejected, (state, action) => {
        state.email = "";
        state.name = "";
        state.token = "";
        state.caloriesperday = "";
        state.remainingcalories = "";
        localStorage.clear();
      })
      .addCase(checkauth.fulfilled, (state, action) => {
        const token = localStorage.getItem("token");
        state.email = action.payload.user.email;
        state.name = action.payload.user.password;
        state.caloriesperday = action.payload.user.caloriesperday;
        state.remainingcalories = action.payload.user.remainingcalories;
        if (
          action.payload.user.caloriesperday === "" ||
          action.payload.user.caloriesperday === null
        ) {
          localStorage.setItem("calories", false);
        } else {
          localStorage.setItem("calories", true);
        }
        state.token = token;
      })
      .addCase(addCalories.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addCalories.fulfilled, (state, action) => {
        if (action.payload.statusCode !== 0) {
          state.status = "failed";
          state.error = action.payload.error;
        } else {
          state.email = action.payload.user.email;
          state.name = action.payload.user.name;
          state.caloriesperday = action.payload.user.caloriesperday;
          state.remainingcalories = action.payload.user.remainingcalories;
          localStorage.setItem("calories", true);

          state.status = "succeeded";
        }
        // Add any fetched posts to the array
        // state.posts = state.posts.concat(action.payload);
      })
      .addCase(addCalories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const selectUser = (state) => state.user;

export const selectStatus = (state) => state.user.status;

export const selectUserEmail = (state) => state.user.email;

export const selectUserCal = (state) => state.user.caloriesperday;

export const selectUserRem = (state) => state.user.remainingcalories;

export const selectToken = (state) => state.user.token;

export const { login, logout, removeCalories } = userSlice.actions;

export default userSlice.reducer;
