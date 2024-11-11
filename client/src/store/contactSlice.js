import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  isContactLoading: true,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setIsContactLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setContacts, setIsContactLoading } = contactSlice.actions;
export default contactSlice.reducer;
