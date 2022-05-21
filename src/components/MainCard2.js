import React, { useState } from "react";
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

  const work_length = work.length;
  const houseLife_length = houseLife.length;
  const CategoryLength = () => {
    if (categoryName === "일자리") {
      Number({ work_length });
    } else if (categoryName === "🏠 주거 및 일상생활") {
      Number({ houseLife_length });
    }
  };

  const [swiperRef, setSwiperRef] = useState(null);

  const [slides, setSlides] = useState(
    Array.from({ length: 500 }).map((_, index) => `Slide ${index + 1}`)
  );

  const slideTo = (index) => {
    swiperRef.slideTo(index - 1, 0);
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          margin: "0 0 1350px 1100px",
          zIndex: "2",
          fontWeight: "700",
          fontSize: "16px",
          color: "#666666",
          cursor: "pointer",
        }}
      >
        전체보기 ({CategoryLength})
      </div>
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
        {categoryName === "📄 일자리"
          ? work.map((x, index) => (
              <SwiperSlide
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`/detail/${x.dataId}`);
                }}
              >
                <Container>
                  <PolicyDesire
                    style={{
                      backgroundColor:
                        `${x.desire}` === "일자리" ? "#7FAAEE" : null,
                    }}
                  >
                    {x.desire}
                  </PolicyDesire>
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
                  <PolicyDesire
                    style={{
                      backgroundColor:
                        `${x.desire}` === "주거 및 일상생활" ? "#EE5D58" : null,
                    }}
                  >
                    {x.desire}
                  </PolicyDesire>
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
                  <PolicyDesire
                    style={{
                      backgroundColor:
                        `${x.desire}` === "건강" ? "#6DCDC7" : null,
                    }}
                  >
                    {x.desire}
                  </PolicyDesire>
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
                  <PolicyDesire
                    style={{
                      backgroundColor:
                        `${x.desire}` === "교육 및 돌봄" ? "#FF98B7" : null,
                    }}
                  >
                    {x.desire}
                  </PolicyDesire>
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
                  <PolicyDesire
                    style={{
                      backgroundColor:
                        `${x.desire}` === "안전 및 권익보장" ? "#FFA95A" : null,
                    }}
                  >
                    {x.desire}
                  </PolicyDesire>
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
                  <PolicyDesire
                    style={{
                      backgroundColor:
                        `${x.desire}` === "기타" ? "#A397EF" : null,
                    }}
                  >
                    {x.desire}
                  </PolicyDesire>
                  <PolicyName>{x.name}</PolicyName>
                  <PolicySummary>{x.summary}</PolicySummary>
                </Container>
              </SwiperSlide>
            ))
          : policy_list.map((x, index) => (
              <SwiperSlide
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`/detail/${x.dataId}`);
                }}
              >
                <Container>
                  <PolicyDesire
                    style={{
                      backgroundColor:
                        `${x.desire}` === "일자리"
                          ? "#7FAAEE"
                          : null || `${x.desire}` === "주거 및 일상생활"
                          ? "#EE5D58"
                          : null || `${x.desire}` === "건강"
                          ? "#6DCDC7"
                          : null || `${x.desire}` === "교육 및 돌봄"
                          ? "#FF98B7"
                          : null || `${x.desire}` === "안전 및 권익보장"
                          ? "#FFA95A"
                          : null || `${x.desire}` === "기타"
                          ? "#A397EF"
                          : null,
                    }}
                  >
                    {x.desire}
                  </PolicyDesire>
                  <PolicyName>{x.name}</PolicyName>
                  <PolicySummary>{x.summary}</PolicySummary>
                </Container>
              </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 100%;
  margin-top: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const PolicyDesire = styled.div`
  text-align: center;
  width: max-content;
  max-width: 100px;
  padding: 5px;
  font-size: 12px;
  margin: 15px 0 10px 20px;
  background-color: #6dcdc7;
  border-radius: 5px;
  color: white;
  font-weight: 700;
`;

const PolicyName = styled.div`
  max-width: 100%;
  font-weight: 700;
  font-size: 18px;
  line-height: 34px;
  height: 58px;

  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  margin: 0 10px 10px 20px;
  padding: 0 10px 10px 0;
`;

const PolicySummary = styled.div`
  text-align: left;
  font-size: 15px;
  margin: 0px 20px 10px 20px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
