import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, post } from '../../services';
import { stat } from 'fs';
import { signUp } from './authReducer';

export type UserState = {
  isSignedIn: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  currentRequestId: string | undefined;
};

const initialState: UserState = {
  isSignedIn: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  currentRequestId: undefined,
};

export const checkUser = createAsyncThunk(
  'user/check-user',
  async (_arg, { getState, requestId, rejectWithValue }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { currentRequestId, isFetching } = getState().user;

      if (!isFetching || requestId !== currentRequestId) {
        return;
      }
      const response = await get('/users/check-token');
      if (response.status === 200) {
        return response;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return rejectWithValue(e.response.data);
    }
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isFetching = false;
      state.isSuccess = false;
      return state;
    },
  },
  extraReducers: {
    [checkUser.pending.type]: (state, { meta }) => {
      const { requestId } = meta;
      if (!state.isFetching) {
        state.errorMessage = '';
        state.isError = false;
        state.isFetching = true;
        state.isSuccess = false;
        state.currentRequestId = requestId;
      }
    },
    [checkUser.fulfilled.type]: (state, { meta }) => {
      const { requestId } = meta;
      if (state.isFetching && state.currentRequestId === requestId) {
        state.isSignedIn = true;
        state.isError = false;
        state.isSuccess = true;
        state.isFetching = false;
        state.errorMessage = '';
        state.currentRequestId = undefined;
      }
    },
    [checkUser.rejected.type]: (state, { payload, meta }) => {
      const { requestId } = meta;
      if (state.isFetching && state.currentRequestId === requestId) {
        state.isSignedIn = false;
        state.isError = true;
        state.isSuccess = false;
        state.isFetching = false;
        state.errorMessage = payload?.message;
        state.currentRequestId = undefined;
      }
    },
  },
});

export default userSlice.reducer;

export const { clearState } = userSlice.actions;
