import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { create } from "lodash";
import axios from "axios";

// actions

const GET_POST = "GET_POST";
const ADD_BUG = "ADD_BUG";
const GET_DETAIL = "GET_DETAIL";

// initialState
const initialState = {
  post: [],
  is_loading: false,
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
        console.log(res);
        dispatch(getPost(res.data));
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

const addBugFB = (dataId) => {
  // const token = getCookie("authorization")
  // console.log("유저코드", userCode);
  console.log("데이터아이디", dataId);
  return function ({ history }) {
    axios
      .post(
        "http://localhost:3001/post",
        {
          dataId: dataId,
        }
        // {headers : {'authorization': `${token}`}},
      )
      .then((res) => {
        console.log(res);
        history.push("detail");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
};

//reducer
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
        console.log(state, action);
      }),
  },
  initialState
);

const actionCreators = {
  getPost,
  addBug,
  getPostFB,
  addBugFB,
};

export { actionCreators };