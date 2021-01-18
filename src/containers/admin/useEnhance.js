import { useDispatch } from 'react-redux';
import authActions from '../../core/state/actions/auth';

const { signInActions } = authActions;

const useEnhance = () => {
  const dispatch = useDispatch();

  const adminLoginHandler = ({ email, password }) => {
    dispatch(signInActions({ email, password }));
  };

  return {
    adminLoginHandler,
  };
};

export default useEnhance;
