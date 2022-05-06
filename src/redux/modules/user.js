// import { createAction, handleActions } from "redux-actions";
// import { produce } from "immer";
// import Cookies from "universal-cookie";
// const cookies = new Cookies();


// /////////////////////////////////**로그아웃 & 회원탈퇴 **

// //1. Action
// const LOG_OUT = "LOG_OUT";


// //3. Action Creator
// const logOut = createAction(LOG_OUT, (user)=>({user}));



// //2. 초기값 지정
// const initialState = {
//     user : null,
//     is_login : false,
// };



// const logoutFB = () => {
//     return function (dispatch, getState, {history}){
//         signOut(auth).then(()=>{
//             dispatch(logOut());
//             history.replace('/');
//         })
//     }
// }


// //4.Reducer
// export default handleActions({
    
//     [LOG_OUT]: (state, action) => produce(state, (draft)=>{
//         deleteCookie("is_login");
//         draft.user = null;
//         draft.is_login = false;
//     }),

// },
//  initialState
// );

// const actionCreators = {
//     // logIn,
//     // loginAction,
//     logOut,
//     getUser,
//     logoutFB,
// }

// export { actionCreators };



