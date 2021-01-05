export const stateCreator = (keys = []) => {
  let stateObj = {};
  keys.forEach((key) => {
    stateObj[key] = {
      data: [],
      loading: false,
      error: false,
      httpCode: -1,
    };
  });
  return stateObj;
};
