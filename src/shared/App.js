import React from "react";
import { Route } from "react-router-dom";
import { history } from "../redux/configureStore";
import { ConnectedRouter } from "connected-react-router";

import Login from "../pages/Login";
import LoginLaw from "../pages/LoginLaw";

import OAuthRedirect from "../components/OAuthRedirect";

import AddInfo from "../pages/AddInfo";
import Main from "../pages/Main";
import Search from "../pages/Search";

import Detail from "../pages/Detail";
import Mypage from "../pages/Mypage";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Footer from "../components/Footer";

function App() {
  return (
    <React.Fragment>
      {/* <Header></Header> */}

      <ConnectedRouter history={history}>
        <Route path="/" exact component={Login} />
        <Route path="/law" exact component={LoginLaw} />

        <Route path="/api/users/kakao/callback" exact component={OAuthRedirect}></Route>

        <Route path="/addinfo" exact component={AddInfo} />
        <Route path="/main" exact component={Main} />

        <Route path="/search" exact component={Search} />

        <Route path="/detail/:id" exact component={Detail} />
        <Route path="/header" exact component={Header} />
        <Route path="/footer" exact component={Footer} />
        <Route path="/modal" exact component={Modal} />
        <Route path="/mypage" exact component={Mypage} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
