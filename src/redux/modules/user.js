// import { createAction, handleActions } from "redux-actions";
// import { produce } from "immer";
// import { setCookie, deleteCookie } from "../../shared/Cookie"

// import { auth } from "../../shared/firebase";
// import { browserSessionPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";


// //1. Action
// // const LOG_IN = "LOG_IN";
// const LOG_OUT = "LOG_OUT";
// const GET_USER = "GET_USER";
// const SET_USER = "SET_USER"


// //3. Action Creator
// //로그인
// // const logIn = createAction(LOG_IN, (user)=>({user}));
// const logOut = createAction(LOG_OUT, (user)=>({user}));
// const getUser = createAction(GET_USER,(user)=>({user}));
// const setUser = createAction(SET_USER,(user)=>({user}));


// //2. 초기값 지정
// const initialState = {
//     user : null,
//     is_login : false,
// };

// const user_initial = {
//     user_name: "seora",
// }


// const loginFB = (id, pwd) => {
//     return function(dispatch, getState, {history}){

//         setPersistence(auth, browserSessionPersistence)  //세션으로 유지
//         .then((res)=>{
//             signInWithEmailAndPassword(auth, id, pwd)
//             .then((user) => {
    
//             dispatch(setUser({user_name: user.user.displayName, id: id, user_profile:'', uid: user.user.uid}));
//             history.push("/");

//         });
        
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorCode, errorMessage);
//   });
//     }
// }


// const signupFB = (id, pwd, user_name) => {
//     return function(dispatch, getState, {history}){

//         createUserWithEmailAndPassword(auth, id, pwd)
//         .then((user) => {

//         updateProfile(auth.currentUser, {
//             displayName: user_name,
//         }).then(()=>{
//             dispatch(setUser({user_name: user_name, id: id, user_profile:'', uid: user.user.uid}));
//             history.push("/");
//         }).catch((error)=>{
//             console.log(error);
//         });

//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;

//     console.log(errorCode, errorMessage);
//   });


//     }
// }

// //리덕스 로그인 체크
// const loginCheckFB = () => {
//     return function(dispatch, getState, {history}){
//         auth.onAuthStateChanged((user)=>{
//             if(user){
//                 dispatch(setUser({
//                     user_name:user.displayName,
//                     user_profile:"",
//                     id: user.email,
//                     uid: user.uid})
//                 );
//             }else{
//                 dispatch(logOut());
//             }
//         });
//     }
// }

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
//     [SET_USER]: (state, action) => produce(state, (draft)=>{ //immer
//         setCookie("is_login", "success");
//         draft.user = action.payload.user;
//         draft.is_login = true;
//     }),

//     [LOG_OUT]: (state, action) => produce(state, (draft)=>{
//         deleteCookie("is_login");
//         draft.user = null;
//         draft.is_login = false;
//     }),
//     [GET_USER]: (state, action) => produce(state, (draft)=>{}),
// },
//  initialState
// );

// const actionCreators = {
//     // logIn,
//     // loginAction,
//     logOut,
//     getUser,
//     signupFB,
//     loginFB,
//     loginCheckFB,
//     logoutFB,
// }

// export { actionCreators };
