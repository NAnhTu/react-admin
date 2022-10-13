import { RootState } from '../index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type User = {
  first: string;
  last: string;
  email: string;
  address: string;
  created: string;
};

type UsersState = {
  entities: User[];
  loading: 'idle' | 'pending';
  loggedIn: boolean;
  currentRequestId: string | undefined;
  error: any;
};

const initialState: UsersState = {
  entities: [],
  loading: 'idle',
  loggedIn: false,
  currentRequestId: undefined,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_arg, { getState, requestId }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { currentRequestId, loading } = getState().users;

    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    // const response = await fetch(API_URL);
    // const json = await response.json();
    // json.splice(10);
    // await sleep(1000);
    // return json;
  },
);

export const usersSlice: any = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetchUsers.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.entities = action.payload;
        state.currentRequestId = undefined;
        state.loggedIn = true;
      }
    },
    [fetchUsers.rejected.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
        state.loggedIn = false;
      }
    },
  },
});

// Selectors
export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
