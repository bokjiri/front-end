import styled from "styled-components";

import useSWR from "swr";
import Loader from "../elements/Loader";
import { NewsFetcher } from "../shared/Fetcher";

const NewsCard = () => {

  const { data, error } = useSWR(`/api/news/`, NewsFetcher);

  if (error) {
    return <div>서비스 점검 중입니다.!!</div>;
  }
  if (!data) {
    return <Loader type="spin" color="#72A8FE" message={"Loading"} />;
  }
  return (
    <Container>
      {data.newsList.map((x, idx) => (
        <NewsBox
          key={idx}
          onClick={() => {
            window.open(x.link);
          }}
        >
          <ListBox>
            <NewsImg src={x.image} />
            <NewsView>
              <NewsHead>{x.title}</NewsHead>
              <NewsDesc>{x.desc}</NewsDesc>
            </NewsView>

            <NewsCreateAt>{x.date}</NewsCreateAt>
          </ListBox>
        </NewsBox>
      ))}
    </Container>
  );
};

export default NewsCard;

const Container = styled.div`
  width: 1280px;
  height: 940px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 100px;
  margin-left: 40px;
`;

const ListBox = styled.div`
  /* &:hover {
    background: #ffffff;
    color: #0361fb;
  } */
`;

const NewsBox = styled.div`
  align-items: center;
  width: 276px;
  height: 396px;
  cursor: pointer;
  margin-right: 30px;
  margin-bottom: 30px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
  /* &:hover {
    background: #ffffff;
    color: #0361fb;
  } */
`;

const NewsImg = styled.img`
  width: 276px;
  height: 198px;
  margin-bottom: 20px;
  margin: 0;
  border-radius: 16px 16px 0px 0px;
`;

const NewsView = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  &:hover {
    background: #ffffff;
    color: #0361fb;
  }
`;

const NewsHead = styled.h5`
  width: 236px;
  height: 60px;
  font-weight: bold;
  font-size: 20px;
  line-height: 28.96px;
  margin: 10px 0 3px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const NewsDesc = styled.div`
  width: 236px;
  height: 69px;
  overflow: hidden;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 23.17px;
  font-size: 16px;
  color: #666666;

  /* margin-bottom: 10px; */
`;

const NewsCreateAt = styled.div`
  width: max-content;
  font-size: 14px;
  line-height: 20.27px;
  color: #999999;
  font-weight: 400;
  text-align: right;
  float: right;
  margin-right: 20px;
`;
