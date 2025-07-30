import { Movie, MovieFilter } from '@/models';
import { SortOptions, TagOptions } from '@/shared/helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userFilter: MovieFilter;
  watchList: Movie[];
}

const initialState: UserState = {
  userFilter: {
    search: '',
    tag: TagOptions[0].value,
    sort: SortOptions[0].value
  },
  watchList: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeFilter: (state: UserState, action: PayloadAction<MovieFilter>) => { 
      state.userFilter = action.payload;
    },
    addWatchList: (state: UserState, action: PayloadAction<Movie>) => { 
      state.watchList.push(action.payload);
    },
    removeWatchList: (state: UserState, action: PayloadAction<number>) => { 
      state.watchList = state.watchList.filter(e => e.id !== action.payload);
    },
  },
});

export const {
  changeFilter,
  addWatchList,
  removeWatchList
} = userSlice.actions;

export default userSlice.reducer;