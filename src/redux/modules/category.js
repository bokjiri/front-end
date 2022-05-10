import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/axios";

const SET_POLICY = "SET_POLICY";
const SET_WORK = "SET_WORK";
const SET_HOUSELIFE = "SET_HOUSELIFE";
const SET_HEALTH = "SET_POSET_HEALTHLICY";
const SET_EDUCARE = "SET_EDUCARE";
const SET_SAFETYRIGHT = "SET_SAFETYRIGHT";
const SET_ETC = "SET_ETC";

const initialState = {
  policyList: [],
  work: [],
  houseLife: [],
  health: [],
  eduCare: [],
  safetyRight: [],
  etc: [],
};

const setPolicy = createAction(SET_POLICY, (policy_list) => ({ policy_list }));
const setWork = createAction(SET_WORK, (work) => ({ work }));
const setHouselife = createAction(SET_HOUSELIFE, (houseLife) => ({
  houseLife,
}));
const setHealth = createAction(SET_HEALTH, (health) => ({ health }));
const setEducare = createAction(SET_EDUCARE, (eduCare) => ({ eduCare }));
const setSafetyright = createAction(SET_SAFETYRIGHT, (safetyRight) => ({
  safetyRight,
}));
const setEtc = createAction(SET_ETC, (etc) => ({ etc }));

export const getPolicyDB =
  (userId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.policyGet(userId);
      // console.log("메인 데이터 ", data.checkedData);
      console.log("메인 데이터", data);
      dispatch(setPolicy(data.checkedData));
    } catch (err) {
      console.log(err);
    }
  };
export const workDB =
  (userId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.policyGet(userId);
      // console.log("메인 데이터 ", data.checkedData);
      console.log("일자리 데이터", data.work);
      dispatch(setWork(data.work));
    } catch (err) {
      console.log(err);
    }
  };
export const houseLifeDB =
  (userId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.policyGet(userId);
      // console.log("메인 데이터 ", data.checkedData);
      console.log("주거 및 일상생활 데이터", data.houseLife);
      dispatch(setHouselife(data.houseLife));
    } catch (err) {
      console.log(err);
    }
  };
export const healthDB =
  (userId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.policyGet(userId);
      // console.log("메인 데이터 ", data.checkedData);
      console.log("건강 데이터", data.health);
      dispatch(setHealth(data.health));
    } catch (err) {
      console.log(err);
    }
  };
export const eduCareDB =
  (userId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.policyGet(userId);
      // console.log("메인 데이터 ", data.checkedData);
      console.log("교육 및 돌봄 데이터", data.eduCare);
      dispatch(setEducare(data.eduCare));
    } catch (err) {
      console.log(err);
    }
  };
export const safetyRightDB =
  (userId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.policyGet(userId);
      // console.log("메인 데이터 ", data.checkedData);
      console.log("안전 및 권익보장 데이터", data.safetyRight);
      dispatch(setSafetyright(data.safetyRight));
    } catch (err) {
      console.log(err);
    }
  };
export const etcDB =
  (userId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.policyGet(userId);
      // console.log("메인 데이터 ", data.checkedData);
      console.log("기타 데이터", data.etc);
      dispatch(setEtc(data.etc));
    } catch (err) {
      console.log(err);
    }
  };

export default handleActions(
  {
    [SET_POLICY]: (state, action) =>
      produce(state, (draft) => {
        draft.policyList = action.payload.policy_list;
        console.log("전체 담기", action.payload.policy_list);
      }),
    [SET_WORK]: (state, action) =>
      produce(state, (draft) => {
        draft.work = action.payload.work;
        console.log("일 담기", action.payload.work);
      }),
    [SET_HOUSELIFE]: (state, action) =>
      produce(state, (draft) => {
        draft.houseLife = action.payload.houseLife;
        console.log("집 담기", action.payload.houseLife);
      }),
    [SET_HEALTH]: (state, action) =>
      produce(state, (draft) => {
        draft.health = action.payload.health;
        console.log("건강 담기", action.payload.health);
      }),
    [SET_EDUCARE]: (state, action) =>
      produce(state, (draft) => {
        draft.eduCare = action.payload.eduCare;
        console.log("교육 담기", action.payload.eduCare);
      }),
    [SET_SAFETYRIGHT]: (state, action) =>
      produce(state, (draft) => {
        draft.safetyRight = action.payload.safetyRight;
        console.log("안전 담기", action.payload.safetyRight);
      }),
    [SET_ETC]: (state, action) =>
      produce(state, (draft) => {
        draft.etc = action.payload.etc;
        console.log("기타 담기", action.payload.etc);
      }),
  },
  initialState
);

const actionCreators = {
  getPolicyDB,
  workDB,
  houseLifeDB,
  healthDB,
  eduCareDB,
  safetyRightDB,
  etcDB,
};

export { actionCreators };
