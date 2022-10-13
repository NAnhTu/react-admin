import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type AuthState = {
  error: any;
  loading: boolean;
  isLoggedIn: boolean;
  currentRequestId: string | undefined;
};

const initialState: AuthState = {
  error: null,
  loading: false,
  isLoggedIn: false,
  currentRequestId: undefined,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_arg, { getState, requestId }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { currentRequestId, loading } = getState().auth;

    if (!loading || requestId !== currentRequestId) {
      return;
    }

    // const response = await fetch(API_URL);
    // const json = await response.json();
    // json.splice(10);
    // await sleep(1000);
    // return json;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending.type]: (state, action) => {
      if (!state.loading) {
        state.loading = true;
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetchUsers.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading && state.currentRequestId === requestId) {
        state.loading = false;
        state.isLoggedIn = true;
        state.currentRequestId = undefined;
      }
    },
    [fetchUsers.rejected.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading && state.currentRequestId === requestId) {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

export default usersSlice.reducer;
