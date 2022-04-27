import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { create } from "lodash";

// actions

const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";
const EDIT_POST = "EDIT_POST";

// initialState
const initialState = {
  post: [],
};

//Action Create
const getPost = createAction(GET_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post_list) => ({ post_list }));
const deletePost = createAction(DELETE_POST, () => ({}));
const editPost = createAction(EDIT_POST, (email, post_list) => ({
  email,
  post_list,
}));

//reducer
export default handleActions({
  [GET_POST]: (state, action) => produce(state, (draft) => {}),
  [ADD_POST]: (state, action) => produce(state, (draft) => {}),
  [DELETE_POST]: (state, action) => produce(state, (draft) => {}),
});

const actionCreators = {
  getPost,
  addPost,
  deletePost,
  editPost,
};

export { actionCreators };