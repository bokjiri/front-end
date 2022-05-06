import Cookies from "universal-cookie";
import axios from "axios";
import { history } from "../redux/configureStore";
axios.defaults.withCredentials = true;

const cookies = new Cookies();

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,

  headers: {
    "content-type": "application/json;charset=UTF-8",
  },
});

//헤더 토큰 request
instance.interceptors.request.use(function (config) {
  const accssToken = cookies.get("userToken");
  const refreshToken = cookies.get("refreshToken");

  config.headers.common["Authorization"] = `Bearer ${accssToken}`;
  config.headers.common["reAuthorization"] = `Bearer ${refreshToken}`;

  return config;
});

//refresh
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
      response,
    } = error;
    const originalRequest = config;

    // 401 에러 발생시 토큰 만료되었을 때,
    if (status === 401) {
      if (response.data.accessToken) {
        // access token이 재발급 된 상태,
        console.log(response);
        cookies.set("userToken", response.data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return axios(originalRequest);
      }

      // if (response.data.reason === "accessToken expired") {
      // }

      if (response.data.reason === "refreshToken expired") {
        console.log(response.data.reason);
        cookies.remove("userToken");
        cookies.remove("refreshToken");
        localStorage.clear();
        history.replace("/");
      }
    }
  }
);

export const apis = {
  kakaoGet: (code) => instance.get(`api/users/kakao/callback?code=${code}`),
  tokenTest: () => instance.get(`api/users/me`),

  userDelete: (userId) => instance.delete(`/api/users/${userId}`),

  infoGet: (userId) => instance.get(`/api/users/${userId}`),
  infoAdd: (userId, lifeCycle, gender, region, disability, obstacle) =>
    instance.put(`/api/users/${userId}`, {
      age: lifeCycle,
      gender: gender,
      region: region,
      disability: disability,
      obstacle: obstacle,
    }),

  policyGet: (userId) => instance.get(`/api/main/${userId}`),

  detailGet: (dataId) => instance.get(`/api/detail/${dataId}`),
  bookGet: (userId) => instance.get(`/api/marks/${userId}`),
  bookAdd: (userId, dataId) =>
    instance.put(`/api/marks/${userId}`, {
      dataId: dataId,
    }),
  bookdelete: (dataId) => instance.delete(`/api/marks/${dataId}`),
  newsGet: () => instance.get(`/api/news/`),

  //   postGet: () => instance.get("/api/posts"),

  //   postOne: (postId) => instance.get(`/api/posts/${postId}`),

  //   postLike: (postId) => instance.post(`/api/${postId}/like`),

  //   addComment: (postId, contents) =>
  //     instance.post(`/api/comments/${postId}`, {contents: contents}),

  //   delComment: (postId) =>
  //   instance.delete(`/api/comments/${postId}`)
};
