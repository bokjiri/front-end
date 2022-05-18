import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import { actionCreators as markActions } from "../redux/modules/bookMark";
import { actionCreators as bookActions } from "../redux/modules/bookMark";
import { actionCreators as postActions } from "../redux/modules/post";

import { ReactIcon } from "../Icons/Icon";
import { ReactComponent as Bookmark_Side_Active } from "../Icons/Bookmark_Side_Active.svg";
import { ReactComponent as SideOpen } from "../Icons/Arrow_Side.svg";
import { ReactComponent as Side_Close } from "../Icons/Side_Close.svg";

const DndShop = (props) => {
  const history = useHistory();
  const [toggle, setToggle] = useState(false);
  const [sideBox, setSideBox] = useState(false);
  const [close, setClose] = useState();
  const dispatch = useDispatch();
  const userId = props.userId;
  const mark_post = useSelector((state) => state.bookMark.marks);
  useEffect(() => {
    dispatch(markActions.getBookFB(userId));
  }, []);
  return (
    <div>
      {sideBox === true ? (
        toggle === true ? (
          <div>
            <CloseToggle
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <ReactIcon.FiChevronRight className="rightToggle" />
            </CloseToggle>
            <DndBox2>
              <div style={{ display: "flex" }}>
                <Title2>
                  북마크{" "}
                  <span style={{ color: "#0361FB", marginLeft: "10px" }}>
                    {mark_post.length}
                  </span>
                </Title2>
              </div>
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
                      <CateBox2
                        style={{
                          color:
                            `${x.desire}` === "일자리"
                              ? "#7faaee"
                              : null || `${x.desire}` === "주거 및 일상생활"
                              ? "#ee5d58"
                              : null || `${x.desire}` === "건강"
                              ? "#6dcdc7"
                              : null || `${x.desire}` === "교육 및 돌봄"
                              ? "#ff98b7"
                              : null || `${x.desire}` === "안전 및 권익보장"
                              ? "#ffa95a"
                              : null || `${x.desire}` === "기타"
                              ? "#a397ef"
                              : null,
                        }}
                      >
                        {x.desire}
                      </CateBox2>
                      <DescBox2
                        onClick={() => history.push(`/detail/${x.dataId}`)}
                      >
                        {x.name}
                      </DescBox2>
                      <Bookmark_Side_Active
                        className="deleteBtn2"
                        onClick={() => {
                          dispatch(bookActions.addBookFB(x.dataId));
                          dispatch(markActions.getBookFB(userId));
                        }}
                      />
                    </InBox2>
                  </CardBox2>
                ))}
              </CardList2>
            </DndBox2>
            <Side_Close
              style={{
                display: "inline-block",
                position: "fixed",
                right: "100px",
                top: "83%",
                zIndex: "100",
                cursor: "pointer",
              }}
              onClick={() => {
                setSideBox(!sideBox);
              }}
            />
          </div>
        ) : (
          <div>
            <OpenToggle
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <ReactIcon.FiChevronLeft className="leftToggle" />
            </OpenToggle>
            <DndBox>
              <Title>
                북마크
                <span style={{ color: "#0361FB", marginLeft: "10px" }}>
                  {mark_post.length}
                </span>
              </Title>
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
                      <CateBox
                        style={{
                          color:
                            `${x.desire}` === "일자리"
                              ? "#7faaee"
                              : null || `${x.desire}` === "주거 및 일상생활"
                              ? "#ee5d58"
                              : null || `${x.desire}` === "건강"
                              ? "#6dcdc7"
                              : null || `${x.desire}` === "교육 및 돌봄"
                              ? "#ff98b7"
                              : null || `${x.desire}` === "안전 및 권익보장"
                              ? "#ffa95a"
                              : null || `${x.desire}` === "기타"
                              ? "#a397ef"
                              : null,
                        }}
                      >
                        {x.desire}
                      </CateBox>
                      <DescBox
                        onClick={() => history.push(`/detail/${x.dataId}`)}
                      >
                        {x.name}
                      </DescBox>
                      <Bookmark_Side_Active
                        className="deleteBtn"
                        onClick={() => {
                          dispatch(bookActions.addBookFB(x.dataId));
                          dispatch(markActions.getBookFB(userId));
                        }}
                      />
                    </InBox>
                  </CardBox>
                ))}
              </CardList>
            </DndBox>
            <Side_Close
              style={{
                display: "inline-block",
                position: "fixed",
                right: "50px",
                top: "82%",
                zIndex: "100",
                cursor: "pointer",
              }}
              onClick={() => {
                setSideBox(!sideBox);
              }}
            />
          </div>
        )
      ) : (
        <SideOpen
          style={{
            position: "fixed",
            right: "0",
            cursor: "pointer",
          }}
          onClick={() => {
            setSideBox(!sideBox);
          }}
        />
      )}
    </div>
  );
};

export default DndShop;

const CardList2 = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 285px;
`;

const CardList = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 160px;
`;

const DndBox = styled.div`
  position: fixed;
  width: 150px;
  height: 599px;
  top: 156px;
  right: 0;
  border-radius: 20px 0 0 20px;
  background: #ffffff;
  z-index: 100;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #cccccc; /* 스크롤바의 색상 */

    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #e8e8e8; /*스크롤바 뒷 배경 색상*/
  }
`;

const OpenToggle = styled.div`
  display: inline-block;
  position: fixed;
  cursor: pointer;
  width: 24px;
  height: 48px;
  border-radius: 100px 0 0 100px;
  top: 50%;
  right: 150px;
  background: #ffffff;
  line-height: 48px;
  z-index: 100;

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
  .deleteBtn {
    border-radius: 50%;
    width: 14px;
    height: 14px;
    background: white;
    padding: 5px;
    font-weight: bold;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
    float: right;
    cursor: pointer;
  }
`;

const CateBox = styled.div`
  width: max-content;
  border-radius: 4px;
  padding: 4px 8px 4px 8px;
  background: #ffffff;
  font-size: 12px;
  font-weight: 700;
  color: #ffa95a;
  margin: 10px 0 5px 0;
`;

const DescBox = styled.div`
  width: 100px;
  height: 51px;
  text-align: left;
  font-weight: 700;
  font-size: 12px;
  line-height: 17.38px;
  color: #666666;
  cursor: pointer;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
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
  background: #ffffff;
  z-index: 100;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #cccccc; /* 스크롤바의 색상 */

    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #e8e8e8; /*스크롤바 뒷 배경 색상*/
  }
`;

const CloseToggle = styled.div`
  display: inline-block;
  position: fixed;
  cursor: pointer;
  width: 24px;
  height: 48px;
  border-radius: 100px 0 0 100px;
  top: 50%;
  right: 285px;
  background: #ffffff;
  line-height: 48px;
  z-index: 100;

  .rightToggle {
    font-size: 25px;
    color: #cccccc;
    font-weight: bold;
    margin: 12px 0 0 5px;
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
  .deleteBtn2 {
    border-radius: 50%;
    width: 14px;
    height: 14px;
    background: white;
    padding: 5px;
    font-weight: bold;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
    float: right;
    cursor: pointer;
  }
`;

const CateBox2 = styled.div`
  width: max-content;
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
  font-weight: 700;
  font-size: 12px;
  line-height: 17.38px;
  color: #666666;
  cursor: pointer;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
