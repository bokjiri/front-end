import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { create } from "lodash";
import axios from "axios";
import { apis } from "../../shared/axios";

// actions

const GET_POST = "GET_POST";
const ADD_BUG = "ADD_BUG";
const GET_DETAIL = "GET_DETAIL";

// initialState
const initialState = {
  post: [],
  is_loading: false,
  detail_post: [],
};

//Action Create
const getPost = createAction(GET_POST, (post) => ({ post }));
const addBug = createAction(ADD_BUG, (bug) => ({ bug }));
const getDetail = createAction(GET_DETAIL, (detail_post) => ({ detail_post }));

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get("http://localhost:3001/post")
      .then((res) => {
        dispatch(getPost(res.data));
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

const addBugFB = (dataId) => {
  console.log("데이터아이디", dataId);
  return function ({ history }) {
    apis
      .bugAdd(dataId)
      .then((res) => {
        window.alert("정책 오류 신고가 되었습니다.👍");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
};

const getDetailFB = (dataId) => {
  console.log(dataId);
  return function (dispatch, getState, { history }) {
    apis
      .detailGet(dataId)
      .then((res) => {
        console.log("ㅇㅇㅇ", res.data);
        dispatch(getDetail(res.data.data));
      })
      .catch((error) => {
        console.log("디테일 로드 실패", error);
      });
  };
};

//reducer
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
      }),
    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        console.log(state);
        draft.detail_post = action.payload.detail_post;
      }),
  },
  initialState
);

const actionCreators = {
  getPost,
  addBug,
  getPostFB,
  addBugFB,
  getDetailFB,
};

export { actionCreators };
