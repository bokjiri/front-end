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
  console.log(userId);
  return function (dispatch, getState, { history }) {
    apis
      .bookGet(userId)
      .then((res) => {
        console.log("북마크 겟", res);
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
        // console.log(res);
        dispatch(addBook(dataId));
      })
      .catch((err) => {
        console.log("북마크 추가 실패", err);
      });
  };
};

const deleteBookFB = (dataId) => {
  console.log("삭제 유저 데이터 아이디", dataId);
  return function (dispatch, getState, { history }) {
    apis
      .bookdelete(dataId)
      .then((res) => {
        // console.log(res.data.userMark);
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
        console.log("영우님", res);
        dispatch(getNews(res.data.newsList));
        console.log("퇴근하셔도 됩니다 😁", res.data.newsList);
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
        console.log("북마크 리듀서", action.payload);
      }),
    [GET_NEWS]: (state, action) =>
      produce(state, (draft) => {
        draft.news = action.payload.news;
        console.log("뉴스 리듀서", action.payload);
        console.log("리듀서 상태", state);
      }),
    [ADD_BOOK]: (state, action) =>
      produce(state, (draft) => {
        draft.marks.unshift(action.payload.marks_list);
        console.log("북마크 추가 리듀서", action.payload);
      }),
    [DELETE_BOOK]: (state, action) =>
      produce(state, (draft) => {
        draft.marks = draft.marks.filter(
          (p) => p.dataId !== action.payload.dataId
        );
        console.log("북마크 삭제 리듀서", action.payload);
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
