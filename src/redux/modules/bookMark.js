import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

//action
const GET_BOOK = "GET_BOOK";

// initialState
const initialState = {
  posts: [],
};

//Action Create
const getBook = createAction(GET_BOOK, (marks) => ({ marks }));

//middleware actions
const getBookFB = () => {};

//reducer
export default handleActions(
  {
    [GET_BOOK]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  getBook,
  getBookFB,
};

export { actionCreators };
