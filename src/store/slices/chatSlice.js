import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MessageUser: null,
  isChatOpen: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsChatPage: (state, action) => ({
      ...state,
      MessageUser: action.payload?.user,
      isChatOpen: action.payload?.isChatOpen,
    }),
  },
});

export const { setIsChatPage } = chatSlice.actions;
export default chatSlice.reducer;
