import { configureStore } from '@reduxjs/toolkit';
import hackathonReducer from './hackathonSlice';

export const store = configureStore({
  reducer: {
    hackathon: hackathonReducer,
  },
});
