import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { create } from "lodash";
import axios from "axios";
import { apis } from "../../shared/axios";

// actions

const GET_DETAIL = "GET_DETAIL";
const _GET_DETAIL = "_GET_DETAIL";
const ADD_BOOK = "ADD_BOOK";
const RESET_DETAIL = "RESET_DETAIL";

// initialState
const initialState = {
  post: [],
  is_loading: false,
  detail_post: [],
};

//Action Create
const getDetail = createAction(GET_DETAIL, (detail_post) => ({ detail_post }));
const _getDetail = createAction(_GET_DETAIL, (detail_post) => ({
  detail_post,
}));
const addBook = createAction(ADD_BOOK, (marks_list) => ({ marks_list }));
export const detailsGet = createAction(RESET_DETAIL);

const getDetailFB = (dataId) => {
  return function (dispatch, getState, { history }) {
    apis
      .detailGet(dataId)
      .then((res) => {
        dispatch(getDetail(res.data.data));
      })
      .catch((error) => {
        console.log("디테일 로드 실패", error);
      });
  };
};
const _getDetailDB = (dataId) => {
  return function (dispatch, getState, { history }) {
    axios
      .get(process.env.REACT_APP_BASE_URL + `api/policies/${dataId}`)
      .then((res) => {
        dispatch(_getDetail(res.data.data));
      })
      .catch((error) => {
        console.log("디테일 로드 실패", error);
      });
  };
};

const addBookFB = (dataId) => {
  return function (dispatch, getState, { history }) {
    apis
      .bookAdd(dataId)
      .then((res) => {
        dispatch(addBook(res.data.data.bookmarkState));
      })
      .catch((err) => {
        console.log("북마크 추가 실패", err);
      });
  };
};

//reducer
export default handleActions(
  {
    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_post = action.payload.detail_post;
        if (action.payload.detail_post.dataId === draft.detail_post.dataId) {
          draft.detail_post.bookmarkState =
            action.payload.detail_post.bookmarkState;
        }
      }),
    [_GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_post = action.payload.detail_post;
      }),
    [ADD_BOOK]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_post.bookmarkState = action.payload.marks_list;
      }),
    [RESET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_post = [];
      }),
  },
  initialState
);

const actionCreators = {
  getDetailFB,
  addBookFB,
  _getDetailDB,
};

export { actionCreators };
