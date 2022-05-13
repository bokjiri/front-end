import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { apis } from "../../shared/axios";

//action
//bookMark
const GET_BOOK = "GET_BOOK";
const ADD_BOOK = "ADD_BOOK";
const DELETE_BOOK = "DELETE_BOOK";
//news
const GET_NEWS = "GET_NEWS";

// initialState
const initialState = {
  marks: [],
  news: [],
};

//Action Create
const getBook = createAction(GET_BOOK, (marks) => ({ marks }));
const addBook = createAction(ADD_BOOK, (marks_list) => ({ marks_list }));
const deleteBook = createAction(DELETE_BOOK, (dataId) => ({ dataId }));
const getNews = createAction(GET_NEWS, (news) => ({ news }));

//middleware actions
const getBookFB = (userId) => {
  return function (dispatch, getState, { history }) {
    apis
      .bookGet(userId)
      .then((res) => {
        console.log("북마크 res", res);
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
        dispatch(addBook(dataId));
      })
      .catch((err) => {
        console.log("북마크 추가 실패", err);
      });
  };
};

const deleteBookFB = (dataId) => {
  return function (dispatch, getState, { history }) {
    apis
      .bookdelete(dataId)
      .then((res) => {
        dispatch(deleteBook(dataId));
      })
      .catch((err) => {
        console.log("삭제 실패", err);
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
        draft.marks.unshift(action.payload.marks_list);
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
  addBookFB,
  deleteBookFB,
};

export { actionCreators };
