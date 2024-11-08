import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  friend: [],
  isLoading: true,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFriend: (state, action) => {
      state.friend = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setFriend, setLoading } = userSlice.actions;
export default userSlice.reducer;
