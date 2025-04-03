import { RootState } from "../../store";

export const standTypeSelector = (state: RootState) =>
  state.applicationFilterSliceReducer.type;
