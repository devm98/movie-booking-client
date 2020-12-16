import apiService from "../utils/helpers/axiosService";

export const signInHandler = (data) => {
  return apiService.post("/client/authenticate", data);
};
