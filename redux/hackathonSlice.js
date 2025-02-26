import { createSlice } from '@reduxjs/toolkit';

const hackathonSlice = createSlice({
  name: 'hackathon',
  initialState: { productPicked: {} },
  reducers: {
    setProductPicked: (state, { data }) => {
      state.productPicked = data;
    }
  },
});

export const { increment, decrement, reset } = hackathonSlice.actions;
export default hackathonSlice.reducer;
