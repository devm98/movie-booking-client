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
