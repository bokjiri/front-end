import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Button } from "../elements/index";
import styled from "styled-components";
import MainCard2 from "../components/MainCard2";

import { actionCreators as infoActions } from "../redux/modules/info";
import { actionCreators as categoryActions } from "../redux/modules/category";
import { actionCreators as searchActions } from "../redux/modules/search";

import News1 from "../imgs/Banner_News1.png";
import News2 from "../imgs/Banner_News2.png";

import DndShop from "../components/DndShop";

import Cookies from "universal-cookie";
import { useHistory, useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import { apis } from "../shared/axios";

const cookies = new Cookies();

const Main = () => {
  const history = useHistory();
  const params = useParams();
  const categoryName = params.category;
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

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

  const [txt, setTxt] = useState("");
  const [click, setClick] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(infoActions.getInfoDB(userId));
    dispatch(categoryActions.getPolicyDB(userId));
    if (categoryName === "📄 일자리") {
      dispatch(categoryActions.workDB(userId));
    } else if (categoryName === "🏠 주거 및 일상생활") {
      dispatch(categoryActions.houseLifeDB(userId));
    } else if (categoryName === "💪🏻 건강") {
      dispatch(categoryActions.healthDB(userId));
    } else if (categoryName === "👪 교육 및 돌봄") {
      dispatch(categoryActions.eduCareDB(userId));
    } else if (categoryName === "⛑ 안전 및 권익보장") {
      dispatch(categoryActions.safetyRightDB(userId));
    } else if (categoryName === "기타") {
      dispatch(categoryActions.etcDB(userId));
    }
  }, []);

  const onInput = (e) => {
    setTxt(e.target.value);
  };

  const handleEvent = (e) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key !== "Enter" || !txt) {
      return;
    }

    dispatch(searchActions.addSearchDB(txt, "통합검색"));
    apis
      .searchAdd(txt, "통합검색")
      .then((res) => {
        history.push({
          pathname: `/search`,
          state: {
            txt: txt,
            category: "통합검색",
            searchList: res.data.searchList,
          },
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const ClickEvent = (e) => {
    dispatch(searchActions.addSearchDB(txt, "통합검색"));
    apis
      .searchAdd(txt, "통합검색")
      .then((res) => {
        history.push({
          pathname: `/search`,
          state: {
            txt: txt,
            category: "통합검색",
            searchList: res.data.searchList,
          },
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  if (cookies.get("userToken")) {
    return (
      <Container>
        <SearchContainer>
          <SearchText>🔎 어떤 정책을 찾으세요?</SearchText>

          <SearchButton>
            <SearchBox>
              <input
                type="text"
                spellCheck={false}
                placeholder="검색어를 입력하세요! (ex. 청년, 주거)"
                onChange={onInput}
                onKeyPress={handleEvent}
              />
            </SearchBox>
            {!txt ? (
              <SearchBtn disabled={true}>검색</SearchBtn>
            ) :
             (
              <SearchBtn onClick={ClickEvent}>검색</SearchBtn>
            )} 
          </SearchButton>
        </SearchContainer>
        <MypolicyCheck>나에게 맞는 정책을 확인해보세요!</MypolicyCheck>
        <CategoryBox>
          <button
            style={{
              backgroundColor: click ? "#0361fb" : "#ffffff",
              color: click ? "#ffffff" : "#999999",
              boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.05)",
              width: "153px",
              height: "48px",
              border: "none",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: "700",
              lineHeight: "23.17px",
              margin: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              history.push("/main");
              setClick(!click);
            }}
          >
            전체
          </button>
          {category.map((table, index) => (
            <button
              key={index}
              onClick={() => {
                setClick(false);
                history.push(`/main/${table}`);
                if (table === "📄 일자리") {
                  dispatch(categoryActions.workDB(userId));
                } else if (table === "🏠 주거 및 일상생활") {
                  dispatch(categoryActions.houseLifeDB(userId));
                } else if (table === "💪🏻 건강") {
                  dispatch(categoryActions.healthDB(userId));
                } else if (table === "👪 교육 및 돌봄") {
                  dispatch(categoryActions.eduCareDB(userId));
                } else if (table === "⛑ 안전 및 권익보장") {
                  dispatch(categoryActions.safetyRightDB(userId));
                } else if (table === "기타") {
                  dispatch(categoryActions.etcDB(userId));
                }
              }}
              style={{
                backgroundColor: categoryName === table ? "#0361fb" : "#ffffff",
                color: categoryName === table ? "#ffffff" : "#999999",
                boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.05)",
                width: "153px",
                height: "48px",

                border: "none",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: "700",
                lineHeight: "23.17px",
                margin: "10px",
                cursor: "pointer",
              }}
            >
              {table}
            </button>
          ))}
        </CategoryBox>

        <DndShop policyList={policy_list} userId={userId} />
        
        <MainCard2 categoryName={categoryName} policyList={policyList} />

        <BannerBox>
          <img src={News1} alt="banner1" />
          <img
            src={News2}
            alt="banner2"
            onClick={() => {
              window.open("https://forms.gle/meV9dEsAo9VCZhP17");
            }}
          />
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

  img:last-child {
    cursor: pointer;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
  margin-bottom: 100px;
  width: 100vw;
  height: 227px;
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

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SearchBox = styled.div`
  display: flex;
  text-align: left;
  width: 770px;
  height: 68px;
  color: #666666;
  font-weight: 700;
  background: #ffffff;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  p {
    line-height: 37px;
    color: #999999;
    font-size: 14px;
  }
  &:hover {
    cursor: pointer;
    color: #72a8fe;
  }

  input {
    width: 100%;
    outline: none;
    border: none;
    padding: 0 0 0 20px;
    border-radius: 10px;
    font-weight: 700;
    color: #666666;
    font-size: 14px;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SearchBtn = styled.button`
  margin-left: 30px;
  text-align: center;
  width: 174px;
  height: 68px;
  line-height: 68px;
  background: #0361fb;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  border: none;
`;

const MypolicyCheck = styled.div`
  font-weight: 700;
  font-size: 30px;
  line-height: 49px;
  letter-spacing: 0.0025em;
  margin-right: 760px;
`;

const MynewsCheck = styled.div`
  font-weight: 700;
  font-size: 30px;
  line-height: 49px;
  letter-spacing: 0.0025em;
  margin: 100px 780px 40px 0;
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
