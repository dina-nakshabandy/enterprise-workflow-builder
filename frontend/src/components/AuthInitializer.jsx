import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchCurrentUser,
} from "../features/auth/authSlice";

const AuthInitializer = () => {

  const dispatch = useDispatch();

  const token = useSelector(
    (state) => state.auth.token
  );

  useEffect(() => {

    if (token) {
      dispatch(
        fetchCurrentUser()
      );
    }
  }, [dispatch, token]);

  return null;
};

export default AuthInitializer;