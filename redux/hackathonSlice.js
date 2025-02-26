import { createSlice } from '@reduxjs/toolkit';

const hackathonSlice = createSlice({
  name: 'hackathon',
  initialState: { 
    productPicked: {},
    effects: [],
    summary: ''
  },
  reducers: {
    setProductPicked: (state, { data }) => {
      state.productPicked = data;
    },
    setEffects: (state, { data }) => {
      state.effects = data;
    },
    setSummary: (state, { data }) => {
      state.summary = data;
    }
  },
});

export const { setProductPicked, setEffects, setSummary } = hackathonSlice.actions;
export default hackathonSlice.reducer;
