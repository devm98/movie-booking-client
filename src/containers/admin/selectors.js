import moment from 'moment';
import { createSelector } from 'reselect';

export const getUserSelectors = createSelector(
  (state) => state?.user?.data,
  (users) =>
    users?.map((user) => ({
      ...user,
      key: user.id,
      gender: user.gender === null ? 'diff' : user.gender,
    }))
);

export const getPagingSelectors = createSelector(
  (state) => state?.user?.pageInfo,
  (pageInfo) => pageInfo
);

export const getLoadingSelector = createSelector(
  (state) => state?.user?.loading,
  (loading) => loading
);

export const getCreateLoadingSelector = createSelector(
  (state) => state?.user?.userCreated?.loading,
  (loading) => loading
);

export const getHttpCodeSelector = createSelector(
  (state) => state?.user?.userCreated?.httpCode,
  (httpCode) => httpCode
);

export const getUpdateLoadingSelector = createSelector(
  (state) => state?.user?.userUpdated?.loading,
  (loading) => loading
);

export const getHttpCodeUpdateSelector = createSelector(
  (state) => state?.user?.userUpdated?.httpCode,
  (httpCode) => httpCode
);

export const getRemoveLoadingSelector = createSelector(
  (state) => state?.user?.userDeleted?.loading,
  (loading) => loading
);

export const getHttpCodeRemoveSelector = createSelector(
  (state) => state?.user?.userDeleted?.httpCode,
  (httpCode) => httpCode
);

//========== Movie management ==================
export const getMovieAllSelectors = createSelector(
  (state) => state?.movies?.movieAll?.data,
  (movieAll) =>
    movieAll?.map((movie) => ({
      ...movie,
      key: movie.id,
    }))
);
export const getLoadingMovieAllSelectors = createSelector(
  (state) => state?.movies?.movieAll?.loading,
  (loading) => loading
);

export const getPageInfoMovieAllSelectors = createSelector(
  (state) => state?.movies?.movieAll?.pageInfo,
  (pageInfo) => pageInfo
);

export const getMovieCreateLoadingSelector = createSelector(
  (state) => state?.movies?.movieCreated?.loading,
  (loading) => loading
);

export const getMovieCreateHttpCodeSelector = createSelector(
  (state) => state?.movies?.movieCreated?.httpCode,
  (httpCode) => httpCode
);

export const getMovieUpdateLoadingSelector = createSelector(
  (state) => state?.movies?.movieUpdated?.loading,
  (loading) => loading
);

export const getMovieHttpCodeUpdateSelector = createSelector(
  (state) => state?.movies?.movieUpdated?.httpCode,
  (httpCode) => httpCode
);

export const getMovieRemoveLoadingSelector = createSelector(
  (state) => state?.movies?.movieDeleted?.loading,
  (loading) => loading
);

export const getMovieHttpCodeRemoveSelector = createSelector(
  (state) => state?.movies?.movieDeleted?.httpCode,
  (httpCode) => httpCode
);

export const getScheduleSelector = createSelector(
  (state) => state?.booking?.schedule?.data,
  (schedule) =>
    schedule.map((obj) => ({
      showingDate: moment(obj.showingDate),
      auditoriumId: obj.auditoriumId,
      price: obj.price,
    }))
);
export const getLoadingScheduleSelector = createSelector(
  (state) => state?.booking?.schedule?.loading,
  (loading) => loading
);
