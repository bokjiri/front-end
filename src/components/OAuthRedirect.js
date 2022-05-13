import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as userActions } from "../redux/modules/user";


const OAuthRedirect = () => {

  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {

    dispatch(userActions.loginDB(code));
   
  }, []);
  return null;
};

export default OAuthRedirect;
