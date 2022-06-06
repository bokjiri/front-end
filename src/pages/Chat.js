import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { actionCreators as chatActions } from "../redux/modules/chat";

import "../css/Chat.css";
import { useDispatch, useSelector } from "react-redux";

import {
  initiateSocket,
  disconnectSocket,
  getMessages,
  subscribeToChat,
  sendMessage,
} from "../shared/__Chat";

const Chat = () => {
  const dispatch = useDispatch();
  const chatScroll = useRef();
  const userId = parseInt(localStorage.getItem("userId"));
  const useMsg = useSelector((state) => state.chat.messages);

  const [chat, setChat] = useState({ userId: userId, message: "" });

  useEffect(() => {
    const setNewSocket = (__socket) =>
      dispatch(chatActions.connectSocket(__socket));

    initiateSocket(setNewSocket);
    getMessages((data) => {
      dispatch(chatActions.loadMessages(data));
    });
  }, []);

  //close
  useEffect(() => {
    return () => {
      disconnectSocket();
      dispatch(chatActions.disconnectSocket);
    };
  }, [dispatch]);

  useEffect(() => {
    chatScroll.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [useMsg, chat]);

  useEffect(() => {
    subscribeToChat((data) => {
      dispatch(chatActions.addMessage(data));
    });
  }, [dispatch]);

  const changeMessage = useCallback(
    (e) => {
      setChat({ userId: userId, message: e.target.value });
    },
    [chat]
  );

  const handleEvent = useCallback(
    (e) => {
      if (e.nativeEvent.isComposing) {
        return;
      }
      if (e.key !== "Enter" || !chat.message) {
        return;
      }
      setChat({ userId: userId, message: "" });
      sendMessage(userId, chat.message);
    },
    [userId, chat, useMsg]
  );

  return (
    <div className="Wrap">
      <TextBox>💭 자유로운 소통 공간</TextBox>
      <div className="Box">
        <div className="ChatBox">
          {useMsg?.map((ele, idx) =>
            ele.userId !== userId ? (
              <div className="Chat" key={idx}>
                <img className="profile" src={ele.profileImg} />
                <div className="nickname">{ele.nickname}</div>
                <div className="ChatLog">{ele.message}</div>
              </div>
            ) : (
              <div className="__Chat" key={idx}>
                <div className="__ChatLog">{ele.message}</div>
                <img className="__profile" src={ele.profileImg} />
              </div>
            )
          )}
          <div ref={chatScroll}></div>
        </div>

        <div className="InputBox">
          <input
            className="MsgInput"
            placeholder="메세지를 입력하세요!"
            onKeyDown={handleEvent}
            value={chat.message}
            spellCheck={false}
            onChange={changeMessage}
          ></input>
          <span className="enter">Enter</span>
        </div>
      </div>
    </div>
  );
};

export default Chat;

const TextBox = styled.div`
  width: 100%;
  font-size: 26px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
