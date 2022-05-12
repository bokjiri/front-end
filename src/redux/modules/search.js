import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/axios";

const ADD_SEARCH = "ADD_INFO";

const initialState = {
  list: [],
};

const addSearch = createAction(ADD_SEARCH, (item) => ({ item }));

const addSearchDB = (searchContent, searchCategory) => {
  //console.log(searchContent, searchCategory);
  return function (dispatch, { history }) {
    apis
      .searchAdd(searchContent, searchCategory)
      .then((res) => {
        console.log(res);
        dispatch(addSearch(res.data));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
};

export default handleActions(
  {
    [ADD_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.item;
      }),
  },
  initialState
);

const actionCreators = {
  addSearch,
  addSearchDB,
};

export { actionCreators };
