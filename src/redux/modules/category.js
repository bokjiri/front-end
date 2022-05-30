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
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.policyGet();
      dispatch(setPolicy(data.dataList.checkedData));
    } catch (err) {
      console.log(err);
    }
  };
export const workDB =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.policyGet();
      dispatch(setWork(data.dataList.work));
    } catch (err) {
      console.log(err);
    }
  };
export const houseLifeDB =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.policyGet();
      dispatch(setHouselife(data.dataList.houseLife));
    } catch (err) {
      console.log(err);
    }
  };
export const healthDB =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.policyGet();
      dispatch(setHealth(data.dataList.health));
    } catch (err) {
      console.log(err);
    }
  };
export const eduCareDB =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.policyGet();
      dispatch(setEducare(data.dataList.eduCare));
    } catch (err) {
      console.log(err);
    }
  };
export const safetyRightDB =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.policyGet();
      dispatch(setSafetyright(data.dataList.safetyRight));
    } catch (err) {
      console.log(err);
    }
  };
export const etcDB =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.policyGet();
      dispatch(setEtc(data.dataList.etc));
    } catch (err) {
      console.log(err);
    }
  };

export default handleActions(
  {
    [SET_POLICY]: (state, action) =>
      produce(state, (draft) => {
        draft.policyList = action.payload.policy_list;
      }),
    [SET_WORK]: (state, action) =>
      produce(state, (draft) => {
        draft.work = action.payload.work;
      }),
    [SET_HOUSELIFE]: (state, action) =>
      produce(state, (draft) => {
        draft.houseLife = action.payload.houseLife;
      }),
    [SET_HEALTH]: (state, action) =>
      produce(state, (draft) => {
        draft.health = action.payload.health;
      }),
    [SET_EDUCARE]: (state, action) =>
      produce(state, (draft) => {
        draft.eduCare = action.payload.eduCare;
      }),
    [SET_SAFETYRIGHT]: (state, action) =>
      produce(state, (draft) => {
        draft.safetyRight = action.payload.safetyRight;
      }),
    [SET_ETC]: (state, action) =>
      produce(state, (draft) => {
        draft.etc = action.payload.etc;
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
