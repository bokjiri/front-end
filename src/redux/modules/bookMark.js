import { createAction, handleActions } from "redux-actions";
import { actionCreators as postActions } from "./post";

import { produce } from "immer";
import axios from "axios";
import { apis } from "../../shared/axios";

//action
//bookMark
const GET_BOOK = "GET_BOOK";
const ADD_BOOK = "ADD_BOOK";
//news
const GET_NEWS = "GET_NEWS";

// initialState
const initialState = {
  marks: [],
  news: [],
  marks_list: [],
};

//Action Create
const getBook = createAction(GET_BOOK, (marks) => ({ marks }));
const addBook = createAction(ADD_BOOK, (marks_list) => ({ marks_list }));
const getNews = createAction(GET_NEWS, (news) => ({ news }));

//middleware actions
const getBookFB = (userId) => {
  return function (dispatch, getState, { history }) {
    apis
      .bookGet(userId)
      .then((res) => {
        dispatch(getBook(res.data.userMark));
      })
      .catch((error) => {
        console.log("북마크 로드 실패", error);
      });
  };
};

const addBookFB = (dataId) => {
  return function (dispatch, getState, { history }) {
    apis
      .bookAdd(dataId)
      .then((res) => {
        dispatch(addBook(res.data.data));
      })
      .then((res) => {
        dispatch(postActions.getDetailFB(dataId));
      })
      .then((res) => {
        dispatch(getBook(res.data.userMark));
      })
      .catch((err) => {
        console.log("북마크 추가 실패", err);
      });
  };
};

const getNewsFB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .newsGet()
      .then((res) => {
        dispatch(getNews(res.data.newsList));
      })
      .catch((error) => {
        console.log("뉴스 겟 실패", error);
      });
  };
};

//reducer
export default handleActions(
  {
    [GET_BOOK]: (state, action) =>
      produce(state, (draft) => {
        draft.marks = action.payload.marks;
      }),
    [GET_NEWS]: (state, action) =>
      produce(state, (draft) => {
        draft.news = action.payload.news;
      }),
    [ADD_BOOK]: (state, action) =>
      produce(state, (draft) => {
        draft.marks_list = action.payload.marks_list;
      }),
  },
  initialState
);

const actionCreators = {
  getBook,
  getBookFB,
  getNewsFB,
  addBookFB,
};

export { actionCreators };
