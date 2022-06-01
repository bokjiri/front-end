import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/axios";
import Swal from "sweetalert2";

const ADD_SEARCH = "ADD_INFO";
const CLEAR_LIST = "CLEAR_LIST";

const initialState = {
  list: [],
};

const addSearch = createAction(ADD_SEARCH, (item) => ({ item }));
const clearList = createAction(CLEAR_LIST, () => ({}));

const addSearchDB = (searchContent, searchCategory) => {
  return function (dispatch, { history }) {
    apis
      .searchAdd(searchContent, searchCategory)
      .then((res) => {
        if(res.data.message === "정책 키워드를 확인해 주세요"){
          Swal.fire({
            text: "검색 결과가 없습니다!",
            confirmButtonColor: "#72A8FE",
          });
          return;
        
        }else if(res.data.message === "특문-공백"){
          Swal.fire({
            text: "검색 결과가 없습니다!",
            confirmButtonColor: "#72A8FE",
          });
          return;
        }else {
          dispatch(addSearch(res.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export default handleActions(
  {
    [ADD_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.item;
      }),
    [CLEAR_LIST]: (state, action) =>
      produce(state, (draft) => {
        return initialState;
      }),
  },
  initialState
);

const actionCreators = {
  addSearch,
  addSearchDB,
  clearList,
};

export { actionCreators };
