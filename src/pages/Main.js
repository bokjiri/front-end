import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import MainCard2 from "../components/MainCard2";

import { actionCreators as categoryActions } from "../redux/modules/category";
import { actionCreators as searchActions } from "../redux/modules/search";
import { actionCreators as infoActions } from "../redux/modules/info";

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
    "π μΌμλ¦¬",
    "π  μ£Όκ±° λ° μΌμμν",
    "πͺπ» κ±΄κ°",
    "πͺ κ΅μ‘ λ° λλ΄",
    "β μμ  λ° κΆμ΅λ³΄μ₯",
    "κΈ°ν",
  ]);

  const [txt, setTxt] = useState("");
  const [click, setClick] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(infoActions.getInfoDB(userId));
    dispatch(categoryActions.getPolicyDB(userId));
    if (categoryName === "π μΌμλ¦¬") {
      dispatch(categoryActions.workDB(userId));
    } else if (categoryName === "π  μ£Όκ±° λ° μΌμμν") {
      dispatch(categoryActions.houseLifeDB(userId));
    } else if (categoryName === "πͺπ» κ±΄κ°") {
      dispatch(categoryActions.healthDB(userId));
    } else if (categoryName === "πͺ κ΅μ‘ λ° λλ΄") {
      dispatch(categoryActions.eduCareDB(userId));
    } else if (categoryName === "β μμ  λ° κΆμ΅λ³΄μ₯") {
      dispatch(categoryActions.safetyRightDB(userId));
    } else if (categoryName === "κΈ°ν") {
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

    dispatch(searchActions.addSearchDB(txt, "ν΅ν©κ²μ"));
    apis
      .searchAdd(txt, "ν΅ν©κ²μ")
      .then((res) => {
        history.push({
          pathname: `/search`,
          state: {
            txt: txt,
            category: "ν΅ν©κ²μ",
            searchList: res.data.searchList,
          },
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const ClickEvent = (e) => {
    dispatch(searchActions.addSearchDB(txt, "ν΅ν©κ²μ"));
    apis
      .searchAdd(txt, "ν΅ν©κ²μ")
      .then((res) => {
        history.push({
          pathname: `/search`,
          state: {
            txt: txt,
            category: "ν΅ν©κ²μ",
            searchList: res.data.searchList,
          },
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  if (cookies.get("userToken")) {
    return (
      <Container>
        <SearchContainer>
          <SearchText>π μ΄λ€ μ μ±μ μ°ΎμΌμΈμ?</SearchText>

          <SearchButton>
            <SearchBox>
              <input
                type="text"
                spellCheck={false}
                placeholder="κ²μμ΄λ₯Ό μλ ₯νμΈμ! (ex. μ²­λ, μ£Όκ±°)"
                onChange={onInput}
                onKeyPress={handleEvent}
              />
            </SearchBox>
            {!txt ? (
              <SearchBtn disabled={true}>κ²μ</SearchBtn>
            ) : (
              <SearchBtn onClick={ClickEvent}>κ²μ</SearchBtn>
            )}
          </SearchButton>
        </SearchContainer>
        <MypolicyCheck>λμκ² λ§λ μ μ±μ νμΈν΄λ³΄μΈμ!</MypolicyCheck>
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
            μ μ²΄
          </button>
          {category.map((table, index) => (
            <button
              key={index}
              onClick={() => {
                setClick(false);
                history.push(`/main/${table}`);
                if (table === "π μΌμλ¦¬") {
                  dispatch(categoryActions.workDB(userId));
                } else if (table === "π  μ£Όκ±° λ° μΌμμν") {
                  dispatch(categoryActions.houseLifeDB(userId));
                } else if (table === "πͺπ» κ±΄κ°") {
                  dispatch(categoryActions.healthDB(userId));
                } else if (table === "πͺ κ΅μ‘ λ° λλ΄") {
                  dispatch(categoryActions.eduCareDB(userId));
                } else if (table === "β μμ  λ° κΆμ΅λ³΄μ₯") {
                  dispatch(categoryActions.safetyRightDB(userId));
                } else if (table === "κΈ°ν") {
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

        <MynewsCheck>μλ‘μ΄ λ³΅μ§ λ΄μ€λ₯Ό νμΈν΄λ³΄μΈμ!</MynewsCheck>
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

  img {
    width: 581px;
    height: 184px;
  }

  img:last-child {
    cursor: pointer;
    margin-left: 30px;
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
