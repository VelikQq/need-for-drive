export const LOC_CHANGE_CITY_TEXT = "LOC_CHANGE_CITY_TEXT";
export const LOC_CHANGE_CITYPOINT_TEXT = "LOC_CHANGE_CITYPOINT_TEXT";

export const setCityText = (city) => ({
  type: LOC_CHANGE_CITY_TEXT,
  payload: city,
});
export const setCityPointText = (cityPoint) => ({
  type: LOC_CHANGE_CITYPOINT_TEXT,
  payload: cityPoint,
});
