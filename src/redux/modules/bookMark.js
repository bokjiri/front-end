import { createAction, handleActions } from "redux-actions";
import { actionCreators as postActions } from "./post";

import { produce } from "immer";
import axios from "axios";
import { apis } from "../../shared/axios";

//action
//bookMark
const GET_BOOK = "GET_BOOK";
const DELETE_BOOK = "DELETE_BOOK";
//news
const GET_NEWS = "GET_NEWS";

// initialState
const initialState = {
  marks: [],
  news: [],
  bookmarkState: false,
};

//Action Create
const getBook = createAction(GET_BOOK, (marks) => ({ marks }));
const getNews = createAction(GET_NEWS, (news) => ({ news }));
const deleteBook = createAction(DELETE_BOOK, (dataId) => ({ dataId }));

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

const deleteBookDB = (dataId) => {
  return function (dispatch) {
    apis
      .bookdelete(dataId)
      .then((res) => {
        dispatch(deleteBook(dataId));
      })
      .catch((err) => {
        console.log("북마크 삭제 실패", err);
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
    [DELETE_BOOK]: (state, action) =>
      produce(state, (draft) => {
        draft.marks = draft.marks.filter(
          (p) => p.dataId !== action.payload.dataId
        );
      }),
  },
  initialState
);

const actionCreators = {
  getBook,
  getBookFB,
  getNewsFB,
  deleteBookDB,
};

export { actionCreators };
