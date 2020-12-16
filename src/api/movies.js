import apiService from '../utils/helpers/axiosService';

const urlComingSoon = '/home/movies/?query=coming-soon';
const urlNowShowing = '/home/movies';
const urlRecommend = (id) => `home/movies/recommendation/${id}`;
const urlMovieDetail = (id) => `/home/movies/${id}`;

export const getComingSoon = () => {
  return apiService.get(urlComingSoon);
};

export const getNowShowing = () => {
  return apiService.get(urlNowShowing);
};

export const getMovieRecommends = (id) => {
  return apiService.get(urlRecommend(id));
};

export const getMovieDetails = (id) => {
  return apiService.get(urlMovieDetail(id));
};
