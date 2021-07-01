export const EXT_CHANGE_COLOR_TEXT = "EXT_CHANGE_COLOR_TEXT";
export const EXT_CHANGE_DATESTART_TEXT = "EXT_CHANGE_DATESTART_TEXT";
export const EXT_CHANGE_DATEFINISH_TEXT = "EXT_CHANGE_DATEFINISH_TEXT";
export const EXT_CHANGE_DATECOUNT_TEXT = "EXT_CHANGE_DATECOUNT_TEXT";
export const EXT_CHANGE_RATE_TEXT = "EXT_CHANGE_RATE_TEXT";
export const EXT_CHANGE_STATUSID_TEXT = "EXT_CHANGE_STATUSID_TEXT";
export const EXT_CHANGE_PARAMORDER_TEXT = "EXT_CHANGE_PARAMORDER_TEXT";
export const EXT_CHANGE_PRICE_TEXT = "EXT_CHANGE_PRICE_TEXT";
export const EXT_CHANGE_TANK_TEXT = "EXT_CHANGE_TANK_TEXT";
export const EXT_CHANGE_CHAIR_TEXT = "EXT_CHANGE_CHAIR_TEXT";
export const EXT_CHANGE_WHEEL_TEXT = "EXT_CHANGE_WHEEL_TEXT";

export const setColorText = (color) => ({
  type: EXT_CHANGE_COLOR_TEXT,
  payload: color,
});
export const setDateStartText = (dateStart) => ({
  type: EXT_CHANGE_DATESTART_TEXT,
  payload: dateStart,
});
export const setDateFinishText = (dateFinish) => ({
  type: EXT_CHANGE_DATEFINISH_TEXT,
  payload: dateFinish,
});
export const setDateCountText = (dateCount) => ({
  type: EXT_CHANGE_DATECOUNT_TEXT,
  payload: dateCount,
});
export const setRateText = (rate) => ({
  type: EXT_CHANGE_RATE_TEXT,
  payload: rate,
});
export const setStatusIdText = (orderStatusId) => ({
  type: EXT_CHANGE_STATUSID_TEXT,
  payload: orderStatusId,
});
export const setParamOrderText = (paramOrder) => ({
  type: EXT_CHANGE_PARAMORDER_TEXT,
  payload: paramOrder,
});
export const setPriceText = (price) => ({
  type: EXT_CHANGE_PRICE_TEXT,
  payload: price,
});
export const setTankText = (tank) => ({
  type: EXT_CHANGE_TANK_TEXT,
  payload: tank,
});
export const setChairText = (chair) => ({
  type: EXT_CHANGE_CHAIR_TEXT,
  payload: chair,
});
export const setWheelText = (wheel) => ({
  type: EXT_CHANGE_WHEEL_TEXT,
  payload: wheel,
});
