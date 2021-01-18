import apiService from '../../core/helpers/axiosService';

const urlComingSoon = '/public/movies/?query=coming-soon';
const urlMovieAll = '/public/movies/?query=all';
const urlNowShowing = '/public/movies';
const urlRecommend = (id) => `public/movies/recommendation/${id}`;
const urlMovieDetail = (id) => `/public/movies/${id}`;

// admin movie
const urlCreateMovie = '/admin/movies';
const urlUpdateMovie = (id) => `/admin/movies/${id}`;
const urlDelete = (id) => `/admin/movies/${id}`;

export const getComingSoon = () => {
  return apiService.get(urlComingSoon);
};

export const getNowShowing = () => {
  return apiService.get(urlNowShowing);
};

export const getMovieAll = (params = {}) => {
  return apiService.get(urlMovieAll, { params });
};

export const getMovieRecommends = (id) => {
  return apiService.get(urlRecommend(id));
};

export const getMovieDetails = (id) => {
  return apiService.get(urlMovieDetail(id));
};

// ================ movie admin api ========================
export const createMovie = (data = {}) => {
  return apiService.post(urlCreateMovie, data);
};

export const updateMovie = (data = {}) => {
  return apiService.put(urlUpdateMovie(data.id), data);
};

export const deleteMovie = (id) => {
  return apiService.delete(urlDelete(id));
};
