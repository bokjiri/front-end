import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { actionCreators as markActions } from "../redux/modules/bookMark";

const DndShop = (props) => {
  const dispatch = useDispatch();
  const userId = props.userId;
  // const mark_post = useSelector((state) => state);
  // console.log(mark_post);
  useEffect(() => {
    dispatch(markActions.getBookFB(userId));
  }, []);
  return (
    <div>
      <DndBox>
        <div style={{ left: "0" }}>나의 정책 </div>
        <CardBox>
          <InBox>
            <CateBox>안전 및 권익 보장</CateBox>
            <DescBox>text text text text text text</DescBox>
          </InBox>
        </CardBox>
      </DndBox>
    </div>
  );
};

export default DndShop;

const DndBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: fixed;
  width: 150px;
  height: 599px;
  top: 156px;
  right: 0;
  border-radius: 20px 0 0 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  background: #ffffff;
`;

const CardBox = styled.div`
  width: 120px;
  height: 120px;
  background: rgba(255, 169, 90, 0.5);
  border-radius: 10px;
`;

const InBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CateBox = styled.div`
  width: 90px;
  border-radius: 4px;
  padding: 4px 8px 4px 8px;
  background: #ffffff;
  font-size: 12px;
  font-weight: 700;
  line-height: 17.38px;
  color: #ffa95a;
  margin: 10px 0 5px 0;
`;

const DescBox = styled.div`
  border: 1px solid red;
  width: 100px;
  height: 51px;
`;
