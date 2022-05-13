import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Button } from "../elements/index";
import { history } from "../redux/configureStore";
import { BiSearchAlt } from "react-icons/bi";
import styled from "styled-components";
import MainCard2 from "../components/MainCard2";

import { actionCreators as infoActions } from "../redux/modules/info";
import { actionCreators as categoryActions } from "../redux/modules/category";

import News1 from "../imgs/Banner_News1.png";
import News2 from "../imgs/Banner_News2.png";

import DndShop from "../components/DndShop";

import Cookies from "universal-cookie";
import { useHistory, useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";
const cookies = new Cookies();

const Main = () => {
  const history = useHistory();
  const params = useParams();
  const categoryName = params.category;
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  const info_list = useSelector((state) => state.info.list);
  const policy_list = useSelector((state) => state.category);
  const policyList = useSelector((state) => state.category.policyList);
  const [category, setCategory] = useState([
    "📄 일자리",
    "🏠 주거 및 일상생활",
    "💪🏻 건강",
    "👪 교육 및 돌봄",
    "⛑ 안전 및 권익보장",
    "기타",
  ]);

  useEffect(() => {
    dispatch(infoActions.getInfoDB(userId));
    dispatch(categoryActions.getPolicyDB(userId));
  }, []);

  if (cookies.get("userToken")) {
    return (
      <Container>
        <SearchContainer>
          <SearchText>🔎 어떤 정책을 찾으세요?</SearchText>

          <SearchButton
            onClick={() => {
              history.push("/search");
            }}
          >
            <SearchBox>
              <BiSearchAlt size="20px" style={{ marginLeft: "20px" }} />
              <span>&nbsp;&nbsp;검색어를 입력하세요</span>
            </SearchBox>
            <BoxSearch>검색</BoxSearch>
          </SearchButton>
        </SearchContainer>
        <MypolicyCheck>나에게 맞는 정책을 확인해보세요!</MypolicyCheck>
        <CategoryBox>
          <Button
            backgroundColor="#ffffff"
            box-shadow="0 4px 14px rgba(0,0,0,0.1)"
            color="#999999"
            width="171px"
            radius="10px"
            margin="10px"
            _onClick={() => {
              history.push("/main");
            }}
          >
            전체
          </Button>
          {category.map((table, index) => (
            <Button
              key={index}
              backgroundColor="#ffffff"
              box-shadow="0 4px 14px rgba(0,0,0,0.1)"
              color="#999999"
              width="171px"
              radius="10px"
              margin="10px"
              _onClick={() => {
                history.push(`/main/${table}`);
              }}
            >
              {table}
            </Button>
          ))}
        </CategoryBox>

        <DndShop policyList={policy_list} userId={userId} />
        {/* <MainCard categoryName={categoryName} /> */}
        {/* <div
          onClick={() => {
            history.push("/search");
          }}
        >
          전체보기 >
        </div> */}

        <MainCard2 categoryName={categoryName} policyList={policyList} />

        <BannerBox>
          <img src={News1} alt="banner1" />
          <img src={News2} alt="banner2" />
        </BannerBox>

        <MynewsCheck>새로운 복지 뉴스를 확인해보세요!</MynewsCheck>
        <NewsCard />
      </Container>
    );
  } else {
    history.replace("/");
  }
  return null;
};

export default Main;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const BannerBox = styled.div`
  display: flex;
  margin-top: 100px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
  margin-bottom: 100px;
  width: 100vw;
  height: 297px;
  background: rgba(114, 168, 254, 0.1);

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SearchText = styled.div`
  font-weight: 700;
  font-size: 30px;
  margin-bottom: 20px;
  margin-right: 650px;
`;

const SearchButton = styled.div`
  display: flex;
  /* width: 500px; */

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SearchBox = styled.div`
  text-align: left;
  width: 786px;
  height: 68px;
  line-height: 68px;
  color: #666666;
  font-weight: 700;
  background: #ffffff;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    color: #72a8fe;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const BoxSearch = styled.div`
  margin-left: 30px;
  text-align: center;
  width: 174px;
  height: 68px;
  line-height: 68px;
  background: #0361fb;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  color: white;
  font-size: 14px;
  letter-spacing: 0.0125em;
  cursor: pointer;
`;

const MypolicyCheck = styled.div`
  font-weight: 700;
  font-size: 30px;
  line-height: 49px;
  letter-spacing: 0.0025em;
  margin-right: 800px;
`;

const MynewsCheck = styled.div`
  font-weight: 700;
  font-size: 30px;
  line-height: 49px;
  letter-spacing: 0.0025em;
  margin: 100px 800px 40px 0;
  align-items: flex-start;
`;

const CategoryBox = styled.div`
  background: rgba(114, 168, 254, 0.1);
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
  min-width: 800px;
  &:hover {
    color: #72a8fe;
  }

  @media screen and (max-width: 767px) {
    background: rgba(114, 168, 254, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      width: 100px;
    }
  }
`;
