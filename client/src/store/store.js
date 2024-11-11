import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import contactSlice from "./contactSlice";

const store = configureStore({
  reducer: {
    auth: userSlice,
    contact: contactSlice,
  },
});
export default store;
