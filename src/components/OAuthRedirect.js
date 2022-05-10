import React, { useEffect } from "react";
import { history } from "../redux/configureStore";
import axios from "axios";
import { instance, apis} from "../shared/axios";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as userActions } from "../redux/modules/user";

import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
const cookies = new Cookies();


const OAuthRedirect = () => {

  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {

    dispatch(userActions.loginDB(code));
    // apis
    //   .kakaoGet(code)
    //   .then((response) => {

    //     //response : accessToken, refreshToken
    //     const accessToken = response.data.accessToken;
    //     const refreshToken = response.data.refreshToken;

    //     cookies.set("userToken", accessToken, {path : "/"});
    //     cookies.set("refreshToken", refreshToken, {path : "/"});

    //     const userInfo = jwtDecode(accessToken);       //accessToken decode : email, nickname, profileImg
    //     //console.log(userInfo);

    //     //email, nickname LocalStorage Set
    //     let userId = userInfo.userId;
    //     let userEmail = decodeURIComponent(userInfo.email);  //decodeURIComponent : 특수문자, 한글깨짐 해결
    //     let userNickname = decodeURIComponent(userInfo.nickname);
    //     let profileUrl = userInfo.profileUrl;
    //     localStorage.setItem("userEmail", userEmail);
    //     localStorage.setItem("nickName", userNickname);
    //     localStorage.setItem("userId", userId);
    //     localStorage.setItem("profileUrl", profileUrl);
        

    //     //history.replace("/addinfo");
    //     window.location.replace("/addinfo");
    //   })
    //   .catch((err) => {
    //     console.log("로그인 get 에러발생", err);
    //   });
  }, []);
  return null;
};

export default OAuthRedirect;
