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
      <DndBox className="dataId">
        <div>나의 정책 </div>
        <div>
          <CardBox>
            <CateBox>안전 및 권익 보장</CateBox>
            <div>text text text text text text</div>
          </CardBox>
        </div>
      </DndBox>
    </div>
  );
};

export default DndShop;

const DndBox = styled.div`
  position: absolute;
  width: 150px;
  height: 599px;
  right: 0;
  border-radius: 20px 0 0 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  margin-top: 80px;
`;

const CardBox = styled.div`
  width: 120px;
  height: 120px;
  background: rgba(255, 169, 90, 0.5);
  border-radius: 10px;
  margin: 59px 15px 0 15px;
`;

const CateBox = styled.div`
  width: 100px;
  height: 25px;
  border-radius: 4px;
  margin: 10px 10px 0 10px;
  padding: 4px 8px 4px 8px;
  background: #ffffff;
  font-size: 12px;
  font-weight: 700;
  line-height: 17.38px;
  color: #ffa95a;
`;
