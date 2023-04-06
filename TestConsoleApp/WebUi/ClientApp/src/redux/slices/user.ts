import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../common/store";
import { RootState, AppThunk } from "../reduxStore";


export interface UserState {
    user?: IUser|null;
  }
  
  const initialState: UserState = {
    user: null
  };

export const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    setUser:(state, action: PayloadAction<IUser|null>) => {
      state.user = action.payload
    }
  }
})

export const { setUser } = userSlice.actions;

export const getUser = (state: RootState) => state.user.user;


export default userSlice.reducer;