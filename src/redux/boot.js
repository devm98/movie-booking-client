import configStore from './configStore';
import authActions from '../actions/auth';

const store = configStore();

export default async () => {
  await store.dispatch(authActions.checkAuthorization());
};
