import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StandTypeEnum } from "../../../models";

interface ApplicationFilterState {
  type: StandTypeEnum;
}

const initialState: ApplicationFilterState = {
  type: StandTypeEnum.HIL,
};

export const ApplicationFilterSlice = createSlice({
  name: "ApplicationFilterSlice",
  initialState,
  reducers: {
    setType: (
      state,
      action: PayloadAction<{
        type: StandTypeEnum;
      }>
    ) => {
      state.type = action.payload.type;
    },
  },
});

export const {
  reducer: applicationFilterSliceReducer,
  actions: applicationFilterSliceActions,
} = ApplicationFilterSlice;
