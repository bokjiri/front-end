import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text } from "../elements";
import { history } from "../redux/configureStore";

import Pagination from "./Pagination";

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
    if(props.clear === true) {
      setPage(1);
    }
  }, [props]);

  
  return (
    <>
      {listCard?.slice(offset, offset + limit).map((item, idx) => {
        return (
          <React.Fragment key={idx}>
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
              <Text margin="5px 0 10px 18px" bold size="20px">
                {item.name}
              </Text>
              <Summary>{item.summary}</Summary>
            </Container>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 150px;
  margin-bottom: 40px;
  justify-content: center;

  background-color: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    cursor : pointer;
  }
`;

const Category = styled.div`
  text-align: center;
  width: min-content;
  padding: 5px;
  height: 20px;
  font-size: 12px;
  margin: 0 0 10px 20px;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  color: white;
  font-weight: 700;
`;

const Summary = styled.div`
  font-size: 15px;
  margin: 0 0 0 18px;
  padding: 0 15px 0 0;
`;
