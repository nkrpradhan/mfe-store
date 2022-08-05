import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const initialState = {
  loading: false,
  user: "",
  error: "",
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ username, password }, thunkAPI) => {
    console.log("async thunk--", username, password);
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    const response = await axios.post(
      "https://reactlogin-service.herokuapp.com/login",
      params
    );
    if (response.status === 200) {
      return username;
    }
  }
);
// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setGlobalUser: (state, action) => {
//       state.user = action.payload;
//     },
//   },
// });

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setGlobalUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.user = "";
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const { setGlobalUser, logoutUser } = userSlice.actions;
// export { fetchUser };
