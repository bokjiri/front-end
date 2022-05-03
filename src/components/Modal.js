import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { actionCreators as postActions } from "../redux/modules/post";

import "../css/modal.css";
import styled from "styled-components";
import { Text, Grid, Input, Button } from "../elements/index";
import { useDispatch } from "react-redux";

const Modal = (props) => {
  const dispatch = useDispatch();
  // const userCode = getCookie("userCode");
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const history = useHistory();
  const { open, close } = props;
  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <Grid is_flex>
            <main
              style={{
                flexDirection: "column",
                display: "flex",
                border: "1px solid red",
                width: "40vw",
                padding: "100px",
                backgroundColor: "#eeeeee",
              }}
            >
              <h3>맞지 않는 정책이 있다면 알려주세요!!</h3>
              <InputTitle
                placeholder="제목을 입력하세요.."
                onChange={(e) => {
                  setTitle(e.target.value);
                  console.log(title);
                }}
              />
              <textarea
                placeholder="내용을 입력하세요.."
                rows="20"
                onChange={(e) => {
                  setContent(e.target.value);
                  console.log(content);
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div onClick={close}>취소</div>
                <button
                  onClick={() => dispatch(postActions.addBugFB(title, content))}
                >
                  등록하기
                </button>
              </div>
            </main>
          </Grid>
        ) : null}
      </div>
    </>
  );
};

export default Modal;

const InputTitle = styled.input`
  width: 39vw;
`;
