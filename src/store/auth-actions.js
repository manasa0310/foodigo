import { authActions } from './auth-slice';

export const fetchUser = () => {
  return async (dispatch) => {
    const userInfo =
      localStorage.getItem('user') !== 'undefined'
        ? JSON.parse(localStorage.getItem('user'))
        : localStorage.clear();
    dispatch(authActions.setUser(userInfo));
  };
};
