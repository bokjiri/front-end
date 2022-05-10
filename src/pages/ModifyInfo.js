import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { Text, Grid, Button } from "../elements/index";

import { history } from "../redux/configureStore";

import { actionCreators as infoActions } from "../redux/modules/info";

import { birthYear, birthMonth, birthDate } from "../shared/Validation";
import { apis } from "../shared/axios";

const AddInfo = () => {

  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  let lifeCycle = Number(year + month + date);

  const [obstacle, setObstacle] = useState([]);
  const [gender, setGender] = useState([]);
  const [obstacleYN, setObstacleYN] = useState([]);
  const [city, setCity] = useState("시·도를 선택해 주세요");
  const [town, setTown] = useState("시·군을 선택해 주세요");
  let region = city + " " + town;

  const [scholarship, setScholarship] = useState([]);
  const [job, setJob] = useState([]);
  const [married, setMarried] = useState([]);

  const [target, setTarget] = useState([]);

  const [income, setIncome] = useState("");
  let newIncome = Number(income);

  console.log("생년월일", lifeCycle);
  console.log("성별", gender);
  console.log("주소지", region);
  console.log("장애여부", obstacleYN);
  console.log("장애유형", obstacle);
  console.log("가구유형", target);

  useEffect(() => {
    const fetchData = async () => {
      const result = await apis.infoGet(userId);
      const data = result.data.data;
      console.log(data);

      setYear(data.age.toString().substring(0,4));
      setMonth(data.age.toString().substring(4,6));
      setDate(data.age.toString().substring(6,8));
      setObstacle(data.obstacle);
      setGender(data.gender);
      setObstacleYN(data.disability);
      setObstacle(data.obstacle);
      setTarget(data.target);
      if (data.region[0].split(" ").length > 2) {
        setCity(data.region[0].split(" ")[0]);
        setTown(
          data.region[0].split(" ")[1] +
            " " +
            data.region[0].split(" ")[2] +
            " " +
            data.region[0].split(" ")[3]
        );
      } else {
        setCity(data.region[0].split(" ")[0]);
        setTown(data.region[0].split(" ")[1]);
      }
      setScholarship(data.scholarship);
      setJob(data.job);
      setIncome(data.salary);
      setMarried(data.marriage);

    };
    fetchData();
  }, []);

  const [open_select_city, setOpenSelectCity] = useState(false);
  const [open_select, setOpenSelect] = useState(false);

  const click_city = (value) => {
    // if(value === "-------"){
    //   setCity(value);
    //   setOpenSelectCity(false);
    // }
    setTown("시·군을 선택해 주세요");
    setCity(value);
    setOpenSelectCity(false);
  };

  const click_select = (value) => {
    if (value === null) {
      setTown(" ");
    } else {
      setTown(value);
      setOpenSelect(false);
    }
  };

  const infoYear = (e) => {
    setYear(e.target.value);
  };

  const infoMonth = (e) => {
    setMonth(e.target.value);
  };

  const infoDate = (e) => {
    setDate(e.target.value);
  };

  const CreateObstacle = (e, item) => {
    let newObstacle = obstacle.findIndex((i) => i === item);

    if (newObstacle === -1) {
      setObstacle([...obstacle, item]);
    } else {
      setObstacle(obstacle.filter((o) => o !== item));
    }
    return;
  };

  const CreateTarget = (e, item) => {
    console.log(item);
    let newTarget = target.findIndex((i) => i === item);

    if (newTarget === -1) {
      setTarget([...target, item]);
    } else {
      setTarget(target.filter((t) => t !== item));
    }

    return;
  };

  const CreateGender = (e, item) => {
    let newGender = gender.findIndex((i) => i === item);

    if (newGender === -1) {
      setGender([item]);
    } else {
      setGender(gender.filter((g) => g !== item));
    }
    return;
  };

  const CreateObstacleYN = (e, item) => {
    let newYN = obstacleYN.findIndex((i) => i === item);

    if (newYN === -1) {
      setObstacleYN([item]);
    } else {
      setObstacleYN(obstacleYN.filter((yn) => yn !== item));
    }

    if (item === "없음") {
      setObstacle([]);
    }

    return;
  };

  const CreateScholarship = (e, item) => {
    let newscholarship = scholarship.findIndex((i) => i === item);

    if (newscholarship === -1) {
      setScholarship([item]);
    } else {
      setScholarship(scholarship.filter((g) => g !== item));
    }
    return;
  };

  const CreateJob = (e, item) => {
    let newJob = job.findIndex((i) => i === item);

    if (newJob === -1) {
      setJob([item]);
    } else {
      setJob(job.filter((g) => g !== item));
    }
    return;
  };

  const Createmarried = (e, item) => {
    let newMarried = married.findIndex((i) => i === item);

    if (newMarried === -1) {
      setMarried([item]);
    } else {
      setMarried(married.filter((g) => g !== item));
    }
    return;
  };

  const CreateIncome = (e) => {
    setIncome(e.target.value);
  };

  const categoryList = {
    // lifeCycle: [
    //   "영유아",
    //   "아동",
    //   "청소년",
    //   "청년",
    //   "중장년",
    //   "노년",
    //   "임신·출산",
    // ],

    //성별
    gender: ["여성", "남성"],

    //장애여부
    obstacleYN: ["있음", "없음"],

    //장애유형
    obstacle: [
      "지체(전환대상)",
      "지체(상지절단)",
      "지체(하지절단)",
      "지체(상지관절)",
      "지체(하지관절)",
      "지체(상지기능)",
      "지체(하지기능)",
      "지체(척추)",
      "지체(변형)",
      "시각",
      "청각(전환대상)",
      "청각(청력)",
      "청각(평형기능)",
      "언어",
      "지적장애",
      "뇌병변",
      "자폐성장애",
      "정신",
      "신장",
      "심장",
      "호흡기",
      "간",
      "안면",
      "장루·요루",
      "뇌전증",
      "기타",
    ],

    //학력
    scholarship: [
      "고등학교 졸업 미만",
      "고등학교 졸업",
      "대학(원) 재학",
      "대학(원) 휴학",
      "대학(원) 졸업",
    ],

    //취업 여부
    job : [
      "미취업",
      "취업"
    ],

    //결혼 여부
    married : [
      "미혼",
      "기혼",
      "이혼"
    ],

    //가구 유형
    target: [
      "다북화·탈북민",
      "다자녀",
      "보훈대상자",
      "임신·출산",
      "한부모·조손",
    ],

    //주소(시.도)
    city: [
      "-------",
      "강원도",
      "경기도",
      "경상남도",
      "경상북도",
      "광주광역시",
      "대구광역시",
      "대전광역시",
      "부산광역시",
      "서울특별시",
      "세종특별자치시",
      "울산광역시",
      "인천광역시",
      "전라남도",
      "전라북도",
      "제주특별자치도",
      "충청남도",
      "충청북도",
    ],

    //서울특별시
    seoul: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],

    //울산광역시
    ulsan: ["중구", "남구", "동구", "북구", "울주군"],

    //광주광역시
    gwangju: ["광산구", "북구", "서구", "남구", "동구"],

    //인천광역시
    incheon: [
      "강화군",
      "옹진군",
      "중구",
      "서구",
      "계양구",
      "부평구",
      "중구",
      "동구",
      "남구",
      "연수구",
      "남동구",
    ],

    //부산광역시
    busan: [
      "중구",
      "서구",
      "동구",
      "영도구",
      "부산진구",
      "동래구",
      "남구",
      "북구",
      "강서구",
      "해운대구",
      "사하구",
      "금정구",
      "연제구",
      "수영구",
      "사상구",
      "기장군",
    ],

    //대구광역시
    daegu: [
      "중구",
      "동구",
      "서구",
      "남구",
      "북구",
      "수성구",
      "달서구",
      "달성군",
    ],

    //대전광역시
    daejeon: ["동구", "중구", "서구", "유성구", "대덕구"],

    //강원도
    town1: [
      "강릉시",
      "고성군",
      "동해시",
      "삼척시",
      "속초시",
      "양구군",
      "양양군",
      "영월군",
      "원주시",
      "인제군",
      "정선군",
      "철원군",
      "춘천시",
      "태백시",
      "평창군",
      "홍천군",
      "화천군",
      "횡성군",
    ],

    //경기도
    town2: [
      "가평군",
      "고양시",
      "과천시",
      "광명시",
      "광주시",
      "구리시",
      "군포시",
      "김포시",
      "남양주시",
      "동두천시",
      "부천시",
      "성남시",
      "수원시",
      "시흥시",
      "안산시",
      "안성시",
      "안양시",
      "양주시",
      "양평군",
      "여주시",
      "연천군",
      "오산시",
      "용인시",
      "의왕시",
      "의정부시",
      "이천시",
      "파주시",
      "평택시",
      "포천시",
      "하남시",
      "화성시",
    ],

    //경상남도
    town3: [
      "거제시",
      "거창군",
      "고성군",
      "김해시",
      "남해군",
      "밀양시",
      "사천시",
      "산청군",
      "양산시",
      "의령군",
      "진주시",
      "창녕군",
      "창원시",
      "통영시",
      "하동군",
      "함안군",
      "함양군",
      "합천군",
    ],

    //경상북도
    town4: [
      "경산시",
      "경주시",
      "고령군",
      "구미시",
      "군위군",
      "김천시",
      "문경시",
      "봉화군",
      "상주시",
      "성주군",
      "안동시",
      "영덕군",
      "영양군",
      "영주시",
      "영천시",
      "예천군",
      "울릉군",
      "울진군",
      "의성군",
      "청도군",
      "청송군",
      "칠곡군",
      "포항시",
    ],

    //전라남도
    town5: [
      "강진군",
      "고흥군",
      "곡성군",
      "광양시",
      "구례군",
      "나주시",
      "담양군",
      "목포시",
      "무안군",
      "보성군",
      "순천시",
      "신안군",
      "여수시",
      "영광군",
      "영암군",
      "완도군",
      "장성군",
      "장흥군",
      "진도군",
      "함평군",
      "해남군",
      "화순군",
    ],

    //전라북도
    town6: [
      "고창군",
      "군산시",
      "김제시",
      "남원시",
      "무주군",
      "부안군",
      "순창군",
      "완주군",
      "익산시",
      "임실군",
      "장수군",
      "전주시",
      "정읍시",
      "진안군",
    ],

    //제주특별자치도
    town7: ["서귀포시", "제주시"],

    //충청남도
    town8: [
      "계룡시",
      "공주시",
      "금산군",
      "논산시",
      "당진시",
      "보령시",
      "부여군",
      "서산시",
      "서천군",
      "아산시",
      "예산군",
      "천안시",
      "청양군",
      "태안군",
      "홍성군",
    ],

    //충청북도
    town9: [
      "괴산군",
      "단양군",
      "보은군",
      "영동군",
      "옥천군",
      "음성군",
      "제천시",
      "증평군",
      "진천군",
      "청주시",
      "충주시",
    ],
  };

  return (
    <MainWrap>
      <TextBox>✏️ 정보를 입력해 주세요!</TextBox>

      <Container>
        <Grid>
          <Text size="20px" bold margin="20px 8px">
            생년월일
          </Text>
          <TextEnd>*필수 선택</TextEnd>
          <CategoryBox>
            <input
              placeholder="년"
              onChange={infoYear}
              maxLength="4"
              defaultValue={year}
            ></input>
            <input
              onChange={infoMonth}
              placeholder="월"
              maxLength="2"
              className="middle"
              defaultValue={month}
            ></input>
            <input
              placeholder="일"
              onChange={infoDate}
              maxLength="2"
              defaultValue={date}
            ></input>

            {!year ? null : !birthYear(year) ? (
              <Grid is_flex>
                <ValidationBox style={{ color: "#ED6451" }}>
                  생년은 19YY, 20YY 형식으로 작성해 주세요.
                </ValidationBox>
              </Grid>
            ) : null}

            {!month ? null : !birthMonth(month) ? (
              <Grid is_flex>
                <ValidationBox style={{ color: "#ED6451" }}>
                  월은 MM 형식으로 작성해 주세요.
                </ValidationBox>
              </Grid>
            ) : null}

            {!date ? null : !birthDate(date) ? (
              <Grid is_flex>
                <ValidationBox style={{ color: "#ED6451" }}>
                  일은 DD 형식으로 작성해 주세요.
                </ValidationBox>
              </Grid>
            ) : null}
          </CategoryBox>

          <Text size="20px" bold margin="40px 0 8px 8px">
            성별
          </Text>
          <CategoryBox>
            {Object.entries(categoryList.gender).map((item, idx) => {
              return (
                <Btn
                  width="378px"
                  key={idx}
                  color={
                    gender?.findIndex((i) => i === item[1]) === -1
                      ? "#E8E8E8"
                      : "#0361FB"
                  }
                  value={item[0]}
                  onClick={(e) => {
                    CreateGender(e, item[1]);
                  }}
                >
                  {item[1]}
                </Btn>
              );
            })}
          </CategoryBox>

          <Text size="20px" bold margin="40px 0 8px 8px">
            주소지
          </Text>
          <CategoryBox>
            <RebalanceWrap
              onClick={() => {
                setOpenSelectCity(!open_select_city);
              }}
            >
              {<RebalanceCont>{city}</RebalanceCont>}
              {open_select_city && (
                <RebalanceSelect>
                  {Object.entries(categoryList.city).map((item, idx) => {
                    return (
                      <SelectItem
                        key={idx}
                        onClick={() => click_city(item[1])}
                        value={city}
                      >
                        {item[1]}
                      </SelectItem>
                    );
                  })}
                </RebalanceSelect>
              )}
            </RebalanceWrap>

            <RebalanceWrap
              onClick={() => {
                setOpenSelect(!open_select);
              }}
            >
              <RebalanceCont>{town}</RebalanceCont>
              {city === "-------" ? null : null}

              {city === "강원도"
                ? open_select && (
                    <RebalanceSelect>
                      {Object.entries(categoryList.town1).map((item, idx) => {
                        return (
                          <SelectItem
                            key={idx}
                            onClick={() => click_select(item[1])}
                            value={town}
                          >
                            {item[1]}
                          </SelectItem>
                        );
                      })}
                    </RebalanceSelect>
                  )
                : null}
              {city === "경기도"
                ? open_select && (
                    <RebalanceSelect>
                      {Object.entries(categoryList.town2).map((item, idx) => {
                        return (
                          <SelectItem
                            key={idx}
                            onClick={() => click_select(item[1])}
                            value={town}
                          >
                            {item[1]}
                          </SelectItem>
                        );
                      })}
                    </RebalanceSelect>
                  )
                : null}
              {city === "경상남도"
                ? open_select && (
                    <RebalanceSelect>
                      {Object.entries(categoryList.town3).map((item, idx) => {
                        return (
                          <SelectItem
                            key={idx}
                            onClick={() => click_select(item[1])}
                            value={town}
                          >
                            {item[1]}
                          </SelectItem>
                        );
                      })}
                    </RebalanceSelect>
                  )
                : null}
              {city === "경상북도"
                ? open_select && (
                    <RebalanceSelect>
                      {Object.entries(categoryList.town4).map((item, idx) => {
                        return (
                          <SelectItem
                            key={idx}
                            onClick={() => click_select(item[1])}
                            value={town}
                          >
                            {item[1]}
                          </SelectItem>
                        );
                      })}
                    </RebalanceSelect>
                  )
                : null}
              {city === "광주광역시"
                ? open_select && (
                    <RebalanceSelect>
                      {Object.entries(categoryList.gwangju).map((item, idx) => {
                        return (
                          <SelectItem
                            key={idx}
                            onClick={() => click_select(item[1])}
                            value={town}
                          >
                            {item[1]}
                          </SelectItem>
                        );
                      })}
                    </RebalanceSelect>
                  )
                : null}
              {city === "대구광역시"
                ? open_select && (
                    <RebalanceSelect>
                      {Object.entries(categoryList.daegu).map((item, idx) => {
                        return (
                          <SelectItem
                            key={idx}
                            onClick={() => click_select(item[1])}
                            value={town}
                          >
                            {item[1]}
                          </SelectItem>
                        );
                      })}
                    </RebalanceSelect>
                  )
                : null}
              {city === "대전광역시"
                ? open_select && (
                    <RebalanceSelect>
                      {Object.entries(categoryList.daejeon).map((item, idx) => {
                        return (
                          <SelectItem
                            key={idx}
                            onClick={() => click_select(item[1])}
                            value={town}
                          >
                            {item[1]}
                          </SelectItem>
                        );
                      })}
                    </RebalanceSelect>
                  )
                : null}
              {city === "부산광역시"
                ? open_select && (
                    <RebalanceSelect>
                      {Object.entries(categoryList.busan).map((item, idx) => {
                        return (
                          <SelectItem
                            key={idx}
                            onClick={() => click_select(item[1])}
                            value={town}
                          >
                            {item[1]}
                          </SelectItem>
                        );
                      })}
                    </RebalanceSelect>
                  )
                : null}
              {city === "서울특별시"
                ? open_select && (
                    <RebalanceSelect>
                      {Object.entries(categoryList.seoul).map((item, idx) => {
                        return (
                          <SelectItem
                            key={idx}
                            onClick={() => click_select(item[1])}
                            value={town}
                          >
                            {item[1]}
                          </SelectItem>
                        );
                      })}
                    </RebalanceSelect>
                  )
                : null}
              {city === "세종특별자치시" ? null : null}
              {city === "울산광역시"
                ? open_select && (
                    <RebalanceSelect>
                      {Object.entries(categoryList.ulsan).map((item, idx) => {
                        return (
                          <SelectItem
                            key={idx}
                            onClick={() => click_select(item[1])}
                            value={town}
                          >
                            {item[1]}
                          </SelectItem>
                        );
                      })}
                    </RebalanceSelect>
                  )
                : null}
              {city === "인천광역시"
                ? open_select && (
                    <RebalanceSelect>
                      {Object.entries(categoryList.incheon).map((item, idx) => {
                        return (
                          <SelectItem
                            key={idx}
                            onClick={() => click_select(item[1])}
                            value={town}
                          >
                            {item[1]}
                          </SelectItem>
                        );
                      })}
                    </RebalanceSelect>
                  )
                : null}
              {city === "전라남도"
                ? open_select && (
                    <RebalanceSelect>
                      {Object.entries(categoryList.town5).map((item, idx) => {
                        return (
                          <SelectItem
                            key={idx}
                            onClick={() => click_select(item[1])}
                            value={town}
                          >
                            {item[1]}
                          </SelectItem>
                        );
                      })}
                    </RebalanceSelect>
                  )
                : null}
              {city === "전라북도"
                ? open_select && (
                    <RebalanceSelect>
                      {Object.entries(categoryList.town6).map((item, idx) => {
                        return (
                          <SelectItem
                            key={idx}
                            onClick={() => click_select(item[1])}
                            value={town}
                          >
                            {item[1]}
                          </SelectItem>
                        );
                      })}
                    </RebalanceSelect>
                  )
                : null}
              {city === "제주특별자치도"
                ? open_select && (
                    <RebalanceSelect>
                      {Object.entries(categoryList.town7).map((item, idx) => {
                        return (
                          <SelectItem
                            key={idx}
                            onClick={() => click_select(item[1])}
                            value={town}
                          >
                            {item[1]}
                          </SelectItem>
                        );
                      })}
                    </RebalanceSelect>
                  )
                : null}
              {city === "충청남도"
                ? open_select && (
                    <RebalanceSelect>
                      {Object.entries(categoryList.town8).map((item, idx) => {
                        return (
                          <SelectItem
                            key={idx}
                            onClick={() => click_select(item[1])}
                            value={town}
                          >
                            {item[1]}
                          </SelectItem>
                        );
                      })}
                    </RebalanceSelect>
                  )
                : null}
              {city === "충청북도"
                ? open_select && (
                    <RebalanceSelect>
                      {Object.entries(categoryList.town9).map((item, idx) => {
                        return (
                          <SelectItem
                            key={idx}
                            onClick={() => click_select(item[1])}
                            value={town}
                          >
                            {item[1]}
                          </SelectItem>
                        );
                      })}
                    </RebalanceSelect>
                  )
                : null}
            </RebalanceWrap>
          </CategoryBox>

          <Text size="20px" bold margin="40px 0 8px 8px">
            장애여부
          </Text>
          <TextEnd>*필수 선택</TextEnd>
          <CategoryBox>
            {Object.entries(categoryList.obstacleYN).map((item, idx) => {
              return (
                <Btn
                  width="378px"
                  key={idx}
                  color={
                    obstacleYN.findIndex((i) => i === item[1]) === -1
                      ? "#E8E8E8"
                      : "#0361FB"
                  }
                  value={item[0]}
                  onClick={(e) => {
                    CreateObstacleYN(e, item[1]);
                  }}
                >
                  {item[1]}
                </Btn>
              );
            })}
            {obstacleYN.length === 0 ? (
              <Grid is_flex>
                <ValidationBox style={{ color: "#ED6451" }}>
                  장애여부를 선택해 주세요.
                </ValidationBox>
              </Grid>
            ) : null}
          </CategoryBox>

          <Text size="20px" bold margin="40px 0 8px 8px">
            장애유형
          </Text>

          <CategoryBox>
            {obstacleYN[0] === "있음"
              ? Object.entries(categoryList.obstacle).map((item, idx) => {
                  return (
                    <Btn
                      width="174px"
                      key={idx}
                      color={
                        obstacle.findIndex((i) => i === item[1]) === -1
                          ? "#E8E8E8"
                          : "#0361FB"
                      }
                      value={item[0]}
                      onClick={(e) => {
                        CreateObstacle(e, item[1]);
                      }}
                    >
                      {item[1]}
                    </Btn>
                  );
                })
              : null}
          </CategoryBox>

          <Text size="20px" bold margin="40px 0 8px 8px">
            학력
          </Text>
          <CategoryBox>
            {Object.entries(categoryList.scholarship).map((item, idx) => {
              return (
                <Btn
                  width="174px"
                  key={idx}
                  color={
                    scholarship?.findIndex((i) => i === item[1]) === -1
                      ? "#E8E8E8"
                      : "#0361FB"
                  }
                  value={item[0]}
                  onClick={(e) => {
                    CreateScholarship(e, item[1]);
                  }}
                >
                  {item[1]}
                </Btn>
              );
            })}
          </CategoryBox>

          <Text size="20px" bold margin="40px 0 8px 8px">
            취업 여부
          </Text>
          <CategoryBox>
            {Object.entries(categoryList.job).map((item, idx) => {
              return (
                <Btn
                  width="378px"
                  key={idx}
                  color={
                    job?.findIndex((i) => i === item[1]) === -1
                      ? "#E8E8E8"
                      : "#0361FB"
                  }
                  value={item[0]}
                  onClick={(e) => {
                    CreateJob(e, item[1]);
                  }}
                >
                  {item[1]}
                </Btn>
              );
            })}
          </CategoryBox>

          <Text size="20px" bold margin="40px 0 8px 8px">
            결혼
          </Text>
          <CategoryBox>
            {Object.entries(categoryList.married).map((item, idx) => {
              return (
                <Btn
                  width="244px"
                  key={idx}
                  color={
                    married?.findIndex((i) => i === item[1]) === -1
                      ? "#E8E8E8"
                      : "#0361FB"
                  }
                  value={item[0]}
                  onClick={(e) => {
                    Createmarried(e, item[1]);
                  }}
                >
                  {item[1]}
                </Btn>
              );
            })}
          </CategoryBox>

          <Text size="20px" bold margin="40px 0 8px 8px">
            가구유형
          </Text>
          <CategoryBox>
            {Object.entries(categoryList.target).map((item, idx) => {
              return (
                <Btn
                  width="174px"
                  key={idx}
                  color={
                    target.findIndex((i) => i === item[1]) === -1
                      ? "#E8E8E8"
                      : "#0361FB"
                  }
                  value={item[0]}
                  onClick={(e) => {
                    CreateTarget(e, item[1]);
                  }}
                >
                  {item[1]}
                </Btn>
              );
            })}
          </CategoryBox>

          <Text size="20px" bold margin="20px 8px">
            월 소득
          </Text>
          <TextEnd>*1인 가구 : 개인 월 소득, 2인 이상 가구 : 가구 월 소득</TextEnd>
          <CategoryBox>
            <IncomeInput
              placeholder="만원"
              onChange={CreateIncome}
              maxLength="10"
              defaultValue={income}
            ></IncomeInput>
            </CategoryBox>

        </Grid>
      </Container>

      {obstacleYN.length === 0 ||
      !year ||
      !birthYear(year) ||
      !month ||
      !birthMonth(month) ||
      !date ||
      !birthDate(date) ? (
        <CompleteBtn disabled={true}>완료</CompleteBtn>
      ) : (
        <CompleteBtn
          onClick={() => {
            //console.log("생년월일ㅣㅣㅣㅣㅣ",lifeCycle);
            dispatch(
              infoActions.addInfoDB(
                userId,
                lifeCycle,
                gender,
                region,
                obstacleYN,
                obstacle,
                scholarship,
                job,
                married,
                target,
                newIncome
              )
            );
          }}
        >
          완료
        </CompleteBtn>
      )}
    </MainWrap>
  );
};

export default AddInfo;

const MainWrap = styled.div`
  margin: 150px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
`;

const Container = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin: 20px 10px;
  box-shadow: 0px 0px 10px 0px #dfdfde;
  border-radius: 7px;
  padding: 20px;
`;

const CategoryBox = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: center;

  input {
    width: 225px;
    height: 48px;
    padding: 0 10px 0 5px;
    border-radius: 5px;
    border: 1px solid darkgrey;
    font-weight: 700;
    text-align : right;
  }

  input:focus {
    outline: none;
  }

  input::-webkit-input-placeholder {
    text-align: right;
  }
  input::-moz-placeholder {
    text-align: right;
  }
  input:-ms-input-placeholder {
    text-align: right;
  }
  input:-moz-placeholder {
    text-align: right;
  }
  input::placeholder {
    text-align: right;
  }

  .middle {
    margin: 0 25px;
  }
`;

const Btn = styled.button`
  width: ${(props) => props.width};
  height: 50px;
  margin: 7px 11px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.color};
  color: ${(props) => (props.color === "#0361FB" ? "#FFFFFF" : "#999999")};
  font-weight: 900;

  &:hover {
    cursor: pointer;
    background-color: #72a8fe;
    color: #ffffff;
  }
`;

const CompleteBtn = styled.button`
  width: 175px;
  height: 50px;
  margin: 7px 7px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) =>
    props.disabled === true ? "#ED6451" : "#E8E8E8"};
  color: ${(props) => (props.disabled === true ? "#FFFFFF" : "#999999")};
  font-weight: 900;

  &:hover {
    cursor: pointer;
    background-color: #72a8fe;
    color: #ffffff;
    transparent: 0.8;
  }

  &:focus {
    background-color: #0361fb;
    color: #ffffff;
  }
`;

const IncomeInput = styled.input`
  width: 500px!important;
  margin-bottom : 30px!important;

`;

const TextBox = styled.div`
  width: 100%;
  font-size: 26px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  margin-left: -600px;
`;

const ValidationBox = styled.div`
  width: 98%;
  text-align: right;
  margin-top: 15px;
  font-size: 12px;
  font-weight: 600;
`;

export const RebalanceWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 378px;
  height: 48px;
  border: 1px solid darkgrey;
  border-radius: 5px;
  margin: 0 10px;

  &:hover {
    cursor: pointer;
  }
`;

export const RebalanceCont = styled.p`
  padding-right: 10px;
  font-size: 15px;
  font-weight: 400;
  text-align: right;
  width: 100%;
`;

export const RebalanceSelect = styled.ul`
  padding: 4px 0px;
  position: absolute;
  top: 35px;
  display: flex;
  flex-direction: column;
  width: 378px;
  font-size: var(--font-main);
  font-weight: 400;
  border: 2px solid var(--secondary-color);
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);

  height: 350px;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 3000;
`;

export const SelectItem = styled.li`
  width: 378px;
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

const TextEnd = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 15px;
  font-size: 7px;
  margin-bottom: 5px;
`;