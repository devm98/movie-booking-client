import apiService from '../../core/helpers/axiosService';

const urlComingSoon = '/public/movies/?query=coming-soon';
const urlNowShowing = '/public/movies';
const urlRecommend = (id) => `public/movies/recommendation/${id}`;
const urlMovieDetail = (id) => `/public/movies/${id}`;

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
