import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DrawerState {
  isOpen: boolean;
  currentDrawer: string | null;
  isBackdropOpen: boolean;
  isEVerifyDialogOpen: boolean;
  isLayoutLoader: boolean;
  drawerData: any | null;
}

const initialState: DrawerState = {
  isOpen: false,
  currentDrawer: null,
  isBackdropOpen: false,
  isEVerifyDialogOpen: false,
  isLayoutLoader: false,
  drawerData: null,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (
      state,
      action: PayloadAction<{ drawerName: string; data?: any }>
    ) => {
      state.isOpen = true;
      state.currentDrawer = action.payload.drawerName;
      state.drawerData = action.payload.data || null;
    },
    closeDrawer: (state) => {
      state.isOpen = false;
      state.currentDrawer = null; // Reset when the drawer is closed
      state.drawerData = null;
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
    openBackdrop(state) {
      state.isBackdropOpen = true;
    },
    closeBackdrop(state) {
      state.isBackdropOpen = false;
    },
    setBackdrop(state, action: PayloadAction<boolean>) {
      state.isBackdropOpen = action.payload;
    },
    openEVerifyDialog(state) {
      state.isEVerifyDialogOpen = true; // Open the eVerify dialog
    },
    closeEVerifyDialog(state) {
      state.isEVerifyDialogOpen = false; // Close the eVerify dialog
    },
    openLayoutLoader(state) {
      state.isLayoutLoader = true; // Open the isLayoutLoader
    },
    closeLayoutLoader(state) {
      state.isLayoutLoader = false; // Close the isLayoutLoader
    },
  },
});

export const {
  openDrawer,
  closeDrawer,
  toggleDrawer,
  openBackdrop,
  closeBackdrop,
  setBackdrop,
  openEVerifyDialog,
  closeEVerifyDialog,
  openLayoutLoader,
  closeLayoutLoader,
} = drawerSlice.actions;

export default drawerSlice.reducer;
