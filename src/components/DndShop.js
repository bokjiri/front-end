import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { actionCreators as markActions } from "../redux/modules/bookMark";
import { actionCreators as bookActions } from "../redux/modules/bookMark";

import { ReactIcon } from "../Icons/Icon";

const DndShop = (props) => {
  const [toggle, setToggle] = useState(false);
  const [close, setClose] = useState();
  const dispatch = useDispatch();
  const userId = props.userId;
  const mark_post = useSelector((state) => state.bookMark.marks);
  console.log(mark_post);
  useEffect(() => {
    dispatch(markActions.getBookFB(userId));
  }, []);
  return (
    <div>
      {toggle === true ? (
        <div>
          <DndBox2>
            <CloseToggle
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <ReactIcon.FiChevronRight className="rightToggle" />
            </CloseToggle>
            <Title2>북마크</Title2>
            <CardList2>
              {mark_post.map((x, idx) => (
                <CardBox2
                  key={idx}
                  style={{
                    backgroundColor:
                      `${x.desire}` === "일자리"
                        ? "rgba(127, 170, 238, 0.5)"
                        : null || `${x.desire}` === "주거 및 일상생활"
                        ? "rgba(238, 93, 88, 0.5)"
                        : null || `${x.desire}` === "건강"
                        ? "rgba(109, 205, 199, 0.5)"
                        : null || `${x.desire}` === "교육 및 돌봄"
                        ? "rgba(255, 152, 183, 0.5)"
                        : null || `${x.desire}` === "안전 및 권익보장"
                        ? "rgba(255, 169, 90, 0.5)"
                        : null || `${x.desire}` === "기타"
                        ? "rgba(163, 151, 239, 0.5)"
                        : null,
                  }}
                >
                  <InBox2>
                    <CateBox2>{x.desire}</CateBox2>
                    <DescBox2>{x.name}</DescBox2>
                    <DeleteBtn2
                      onClick={() =>
                        dispatch(bookActions.deleteBookFB(x.dataId))
                      }
                    >
                      ㅡ
                    </DeleteBtn2>
                  </InBox2>
                </CardBox2>
              ))}
            </CardList2>
          </DndBox2>
        </div>
      ) : (
        <DndBox>
          <OpenToggle
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <ReactIcon.FiChevronLeft className="leftToggle" />
          </OpenToggle>
          <Title>북마크</Title>
          <CardList>
            {mark_post.map((x, idx) => (
              <CardBox
                key={idx}
                style={{
                  backgroundColor:
                    `${x.desire}` === "일자리"
                      ? "rgba(127, 170, 238, 0.5)"
                      : null || `${x.desire}` === "주거 및 일상생활"
                      ? "rgba(238, 93, 88, 0.5)"
                      : null || `${x.desire}` === "건강"
                      ? "rgba(109, 205, 199, 0.5)"
                      : null || `${x.desire}` === "교육 및 돌봄"
                      ? "rgba(255, 152, 183, 0.5)"
                      : null || `${x.desire}` === "안전 및 권익보장"
                      ? "rgba(255, 169, 90, 0.5)"
                      : null || `${x.desire}` === "기타"
                      ? "rgba(163, 151, 239, 0.5)"
                      : null,
                }}
              >
                <InBox>
                  <CateBox>{x.desire}</CateBox>
                  <DescBox>{x.name}</DescBox>
                  <DeleteBtn
                    onClick={() => dispatch(bookActions.deleteBookFB(x.dataId))}
                  >
                    ㅡ
                  </DeleteBtn>
                </InBox>
              </CardBox>
            ))}
          </CardList>
        </DndBox>
      )}
    </div>
  );
};

export default DndShop;

const CardList2 = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  width: 300px;
  height: 560px;
  overflow: auto;
`;

const CardList = styled.div`
  width: 160px;
  height: 550px;
  overflow: auto;
`;

const DndBox = styled.div`
  position: fixed;
  width: 150px;
  height: 599px;
  top: 156px;
  right: 0;
  border-radius: 20px 0 0 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  background: #ffffff;
`;

const OpenToggle = styled.div`
  display: inline-block;
  position: absolute;
  cursor: pointer;
  width: 24px;
  height: 48px;
  border-radius: 100px 0 0 100px;
  top: 50%;
  left: -24px;
  background: #ffffff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  line-height: 48px;

  .leftToggle {
    font-size: 25px;
    color: #cccccc;
    font-weight: bold;
    margin: 10px 0 0 3px;
    border-right: none;
  }
`;

const Title = styled.div`
  margin: 15px 0 0 15px;
  color: #666666;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
`;

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 120px;
  height: 120px;
  background: rgba(255, 169, 90, 0.5);
  border-radius: 10px;
  margin: 15px 0 0 15px;
`;

const InBox = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; */
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
  width: 100px;
  height: 51px;
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const DeleteBtn = styled.div`
  border-radius: 50%;
  width: 24px;
  height: 24px;
  background: white;
  color: red;
  font-weight: bold;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
  float: right;
  cursor: pointer;
`;
const DndBox2 = styled.div`
  position: fixed;
  width: 285px;
  height: 610px;
  top: 156px;
  right: 0;
  border-radius: 20px 0 0 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  background: #ffffff;
`;

const CloseToggle = styled.div`
  display: inline-block;
  position: absolute;
  cursor: pointer;
  width: 24px;
  height: 48px;
  border-radius: 100px 0 0 100px;
  top: 50%;
  left: -24px;
  background: #ffffff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  line-height: 48px;

  .rightToggle {
    font-size: 25px;
    color: #cccccc;
    font-weight: bold;
    margin: 10px 0 0 3px;
    border-right: none;
  }
`;

const Title2 = styled.div`
  margin: 15px 0 0 15px;
  color: #666666;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
`;

const CardBox2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 120px;
  height: 120px;
  background: rgba(255, 169, 90, 0.5);
  border-radius: 10px;
  margin: 15px 0 5px 15px;
`;

const InBox2 = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; */
`;

const CateBox2 = styled.div`
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

const DescBox2 = styled.div`
  width: 100px;
  height: 51px;
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const DeleteBtn2 = styled.div`
  border-radius: 50%;
  width: 24px;
  height: 24px;
  background: white;
  color: red;
  font-weight: bold;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
  float: right;
  cursor: pointer;
`;
