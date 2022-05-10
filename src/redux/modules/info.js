import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/axios";

//1. actions
const SET_INFO = "SET_INFO";
const ADD_INFO = "ADD_INFO";

//2. initialState
const initialState = {
  list: {
    lifeCycle: [],
    gender: [],
    region: [],
    disability: [],
    obstacle: [],
  },
  lifeCycle: [],
  gender: [],
  region: [],
  disability: [],
  obstacle: [],
};

const initialInfo = {
  lifeCycle: [],
  gender: [],
  region: [],
  disability: [],
  obstacle: [],
};

//3. Action Create
const setInfo = createAction(SET_INFO, (info_list) => ({ info_list }));
const addInfo = createAction(ADD_INFO, (one) => ({ one }));

//4. middleware
//User 입력 정보 GET
export const getInfoDB =
  (userId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.infoGet(userId);
      dispatch(setInfo(data.data));
    } catch (err) {
      console.log(err);
    }
  };

//User 정보 입력 PATCH
const addInfoDB = (
  userId,
  lifeCycle,
  gender,
  region,
  obstacleYN,
  obstacle,
  scholarship,
  job,
  married,
  target,
  newIncome
) => {
  return function (dispatch, getState, { history }) {
    const _info = {
      ...initialInfo,
      lifeCycle: lifeCycle,
      gender: gender,
      region: region,
      disability: obstacleYN,
      obstacle: obstacle,
      scholarship: scholarship,
      job: job,
      married: married,
      target: target,
      newIncome: newIncome,
    };

    apis
      .infoAdd(
        userId,
        lifeCycle,
        gender,
        region,
        obstacleYN,
        obstacle,
        scholarship,
        job,
        married,
        target,
        newIncome
      )
      .then((res) => {
        dispatch(addInfo(_info));
        history.replace("/main");
      })
      .catch((err) => {
        console.log("infoAdd 실패", err);
      });
  };
};

//5. reducer
export default handleActions(
  {
    [SET_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.info_list;
      }),

    [ADD_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.list = { ...action.payload.one };
      }),
  },
  initialState
);

const actionCreators = {
  getInfoDB,
  addInfo,
  addInfoDB,
  setInfo,
};

export { actionCreators };
