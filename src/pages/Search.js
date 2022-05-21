import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import SearchCard from "../components/SearchCard";
import SearchResultCard from "../components/SearchResultCard";

import { actionCreators as categoryActions } from "../redux/modules/category";
import { actionCreators as searchActions } from "../redux/modules/search";

import { RiArrowDownSLine } from "react-icons/ri";
import { Grid } from "../elements";

import DndShop from "../components/DndShop";

const Search = (data) => {
  const txt = data.location.state?.txt;

  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const policy_list = useSelector((state) => state.category);
  const search_list = useSelector((state) => state.search.list);

  const searchList = search_list?.searchList;

  const [clearList, setClearList] = useState("");

  const [openSearchSelect, setOpenSearchSelect] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);

  const [searchCategory, setSearchCategory] = useState("통합검색");
  const [category, setCategory] = useState("전체");

  const [searchContent, setSearchContent] = useState(txt);

  const [clear, setClear] = useState(false);

  //click
  const wrapperRef = useRef();
  const __wrapperRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", __handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", __handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      setOpenSearchSelect(false);
    } else {
      setOpenSearchSelect(true);
    }
  };

  const __handleClickOutside = (event) => {
    if (__wrapperRef && !__wrapperRef.current.contains(event.target)) {
      setOpenSelect(false);
    } else {
      setOpenSelect(true);
    }
  };

  const selectTopCategory = (value) => {
    setSearchCategory(value);
    setOpenSearchSelect(true);
    setClear(true);
  };

  const selectCategory = (value) => {
    setCategory(value);
    setOpenSelect(true);
    setClear(true);
  };

  const handleSearchContent = (e) => {
    setSearchContent(e.target.value);

    if (!e.target.value) {
      return dispatch(searchActions.clearList());
    }
  };

  const handleEvent = (e) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key !== "Enter" || !searchContent) {
      return;
    }
    dispatch(searchActions.addSearchDB(searchContent, searchCategory));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(categoryActions.getPolicyDB(userId));

    return () => {
      dispatch(searchActions.clearList());
    };
  }, [dispatch]);

  return (
    <Container>
      <SearchContainer>
        <SearchBox>
          <TopSelectBox>
            <TopRebalanceWrap ref={wrapperRef}>
              {
                <TopRebalanceCont>
                  {searchCategory}
                  <RiArrowDownSLine />
                </TopRebalanceCont>
              }
              {openSearchSelect && (
                <TopRebalanceSelect
                  onClick={() => {
                    setOpenSearchSelect(true);
                    if (openSearchSelect === true) {
                      setOpenSearchSelect(false);
                    }
                  }}
                >
                  <TopSelectItem onClick={() => selectTopCategory("통합검색")}>
                    통합검색
                  </TopSelectItem>
                  <TopSelectItem onClick={() => selectTopCategory("정책분야")}>
                    정책분야
                  </TopSelectItem>
                  <TopSelectItem onClick={() => selectTopCategory("정책명")}>
                    정책명
                  </TopSelectItem>
                  <TopSelectItem onClick={() => selectTopCategory("내용")}>
                    내용
                  </TopSelectItem>
                </TopRebalanceSelect>
              )}
            </TopRebalanceWrap>
          </TopSelectBox>

          <input
            defaultValue={txt ? txt : null}
            placeholder="검색어를 입력하세요! (ex. 청년, 주거)"
            onChange={handleSearchContent}
            onKeyDown={handleEvent}
            spellCheck={false}
          ></input>
          {!searchContent ? (
            <SearchButton disabled={true}>검색</SearchButton>
          ) : (
            <SearchButton
              onClick={(e) => {
                dispatch(
                  searchActions.addSearchDB(searchContent, searchCategory)
                );
              }}
            >
              검색
            </SearchButton>
          )}
        </SearchBox>
      </SearchContainer>

      {/* 검색 리스트 */}
      {search_list?.length === 0 || !search_list || !searchContent ? (
        <>
          <SelectBox>
            <RebalanceWrap ref={__wrapperRef}>
              {/* ref={__wrapperRef} */}
              {
                <RebalanceCont>
                  {category}
                  <RiArrowDownSLine />
                </RebalanceCont>
              }
              {openSelect && (
                <RebalanceSelect
                  onClick={() => {
                    setOpenSelect(true);
                    if (openSelect === true) {
                      setOpenSelect(false);
                    }
                  }}
                >
                  <SelectItem onClick={() => selectCategory("전체")}>
                    전체
                  </SelectItem>
                  <SelectItem onClick={() => selectCategory("일자리")}>
                    일자리
                  </SelectItem>
                  <SelectItem
                    onClick={() => selectCategory("주거 및 일상생활")}
                  >
                    주거 및 일상생활
                  </SelectItem>
                  <SelectItem onClick={() => selectCategory("건강")}>
                    건강
                  </SelectItem>
                  <SelectItem onClick={() => selectCategory("교육 및 돌봄")}>
                    교육 및 돌봄
                  </SelectItem>
                  <SelectItem
                    onClick={() => selectCategory("안전 및 권익보장")}
                  >
                    안전 및 권익보장
                  </SelectItem>
                  <SelectItem onClick={() => selectCategory("기타")}>
                    기타
                  </SelectItem>
                </RebalanceSelect>
              )}
            </RebalanceWrap>
          </SelectBox>

          <Box>
            <SearchCard
              policyList={policy_list}
              category={category}
              clear={clear}
            />
          </Box>
        </>
      ) : searchList ? (
        <>
          <SelectBox>
            <RebalanceWrap ref={__wrapperRef}>
              {
                <RebalanceCont>
                  {category}
                  <RiArrowDownSLine />
                </RebalanceCont>
              }
              {openSelect && (
                <RebalanceSelect
                  onClick={() => {
                    setOpenSelect(true);
                    if (openSelect === true) {
                      setOpenSelect(false);
                    }
                  }}
                >
                  <SelectItem onClick={() => selectCategory("전체")}>
                    전체
                  </SelectItem>
                  <SelectItem onClick={() => selectCategory("일자리")}>
                    일자리
                  </SelectItem>
                  <SelectItem
                    onClick={() => selectCategory("주거 및 일상생활")}
                  >
                    주거 및 일상생활
                  </SelectItem>
                  <SelectItem onClick={() => selectCategory("건강")}>
                    건강
                  </SelectItem>
                  <SelectItem onClick={() => selectCategory("교육 및 돌봄")}>
                    교육 및 돌봄
                  </SelectItem>
                  <SelectItem
                    onClick={() => selectCategory("안전 및 권익보장")}
                  >
                    안전 및 권익보장
                  </SelectItem>
                  <SelectItem onClick={() => selectCategory("기타")}>
                    기타
                  </SelectItem>
                </RebalanceSelect>
              )}
            </RebalanceWrap>
          </SelectBox>

          <Box>
            <SearchResultCard
              clearList={clearList}
              searchList={searchList}
              category={category}
              clear={clear}
            />
          </Box>
        </>
      ) : null}

      <DndShop userId={userId} />
    </Container>
  );
};

export default Search;

const Container = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const Box = styled.div`
  width: 1024px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 82px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: rgba(114, 168, 254, 0.1);
  transparent: 10%;
  height: 297px;
  margin-bottom: 40px;

  input {
    margin-left: 10px;
    width: 776px;
    border: none;
    height: 68px;
    border-radius: 10px;
    padding: 0 0 0 20px;
    background-color: #ffffff;
    color: #666666;
    font-weight: 700;
    font-size: 14px;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
  }

  input:focus {
    outline: none;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SearchButton = styled.button`
  margin-left: 30px;
  width: 174px;
  height: 68px;
  background-color: tomato;
  text-align: center;

  border-radius: 10px;
  border: none;
  background-color: #0361fb;
  color: #ffffff;
  font-weight: 700;
  font-size: 13px;

  &:hover {
    cursor: pointer;
    background-color: #72a8fe;
    color: #ffffff;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SearchBox = styled.div`
  margin-top: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  border-radius: 5px;
  color: white;
  height: 50px;
  font-weight: 700;

  select {
    width: 84px;
    border: none;
    height: 93px;
    font-size: 15px;
    background: transparent;
    border-radius: 10px;
    font-weight: 500;
    color: #666666;
    font-weight: 700;
  }

  select:focus {
    outline: none;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SelectBox = styled.div`
  display: flex;
  width: 1040px;
  margin-top: 30px;
`;

const RebalanceWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 140px;
  height: 48px;
  background-color: transparent;
  border-radius: 5px;
  margin: 0 10px;
  font-size: 14px;

  &:hover {
    cursor: pointer;
  }
`;

const RebalanceCont = styled.p`
  padding: 0 10px;
  font-size: 14px;
  font-weight: 700;
  width: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RebalanceSelect = styled.ul`
  padding: 4px 0px;
  position: absolute;
  top: 30px;
  display: flex;
  flex-direction: column;
  width: 120px;
  font-size: var(--font-main);
  font-weight: 500;
  border: 2px solid var(--secondary-color);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);

  height: 195px;
  z-index: 0;
`;

const SelectItem = styled.li`
  width: 120px;
  height: 24px;
  display: flex;
  align-items: center;
  font-size: var(--font-main);
  font-weight: 400;
  border-bottom: 2px solid var(--secondary-color);
  z-index: 3000;
  cursor: pointer;
  list-style: none;
  text-align: center;
  justify-content: center;
  margin-bottom: 5px;

  &:hover {
    font-weight: 600;
    color: #0361fb;
    background-color: var(--secondary-color);
  }
`;

//////////////////////////

const TopSelectBox = styled.div`
  display: flex;
  width: 84px;
  height: 24px;
  margin-right: 10px;
`;

const TopRebalanceWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 90px;
  height: 24px;
  background-color: transparent;
  border-radius: 5px;
  margin: 0 10px;
  color: black;
  font-size: 14px;

  &:hover {
    cursor: pointer;
  }
`;

const TopRebalanceCont = styled.p`
  padding: 0 10px;
  font-size: 14px;
  font-weight: 700;
  width: 84px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopRebalanceSelect = styled.ul`
  padding: 8px 0;
  position: absolute;
  top: 15px;
  display: flex;
  flex-direction: column;
  width: 84px;
  font-size: 14px;
  font-weight: 500;
  border: 2px solid var(--secondary-color);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);

  height: 117px;
  z-index: 0;
`;

const TopSelectItem = styled.li`
  width: 84px;
  height: 35px;
  display: flex;
  align-items: center;
  font-size: var(--font-main);
  font-weight: 400;
  z-index: 3000;
  cursor: pointer;
  list-style: none;
  text-align: center;
  justify-content: center;
  margin-bottom: 10px;

  &:hover {
    font-weight: 600;
    color: #0361fb;
    background-color: var(--secondary-color);
  }
`;
