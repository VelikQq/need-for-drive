import { LOC_CHANGE_CITY_TEXT, LOC_CHANGE_CITYPOINT_TEXT } from "./action";
const defaultState = {
  valueCity: { name: "" },
  valueOfPoint: { address: "" },
};

export const locReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOC_CHANGE_CITY_TEXT:
      return {
        ...state,
        valueCity: Object.assign({}, action.payload),
      };
    case LOC_CHANGE_CITYPOINT_TEXT:
      return {
        ...state,
        valueOfPoint: Object.assign({}, action.payload),
      };
  }
  return state;
};
