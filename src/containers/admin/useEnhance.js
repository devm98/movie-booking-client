import { useState } from 'react';
import { useDispatch } from 'react-redux';
import authActions from '../../state/actions/auth';
import userActions from '../../state/actions/user';

const { signInActions } = authActions;
const { getUsers, createUser } = userActions;

const useEnhance = () => {
  const dispatch = useDispatch();
  const [paging] = useState({
    page: 0,
    limit: 10,
  });

  const adminLoginHandler = ({ email, password }) => {
    console.log({ email, password });
    dispatch(signInActions({ email, password }));
  };

  const onCreateUser = (data) => {
    dispatch(createUser(data));
  };

  const onDispatchGetUsers = () => dispatch(getUsers(paging));

  return {
    adminLoginHandler,
    onDispatchGetUsers,
    onCreateUser,
  };
};

export default useEnhance;
