import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/axios";
import Swal from "sweetalert2";

const GET_CONTENT = "GET_CONTENT";
const ADD_CONTENT = "ADD_CONTENT";
const EDIT_CONTENT = "EDIT_CONTENT";
const DELETE_CONTENT = "DELETE_CONTENT";
const REPORT_CONTENT = "REPORT_CONTENT";

const initialState = {
  content: [],
};

const getContent = createAction(GET_CONTENT, (content) => ({ content }));
const addContent = createAction(ADD_CONTENT, (content) => ({
  content,
}));
const editContent = createAction(EDIT_CONTENT, (content) => ({
  content,
}));
const deleteContent = createAction(DELETE_CONTENT, (feedId) => ({
  feedId,
}));
const reportContent = createAction(REPORT_CONTENT, (feedId) => ({ feedId }));

export const getContentDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .contentGet()
      .then((res) => {
        dispatch(getContent(res.data.guestbook));
      })
      .catch((err) => {
        console.log("방명록 로드 실패", err);
      });
  };
};

export const addContentDB = (content) => {
  return function (dispatch, getState, { history }) {
    apis
      .contentAdd(content)
      .then((res) => {
        dispatch(addContent(res.data.guestbook));
        Swal.fire("게시글이 등록 되었습니다.");
      })
      .catch((err) => {
        console.log("방명록 추가 실패", err);
      });
  };
};

export const editContentDB = (feedId, content) => {
  return function (dispatch, getState, { history }) {
    apis
      .contentEdit(feedId, content)
      .then((res) => {
        Swal.fire("게시글이 수정 되었습니다.");
        dispatch(editContent(res.data.guestbook));
      })
      .catch((err) => {
        console.log("방명록 수정 실패", err);
      });
  };
};

export const deleteContentDB = (feedId) => {
  return function (dispatch, getState, { history }) {
    apis
      .contentDelete(feedId)
      .then((res) => {
        dispatch(deleteContent(feedId));
        Swal.fire("게시글이 삭제 되었습니다.");
      })
      .catch((err) => {
        console.log("방명록 삭제 실패", err);
      });
  };
};

export const reportContentDB = (feedId) => {
  return function (dispatch) {
    apis
      .contentReport(feedId)
      .then((res) => {
        dispatch(reportContent(feedId));
        Swal.fire("게시글이 신고 되었습니다.");
      })
      .catch((err) => {
        console.log("방명록 삭제 실패", err);
      });
  };
};

export const guestBook = handleActions(
  {
    [GET_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        draft.content = action.payload.content;
      }),
    [ADD_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        draft.content.unshift(action.payload.content);
      }),
    [EDIT_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.content.findIndex((c) => {
          return parseInt(c.feedId) === parseInt(action.payload.content.feedId);
        });
        draft.content[idx] = {
          ...draft.content[idx],
          content: action.payload.content.content,
        };
      }),
    [DELETE_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        draft.content = draft.content.filter(
          (p) => p.feedId !== action.payload.feedId
        );
      }),
    [REPORT_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        draft.content = draft.content.filter(
          (p) => p.feedId !== action.payload.feedId
        );
      }),
  },
  initialState
);

export default guestBook;
