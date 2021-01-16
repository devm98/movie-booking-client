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
