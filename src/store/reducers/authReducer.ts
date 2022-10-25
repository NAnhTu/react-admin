import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post } from '../../services';
import { stat } from 'fs';

export type AuthState = {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  currentRequestId: string | undefined;
};

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  currentRequestId: undefined,
};
export const signUp = createAsyncThunk(
  'auth/sign-up',
  async (params: object, { getState, requestId, rejectWithValue }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { currentRequestId, isFetching } = getState().auth;

      if (!isFetching || requestId !== currentRequestId) {
        return;
      }
      const response = await post('/auth/register', {
        body: params,
      });
      if (response.status === 201) {
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

export const signIn = createAsyncThunk(
  'auth/sign-in',
  async (params: object, { getState, requestId, rejectWithValue }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { currentRequestId, isFetching } = getState().auth;

      if (!isFetching || requestId !== currentRequestId) {
        return;
      }
      const response = await post('/auth/sign-in', {
        body: params,
      });
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

const authSlice = createSlice({
  name: 'auth',
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
    [signUp.pending.type]: (state, { meta }) => {
      const { requestId } = meta;
      if (!state.isFetching) {
        state.errorMessage = '';
        state.isError = false;
        state.isFetching = true;
        state.isSuccess = false;
        state.currentRequestId = requestId;
      }
    },
    [signUp.fulfilled.type]: (state, { meta }) => {
      const { requestId } = meta;
      if (state.isFetching && state.currentRequestId === requestId) {
        state.isError = false;
        state.isSuccess = true;
        state.isFetching = false;
        state.errorMessage = '';
        state.currentRequestId = undefined;
      }
    },
    [signUp.rejected.type]: (state, { payload, meta }) => {
      const { requestId } = meta;
      if (state.isFetching && state.currentRequestId === requestId) {
        state.isError = true;
        state.isSuccess = false;
        state.isFetching = false;
        state.errorMessage = payload?.message;
        state.currentRequestId = undefined;
      }
    },
    [signIn.pending.type]: (state, { meta }) => {
      const { requestId } = meta;
      if (!state.isFetching) {
        state.errorMessage = '';
        state.isError = false;
        state.isFetching = true;
        state.isSuccess = false;
        state.currentRequestId = requestId;
      }
    },
    [signIn.fulfilled.type]: (state, { payload, meta }) => {
      const { requestId } = meta;
      const { accessToken, refreshToken } = payload.data;
      if (state.isFetching && state.currentRequestId === requestId) {
        state.isError = false;
        state.isSuccess = true;
        state.isFetching = false;
        state.errorMessage = '';
        state.currentRequestId = undefined;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refresh-token', refreshToken);
      }
    },
    [signIn.rejected.type]: (state, { payload, meta }) => {
      const { requestId } = meta;
      if (state.isFetching && state.currentRequestId === requestId) {
        state.isError = true;
        state.isSuccess = false;
        state.isFetching = false;
        state.errorMessage = payload?.message;
        state.currentRequestId = undefined;
      }
    },
  },
});

export default authSlice.reducer;

export const { clearState } = authSlice.actions;
