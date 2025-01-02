import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DrawerState {
  isOpen: boolean;
  currentDrawer: string | null; // Stores the name of the open drawer
}

const initialState: DrawerState = {
  isOpen: false,
  currentDrawer: null,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.currentDrawer = action.payload; // Set the name of the opened drawer
    },
    closeDrawer: (state) => {
      state.isOpen = false;
      state.currentDrawer = null; // Reset when the drawer is closed
    },
    toggleDrawer: (state, action: PayloadAction<string>) => {
      if (state.isOpen && state.currentDrawer === action.payload) {
        state.isOpen = false;
        state.currentDrawer = null;
      } else {
        state.isOpen = true;
        state.currentDrawer = action.payload;
      }
    },
  },
});

export const { openDrawer, closeDrawer, toggleDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
