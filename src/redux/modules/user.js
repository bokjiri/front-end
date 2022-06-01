import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import Cookies from "universal-cookie";
import { apis } from "../../shared/axios";
import jwtDecode from "jwt-decode";
import { history } from "../configureStore";
const cookies = new Cookies();

//1. Action
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

//3. Action Creator
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

//2. 초기값 지정
const initialState = {
  user: null,
  isLogin: false,
};

const loginDB = (code) => {
  return function (dispatch, getState, { history }) {
    apis
      .kakaoGet(code)
      .then((response) => {
        //response : accessToken, refreshToken
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        cookies.set("userToken", accessToken, { path: "/" });
        cookies.set("refreshToken", refreshToken, { path: "/" });

        const userInfo = jwtDecode(accessToken); //accessToken decode : email, nickname, profileImg
        //console.log(userInfo);

        //email, nickname LocalStorage Set
        let userId = userInfo.userId;
        let userEmail = decodeURIComponent(userInfo.email); //decodeURIComponent : 특수문자, 한글깨짐 해결
        let userNickname = decodeURIComponent(userInfo.nickname);
        let profileUrl = userInfo.profileUrl;
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("nickName", userNickname);
        localStorage.setItem("userId", userId);
        localStorage.setItem("profileUrl", profileUrl);

        dispatch(logIn({ userId: userId }));
        history.replace("/addinfo");
        //window.location.replace("/addinfo");
      })
      .catch((err) => {
        console.log("로그인 get 에러발생", err);
      });
  };
};

const logoutDB = () => {
  return function (dispatch, getState, { history }) {
    cookies.remove("userToken", { path: "/" });
    cookies.remove("refreshToken", { path: "/" });
    localStorage.clear();

    dispatch(logOut());
    // history.replace("/");
  };
};

const SignOutDB = (userId) => {
  return function (dispatch, getState, { history }) {
    apis
      .userDelete(userId)
      .then((res) => {
        cookies.remove("userToken", { path: "/" });
        cookies.remove("refreshToken", { path: "/" });
        localStorage.clear();

        dispatch(logOut());
        history.replace("/");
      })
      .catch((err) => {
        console.log("회원탈퇴 실패", err);
      });
  };
};

const loginCheck = () => {
  return function (dispatch, setState, { history }) {
    const tokenCheck = cookies.get("userToken");
    const userId = localStorage.getItem("userId");
    // const userId
    if (tokenCheck) {
      dispatch(logIn({ userId: userId }));
    } else {
      dispatch(logoutDB());
    }
  };
};

//4.Reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.isLogin = false;
      }),
  },
  initialState
);

const actionCreators = {
  logIn,
  loginDB,
  logOut,
  logoutDB,
  SignOutDB,
  loginCheck,
};

export { actionCreators };
