import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, post } from '../../services';

type UserState = {
  code: string;
  name: string;
  role: string;
  token: string;
};

export type UserReducerState = {
  isSignedIn: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  currentRequestId: string | undefined;
  currentUser: UserState;
};

const initialState: UserReducerState = {
  isSignedIn: !!localStorage.getItem('token'),
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  currentRequestId: undefined,
  currentUser: {
    code: '',
    name: '',
    role: '',
    token: '',
  },
};

export const checkUser = createAsyncThunk(
  'user/check-user',
  async (_arg, { getState, requestId, rejectWithValue }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { currentRequestId, isFetching, currentUser } = getState().user;

      if (!isFetching || requestId !== currentRequestId) {
        return;
      }
      const response = await get('/users/check-token', currentUser);
      if (response.status === 200) {
        return response;
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh-token');
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
    [checkUser.fulfilled.type]: (state, { payload, meta }) => {
      const { requestId } = meta;
      if (state.isFetching && state.currentRequestId === requestId) {
        state.isSignedIn = true;
        state.isError = false;
        state.isSuccess = true;
        state.isFetching = false;
        state.errorMessage = '';
        state.currentRequestId = undefined;
        state.currentUser = payload.data;
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
        state.currentUser = {} as UserState;
      }
    },
  },
});

export default userSlice.reducer;

export const { clearState } = userSlice.actions;
