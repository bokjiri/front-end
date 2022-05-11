import React, { useEffect, useRef, useState } from "react";
import post, { actionCreators as bookActions } from "../redux/modules/bookMark";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Text } from "../elements/index";
import { ReactIcon } from "../Icons/Icon";
import ShareIcon from "@mui/icons-material/Share";
import { actionCreators as categoryActions } from "../redux/modules/category";

import { history } from "../redux/configureStore";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

// import "../css/mainCard.css";

// import required modules
import { Grid, Pagination } from "swiper";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { HistoryOutlined } from "@mui/icons-material";

export default function MainCard(props) {
  console.log(props);
  const categoryName = props.categoryName;
  //카테고리
  const policy_list = useSelector((state) => state.category.policyList);
  const work = useSelector((state) => state.category.work);
  const houseLife = useSelector((state) => state.category.houseLife);
  const health = useSelector((state) => state.category.health);
  const eduCare = useSelector((state) => state.category.eduCare);
  const safetyRight = useSelector((state) => state.category.safetyRight);
  const etc = useSelector((state) => state.category.etc);
  useEffect(() => {
    dispatch(categoryActions.workDB(userId));
    dispatch(categoryActions.houseLifeDB(userId));
    dispatch(categoryActions.healthDB(userId));
    dispatch(categoryActions.eduCareDB(userId));
    dispatch(categoryActions.safetyRightDB(userId));
    dispatch(categoryActions.etcDB(userId));
  }, []);

  const userId = localStorage.getItem("userId");
  console.log("maincard의", props);
  const dataId = 41;
  const history = useHistory();
  const dispatch = useDispatch();
  const isPc = useMediaQuery({
    query: "(min-width:767px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  return (
    <>
      {isPc && (
        <Container>
          <Swiper
            slidesPerView={3}
            grid={{
              rows: 2,
            }}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Grid, Pagination]}
            className="mySwiper"
            // breakpoints={{
            //   400: {
            //     slidesPerView: 1,
            //   },
            // }}
          >
            {/* map */}
            {categoryName === "전체"
              ? policy_list.map((x, idx) => {
                  return (
                    <SwiperSlide>
                      <CardBox
                        key={idx}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          history.push(`/detail/${x.dataId}`);
                        }}
                      >
                        <div>{x.desire}</div>
                        <Text>{x.name}</Text>
                        <span>{x.target}</span>
                      </CardBox>
                    </SwiperSlide>
                  );
                })
              : categoryName === "📄 일자리"
              ? work.map((x, idx) => {
                  return (
                    <SwiperSlide>
                      <CardBox key={idx}>
                        <Text>{x.obstacle}</Text>
                        <span
                          onClick={() => {
                            history.push(`/detail/${x.dataId}`);
                          }}
                        >
                          {x.target}
                        </span>
                      </CardBox>
                    </SwiperSlide>
                  );
                })
              : categoryName === "🏠 주거 및 일상생활"
              ? houseLife.map((x, idx) => {
                  return (
                    <SwiperSlide>
                      <CardBox key={idx}>
                        <Text>{x.obstacle}</Text>
                        <span
                          onClick={() => {
                            history.push(`/detail/${x.dataId}`);
                          }}
                        >
                          {x.target}
                        </span>
                      </CardBox>
                    </SwiperSlide>
                  );
                })
              : categoryName === "💪🏻 건강"
              ? health.map((x, idx) => {
                  return (
                    <SwiperSlide>
                      <CardBox key={idx}>
                        <Text>{x.obstacle}</Text>
                        <span
                          onClick={() => {
                            history.push(`/detail/${x.dataId}`);
                          }}
                        >
                          {x.target}
                        </span>
                      </CardBox>
                    </SwiperSlide>
                  );
                })
              : categoryName === "👪 교육 및 돌봄"
              ? eduCare.map((x, idx) => {
                  return (
                    <SwiperSlide>
                      <CardBox key={idx}>
                        <Text>{x.obstacle}</Text>
                        <span
                          onClick={() => {
                            history.push(`/detail/${x.dataId}`);
                          }}
                        >
                          {x.target}
                        </span>
                      </CardBox>
                    </SwiperSlide>
                  );
                })
              : categoryName === "⛑ 안전 및 권익보장"
              ? safetyRight.map((x, idx) => {
                  return (
                    <SwiperSlide>
                      <CardBox key={idx}>
                        <Text>{x.obstacle}</Text>
                        <span
                          onClick={() => {
                            history.push(`/detail/${x.dataId}`);
                          }}
                        >
                          {x.target}
                        </span>
                      </CardBox>
                    </SwiperSlide>
                  );
                })
              : categoryName === "기타"
              ? etc.map((x, idx) => {
                  return (
                    <SwiperSlide>
                      <CardBox key={idx}>
                        <Text>{x.obstacle}</Text>
                        <span
                          onClick={() => {
                            history.push(`/detail/${x.dataId}`);
                          }}
                        >
                          {x.target}
                        </span>
                      </CardBox>
                    </SwiperSlide>
                  );
                })
              : null}
          </Swiper>
        </Container>
      )}

      {isMobile && (
        <Container>
          <Swiper
            slidesPerView={1}
            grid={{
              rows: 2,
            }}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Grid, Pagination]}
            className="mySwiper"
          >
            {/* map */}
            <SwiperSlide>
              <CardBox>
                <Text>맞춤 정책 제목1</Text>
                <span>간략내용1</span>
              </CardBox>
            </SwiperSlide>
            <SwiperSlide
              onClick={() => {
                history.push("/login");
              }}
            >
              맞춤 정책 2
            </SwiperSlide>
            <SwiperSlide>맞춤 정책 3</SwiperSlide>
            <SwiperSlide>맞춤 정책 4</SwiperSlide>
            <SwiperSlide>맞춤 정책 5</SwiperSlide>
            <SwiperSlide>맞춤 정책 6</SwiperSlide>
            <SwiperSlide>맞춤 정책 7</SwiperSlide>
            <SwiperSlide>맞춤 정책 8</SwiperSlide>
            <SwiperSlide>맞춤 정책 9</SwiperSlide>
            <SwiperSlide>맞춤 정책 10</SwiperSlide>
          </Swiper>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  padding: 10px;
`;

// const MobileContainer = styled.div`

//   width : 360px;
//     display : flex;
//     flex-direction : column;
//     justify-content : center;
//     align-items : center;

//     background: #eee;
//     font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
//     font-size: 14px;
//     color: #000;
//     padding: 10px;
// `;

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
`;
