import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendLink } from "../../keys_dev";

export const show_all_food_desc = createAsyncThunk(
  "/show_all_food_desc",
  async (token) => {
    const response = await axios({
      method: "post",
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
      url: `${backendLink}/show_all_food_desc`,
      data: { user: {} },
    });

    return response.data;
  }
);

export const show_all_food_asc = createAsyncThunk(
  "/show_all_food_asc",
  async (token) => {
    const response = await axios({
      method: "post",
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
      url: `${backendLink}/show_all_food_asc`,
      data: {
        user: {},
      },
    });

    return response.data;
  }
);
export const show_all_food = createAsyncThunk(
  "/show_all_food",
  async (token) => {
    const response = await axios({
      method: "post",
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
      url: `${backendLink}/show_all_food`,
      data: {
        user: {},
      },
    });

    return response.data;
  }
);
export const subtract_calories = createAsyncThunk(
  "/subtract_calories",
  async (state) => {
    const response = await axios({
      method: "post",
      headers: {
        Authorization: "Bearer " + state.token, //the token is a variable which holds the token
      },
      url: `${backendLink}/account/subtract_calories`,
      data: {
        fooditem: { calories: state.calories },
      },
    });
    console.log(response);
    return response.data;
  }
);
export const foodSlice = createSlice({
  name: "food",
  initialState: {
    food: [],
    remainingCalories: "",
    status: "idle",
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.email = action.payload.user.email;
      state.name = action.payload.user.password;
    },
    logout: (state, action) => {
      state.value += action.payload;
    },
    signup: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(show_all_food.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(show_all_food.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.food = JSON.parse(action.payload.food);
      })
      .addCase(show_all_food.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(show_all_food_asc.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(show_all_food_asc.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.food = JSON.parse(action.payload.food);
      })
      .addCase(show_all_food_asc.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(show_all_food_desc.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(show_all_food_desc.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.food = JSON.parse(action.payload.food);
      })
      .addCase(show_all_food_desc.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(subtract_calories.pending, (state, action) => {
        state.status = "loading";
        console.log(action.payload);
      })
      .addCase(subtract_calories.fulfilled, (state, action) => {
        if (action.payload.statusCode !== 0) {
          state.status = "failed";
          console.log(action.payload.message);
          state.error = action.payload.message;
        } else {
          state.status = "succeed";
        }
      })
      .addCase(subtract_calories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const selectFood = (state) => state.food.food;

export const selectfoodStatus = (state) => state.food.status;
export const selectfoodMessage = (state) => state.food.error;

export default foodSlice.reducer;
