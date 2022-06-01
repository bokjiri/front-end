import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text } from "../elements";
import { history } from "../redux/configureStore";

import Pagination from "./Pagination";

import Job from "../imgs/Job.png";
import Health from "../imgs/Health.png";
import Safe from "../imgs/Safe.png";
import Home from "../imgs/Home.png";
import Edu from "../imgs/Edu.png";
import Etc from "../imgs/Etc.png";

const SearchCard = (props) => {
  const list = props.policyList.policyList;

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  let listCard = list.filter((data) => {
    if (props.category === "전체") {
      return data;
    }
    if (props.category === data.desire) {
      return data;
    }
  });

  useEffect(() => {
    if (props.clear === true) {
      setPage(1);
    }
  }, [props]);

  return (
    <>
      {listCard?.slice(offset, offset + limit).map((item, idx) => {
        return (
          <React.Fragment key={idx}>
            <Outter>
              {item.desire === "일자리" ? (
                <img src={Job} />
              ) : item.desire === "주거 및 일상생활" ? (
                <img src={Home} />
              ) : item.desire === "건강" ? (
                <img src={Health} />
              ) : item.desire === "교육 및 돌봄" ? (
                <img src={Edu} />
              ) : item.desire === "안전 및 권익보장" ? (
                <img src={Safe} />
              ) : item.desire === "기타" ? (
                <img src={Etc} />
              ) : null}
              <Container
                onClick={() => {
                  history.push(`/detail/${item.dataId}`);
                }}
              >
                <Category
                  color={
                    item.desire === "일자리"
                      ? "#7FAAEE"
                      : item.desire === "주거 및 일상생활"
                      ? "#EE5D58"
                      : item.desire === "건강"
                      ? "#6DCDC7"
                      : item.desire === "교육 및 돌봄"
                      ? "#FF98B7"
                      : item.desire === "안전 및 권익보장"
                      ? "#FFA95A"
                      : item.desire === "기타"
                      ? "#A397EF"
                      : null
                  }
                >
                  {item.desire}
                </Category>

                <Text
                  margin="5px 0 10px 25px"
                  bold
                  size="20px"
                  cursor="pointer"
                >
                  {item.name}
                </Text>
                <Summary>{item.summary}</Summary>
              </Container>
            </Outter>
          </React.Fragment>
        );
      })}

      <Pagination
        total={listCard.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default SearchCard;

const Outter = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  margin-bottom: 40px;
  justify-content: center;

  background-color: white;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);

  border-radius: 10px;

  img {
    width: 144px;
    height: 144px;
    margin-top: 4px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 860px;
  height: 150px;
  margin-bottom: 40px;

  justify-content: center;

  background-color: white;

  border-radius: 10px;

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Category = styled.div`
  text-align: center;
  width: min-content;
  padding: 5px;
  height: 20px;
  font-size: 12px;
  margin: 0 0 10px 25px;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  color: white;
  font-weight: 700;
`;

const Summary = styled.div`
  font-size: 15px;
  margin: 0 0 0 25px;
  padding: 0 15px 0 0;
`;
