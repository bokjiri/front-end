import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/axios";

//1. actions
const SET_INFO = "SET_INFO";
const SET_POLICY = "SET_POLICY";
const ADD_INFO = "ADD_INFO";
const EDIT_INFO = "EDIT_INFO";
//const DELETE_USER = "DELETE_USER";

//2. initialState
const initialState = {
  policyList : [],
  list : [],
  lifeCycle : [],
  obstacle : [],
  target : [],
};

const initialInfo = {
  lifeCycle : [],
  obstacle : [],
  target : [],
}

//3. Action Create
const setInfo = createAction(SET_INFO, (info_list) => ({ info_list }));
const setPolicy = createAction(SET_POLICY, (policy_list) => ({ policy_list }));
const addInfo = createAction(ADD_INFO, (info) => ({ info }));
// const editInfo = createAction(EDIT_INFO, (email, post_list) => ({
//   email,
//   post_list,
// }));
//const deleteUser = createAction(DELETE_USER, () => ({}));


//4. middleware
//User 입력 정보 GET
export const getInfoDB =
  (userId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.infoGet(userId);
      // console.log(data);
      dispatch(setInfo(data.data));
    } catch (err) {
      console.log(err);
    }
  };


//User 정보 입력 POST
const addInfoDB = (userId = 0, lifeCycle = [], obstacle = [], target = []) => {
  return function (dispatch, getState, { history }) {

    const _info = {
      ...initialInfo,
      lifeCycle : lifeCycle,
      obstacle : obstacle,
      target : target,
    }

    apis
      .infoAdd(userId, lifeCycle, obstacle, target)
      .then((res) => {
        dispatch(addInfo(_info));
        history.replace("/main");
      })
      .catch((err) => {
        console.log("infoAdd 실패", err);
      });
  };
};

//User 정보 수정 PUT


//User 맞춤 정책 GET
export const getPolicyDB =
  (userId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.policyGet(userId);
      dispatch(setPolicy(data.checkedData));
      //console.log(data.checkedData);
    } catch (err) {
      console.log(err);
    }
  };


//5. reducer
export default handleActions({

  [SET_INFO]: (state, action) =>  produce(state, (draft) => {
    draft.list = action.payload.info_list;
  }),

  [SET_POLICY] : (state, action) => produce(state, (draft) => {
    draft.policyList = action.payload.policy_list;
  }),


  [ADD_INFO]: (state, action) => produce(state, (draft) => {
    draft.list.unshift(action.payload.info);
  }),

  [EDIT_INFO]: (state, action) => produce(state, (draft) => {}),


  },
  initialState
);

const actionCreators = {
  getInfoDB,
  addInfo,
  addInfoDB,
  getPolicyDB,
  //editInfo,
  //deleteUser,
};

export { actionCreators };