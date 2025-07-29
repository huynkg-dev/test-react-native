import { Movie } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  watchList: Movie[];
}

const initialState: UserState = {
  watchList: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addWatchList: (state: UserState, action: PayloadAction<Movie>) => { 
      state.watchList.push(action.payload);
    },
    removeWatchList: (state: UserState, action: PayloadAction<number>) => { 
      state.watchList = state.watchList.filter(e => e.id !== action.payload);
    },
  },
});

export const {
  addWatchList,
  removeWatchList
} = userSlice.actions;

export default userSlice.reducer;