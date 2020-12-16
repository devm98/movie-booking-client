import { createSelector } from 'reselect';

export const movieSelector = createSelector(
  (state) => state.schedule.data,
  (movies) => movies
);
