import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { deleteContentDB, editContentDB } from "../redux/modules/guestBook";

const FeedBtn = (props) => {
  const dispatch = useDispatch();
  const [display, toggleDisplay] = useState(true);
  const [_content, _setContent] = useState("");
  const content = _content;
  const Feed_Card = props.Feed_Card;

  const [textLength, setTextLength] = useState(0);
  const checkLength = (e) => {
    let inputLength = e.target.value.length;

    if (inputLength >= 500) {
      window.alert("500자 이상 작성해주세요.");
      return;
    }
    setTextLength(inputLength);
  };

  return (
    <div>
      <ContentTitle>
        <div
          style={{
            display: "flex",
          }}
        >
          <CardProfile src={props.profileUrl} />
          <CardName>{props.nickname}</CardName>
          <ContentCreateAt>{props.date}</ContentCreateAt>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <EditBtn
            key={props.feedId}
            onClick={() => {
              toggleDisplay(!display);
            }}
          >
            수정
          </EditBtn>
          <DeleteBtn onClick={() => dispatch(deleteContentDB(props.feedId))}>
            삭제
          </DeleteBtn>
        </div>
      </ContentTitle>
      {display === true ? (
        <CardDesc>{props.content}</CardDesc>
      ) : (
        <ContentDesc>
          <ContentInput
            maxLength="500"
            placeholder="내용을 입력해주세요"
            defaultValue={props.content}
            onChange={(e) => {
              _setContent(e.target.value);
              checkLength(e);
            }}
          ></ContentInput>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 20px 0 0",
            }}
          >
            <div
              style={{ marginRight: "10px", cursor: "pointer" }}
              onClick={() => (
                dispatch(editContentDB(props.feedId, content)),
                toggleDisplay(true)
              )}
            >
              수정하기
            </div>
            <text>
              <text style={{ color: "#0361FB" }}>{textLength}</text> / 500
            </text>
          </div>
        </ContentDesc>
      )}
    </div>
  );
};

export default FeedBtn;

const ContentTitle = styled.div`
  display: flex;
  width: 1130px;
  height: 40px;
  line-height: 40px;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CardProfile = styled.img`
  flex: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const CardName = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #000000;
  margin: 0 10px;
`;

const ContentCreateAt = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #999999;
  margin-right: 10px;
`;

const EditBtn = styled.div`
  width: 39px;
  height: 25px;
  background: #e8e8e8;
  border-radius: 4px;
  line-height: 25px;
  font-size: 12px;
  font-weight: 700;
  color: #999999;
  cursor: pointer;
  &:hover {
    background-color: #0361fb;
    color: white;
  }
`;

const DeleteBtn = styled.div`
  width: 39px;
  height: 25px;
  margin: 0 20px;
  background: #e8e8e8;
  border-radius: 4px;
  line-height: 25px;
  font-size: 12px;
  font-weight: 700;
  color: #999999;
  cursor: pointer;
  &:hover {
    background-color: #0361fb;
    color: white;
  }
`;

const _CardDesc = styled.div`
  width: 1104px;
  height: max-content;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
`;
const CardDesc = styled.div`
  width: 1104px;
  height: max-content;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
`;

const Report = styled.text`
  width: 44px;
  height: 28px;
  height: max-content;
  font-size: 16px;
  font-weight: 500;
  color: #999999;
  cursor: pointer;
`;

const ContentDesc = styled.div`
  display: flex;
  height: 200px;
  flex-direction: column;
`;

const ContentInput = styled.textarea`
  width: 1101px;
  height: 103px;
  border-radius: 10px;
  color: #666666;
  font-weight: 400;
  font-size: 16px;
  padding: 15px;
  background-color: #ffffff;
  border-color: #999999;
  outline-color: #666666;
  ::placeholder {
    color: #999999;
  }
`;
