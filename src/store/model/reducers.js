import { MOD_CHANGE_CAR_TEXT } from "./action";
const defaultState = {
  selectCar: { name: "" },
};

export const modReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MOD_CHANGE_CAR_TEXT:
      return {
        ...state,
        selectCar: Object.assign({}, action.payload),
      };
  }
  return state;
};
