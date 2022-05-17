import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import SearchCard from "../components/SearchCard";
import SearchResultCard from "../components/SearchResultCard";

import { actionCreators as categoryActions } from "../redux/modules/category";
import { actionCreators as searchActions } from "../redux/modules/search";

import { RiArrowDownSLine } from "react-icons/ri";

const Search = () => {

  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const policy_list = useSelector((state) => state.category);
  const search_list = useSelector((state) => state.search.list);
  const searchList = search_list?.searchList;
  //const allCnt = policy_list?.policyList.length;
  const [clearList, setClearList] = useState("");

  const [openSelect, setOpenSelect] = useState(false);

  const [category, setCategory] = useState("전체");
  const [searchCategory, setSearchCategory] = useState("전체");

  const [searchContent, setSearchContent] = useState("");

  const [clear, setClear] = useState(false);

  const selectCategory = (value) => {
    setCategory(value);
    setOpenSelect(true);
    setClear(true);
  };

  const selectSearchCategory = (e) => {
    setSearchCategory(e.target.value);
  };

  const handleSearchContent = (e) => {
    setSearchContent(e.target.value);

    // if(!e.target.value){
    //    //window.location.reload();
    //   //dispatch(categoryActions.getPolicyDB(userId));
    //   //setClearList("클리어");
    // } 
  };

  const handleEvent = (e) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key !== "Enter" || !searchContent) {
      return;
    }

    dispatch(
      searchActions.addSearchDB(searchContent, searchCategory)
    );
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(categoryActions.getPolicyDB(userId));

  }, []);

  return (
    <Container>
      <SearchContainer>
        <SearchBox>
          {/* <BiSearchAlt size="20px" color="#999999" /> */}
          <select
            onChange={(e) => {
              selectSearchCategory(e);
            }}
          >
            <option value="전체">전체</option>
            <option value="정책분야">정책분야</option>
            <option value="정책명">정책명</option>
            <option value="내용">내용</option>
          </select>
          <input
            placeholder="검색어 입력 (ex. 청년, 주거...)"
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

          {/* {!searchContent ? (
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
          )} */}
      </SearchContainer>

      {/* 검색 리스트 */}
      {search_list?.length === 0 || !search_list || !searchContent? (
        <>
          <SelectBox>
            <RebalanceWrap
              onClick={() => {
                setOpenSelect(true);
                if (openSelect === true) {
                  setOpenSelect(false);
                }
              }}
            >
              {
                <RebalanceCont>
                  {category}
                  <RiArrowDownSLine />
                </RebalanceCont>
              }
              {openSelect && (
                <RebalanceSelect>
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
            <SearchCard policyList={policy_list} category={category} clear={clear}/>
          </Box>
        </>
      ) : (
        <>
          <SelectBox>
            <RebalanceWrap
              onClick={() => {
                setOpenSelect(true);
                if (openSelect === true) {
                  setOpenSelect(false);
                }
              }}
            >
              {
                <RebalanceCont>
                  {category}
                  <RiArrowDownSLine />
                </RebalanceCont>
              }
              {openSelect && (
                <RebalanceSelect>
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
            <SearchResultCard clearList={clearList} searchList={searchList} category={category} clear={clear}/>
          </Box> 
          
        </>
      )}
    </Container>
  );
};

export default Search;

const Container = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  min-height: 100%;

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
  margin-bottom : 82px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: rgba(114,168,254,0.1);
  transparent : 10%;
  height : 297px;
  margin-bottom: 99px;

  input {
    margin-left: 10px;
    width: 776px;
    border: none;
    height: 68px;
    border-radius: 10px;
    padding: 0 0 0 10px;
    background-color: #FFFFFF;
    color: #666666;
    font-weight: 700;
    font-size: 15px;
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
  margin-left : 30px;
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
    width: 80px;
    border: none;
    height: 60px;
    font-size: 15px;
    background: transparent;
    border-radius: 10px;
    font-weight: 500;
    color: #666666;
    font-weight : 700;
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
  width: 200px;
  height: 48px;
  background-color: white;
  border-radius: 5px;
  margin: 0 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);

  &:hover {
    cursor: pointer;
  }
`;

const RebalanceCont = styled.p`
  padding: 0 10px;
  font-size: 15px;
  font-weight: 400;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RebalanceSelect = styled.ul`
  padding: 4px 0px;
  position: absolute;
  top: 35px;
  display: flex;
  flex-direction: column;
  width: 200px;
  font-size: var(--font-main);
  font-weight: 400;
  border: 2px solid var(--secondary-color);
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);

  height: 300px;
  z-index: 3000;
`;

const SelectItem = styled.li`
  width: 200px;
  height: 35px;
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
  margin-bottom: 10px;

  &:hover {
    font-weight: 600;
    color: var(--primary-color);
    background-color: var(--secondary-color);
  }
`;
