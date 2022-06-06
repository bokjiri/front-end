import { createAction, handleActions } from "redux-actions";
import produce from "immer";

//1. actions
const CONNECT_SOCKET = "chat/SET_SOCKET";
const DISCONNECT_SOCKET = "chat/RESET_SOCKET";
const LOAD_MESSAGES = "chat/LOAD_MESSAGES";
const ADD_MESSAGE = "chat/ADD_MESSAGES";
const RESET_MESSAGES = "chat/RESET_MESSAGES";

//2. initialState
const initialState = {
    socket: null,
    messages: [],
  };

//3. Action Create
const connectSocket = createAction(CONNECT_SOCKET, (socket) => ({ socket }));
const disconnectSocket = createAction(DISCONNECT_SOCKET);
const loadMessages = createAction(LOAD_MESSAGES, (messages) => ({
  messages,
}));
const addMessage = createAction(ADD_MESSAGE, (message) => ({
  message,
}));
const resetMessages = createAction(RESET_MESSAGES);

//5. reducer
export default handleActions(
  {
    [CONNECT_SOCKET]: (state, action) =>
      produce(state, (draft) => {
        draft.socket = action.payload.socket;
      }),
    [DISCONNECT_SOCKET]: (state, action) =>
      produce(state, (draft) => {
        draft.socket = null;
      }),
    [LOAD_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.messages = action.payload.messages;
      }),
    [ADD_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.messages.push(action.payload.message);
      }),
    [RESET_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.messages = [];
      }),
  },
  initialState
);

const actionCreators = {
    connectSocket,
    disconnectSocket,
    loadMessages,
    addMessage,
    resetMessages,
  };
  
export { actionCreators };