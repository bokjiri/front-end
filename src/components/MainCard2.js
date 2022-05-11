import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { actionCreators as categoryActions } from "../redux/modules/category";
import styled from "styled-components";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../css/mainCard2.css";
import { useHistory } from "react-router-dom";

// install Virtual module
SwiperCore.use([Virtual, Navigation, Pagination]);

export default function MainCard2(props) {
  console.log("메인 프롭스", props);
  const categoryName = props.categoryName;
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = localStorage.getItem("userId");

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

  const [swiperRef, setSwiperRef] = useState(null);

  const [slides, setSlides] = useState(
    Array.from({ length: 500 }).map((_, index) => `Slide ${index + 1}`)
  );

  const slideTo = (index) => {
    swiperRef.slideTo(index - 1, 0);
  };

  return (
    <>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        virtual
      >
        {categoryName === "전체"
          ? policy_list.map((x, index) => (
              <SwiperSlide
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`/detail/${x.dataId}`);
                }}
              >
                <Container>
                  <PolicyDesire>{x.desire}</PolicyDesire>
                  <PolicyName>{x.name}</PolicyName>
                  <PolicySummary>{x.summary}</PolicySummary>
                </Container>
              </SwiperSlide>
            ))
          : categoryName === "📄 일자리"
          ? work.map((x, index) => (
              <SwiperSlide
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`/detail/${x.dataId}`);
                }}
              >
                <Container>
                  <PolicyDesire>{x.desire}</PolicyDesire>
                  <PolicyName>{x.name}</PolicyName>
                  <PolicySummary>{x.summary}</PolicySummary>
                </Container>
              </SwiperSlide>
            ))
          : categoryName === "🏠 주거 및 일상생활"
          ? houseLife.map((x, index) => (
              <SwiperSlide
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`/detail/${x.dataId}`);
                }}
              >
                <Container>
                  <PolicyDesire>{x.desire}</PolicyDesire>
                  <PolicyName>{x.name}</PolicyName>
                  <PolicySummary>{x.summary}</PolicySummary>
                </Container>
              </SwiperSlide>
            ))
          : categoryName === "💪🏻 건강"
          ? health.map((x, index) => (
              <SwiperSlide
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`/detail/${x.dataId}`);
                }}
              >
                <Container>
                  <PolicyDesire>{x.desire}</PolicyDesire>
                  <PolicyName>{x.name}</PolicyName>
                  <PolicySummary>{x.summary}</PolicySummary>
                </Container>
              </SwiperSlide>
            ))
          : categoryName === "👪 교육 및 돌봄"
          ? eduCare.map((x, index) => (
              <SwiperSlide
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`/detail/${x.dataId}`);
                }}
              >
                <Container>
                  <PolicyDesire>{x.desire}</PolicyDesire>
                  <PolicyName>{x.name}</PolicyName>
                  <PolicySummary>{x.summary}</PolicySummary>
                </Container>
              </SwiperSlide>
            ))
          : categoryName === "⛑ 안전 및 권익보장"
          ? safetyRight.map((x, index) => (
              <SwiperSlide
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`/detail/${x.dataId}`);
                }}
              >
                <Container>
                  <PolicyDesire>{x.desire}</PolicyDesire>
                  <PolicyName>{x.name}</PolicyName>
                  <PolicySummary>{x.summary}</PolicySummary>
                </Container>
              </SwiperSlide>
            ))
          : categoryName === "기타"
          ? etc.map((x, index) => (
              <SwiperSlide
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`/detail/${x.dataId}`);
                }}
              >
                <Container>
                  <PolicyDesire>{x.desire}</PolicyDesire>
                  <PolicyName>{x.name}</PolicyName>
                  <PolicySummary>{x.summary}</PolicySummary>
                </Container>
              </SwiperSlide>
            ))
          : null}
      </Swiper>
      {/* 
      <p className="append-buttons">
        <button onClick={() => prepend()} className="prepend-2-slides">
          Prepend 2 Slides
        </button>
        <button onClick={() => slideTo(1)} className="prepend-slide">
          Slide 1
        </button>
        <button onClick={() => slideTo(250)} className="slide-250">
          Slide 250
        </button>
        <button onClick={() => slideTo(500)} className="slide-500">
          Slide 500
        </button>
        <button onClick={() => append()} className="append-slides">
          Append Slide
        </button>
      </p> */}
    </>
  );
}

const Container = styled.div`
  margin-bottom: 100px;
`;

const PolicyDesire = styled.div`
  width: 80px;
  height: 25px;
  margin: 4px 8px;
  background: rgba(109, 205, 199, 0.5);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700
  line-height: 17px;
  color: #666666;
`;

const PolicyName = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 35px;
  text-align: left;
`;

const PolicySummary = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  &:hover {
    color: #72a8fe;
  }
`;
