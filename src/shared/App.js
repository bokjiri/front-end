import React from "react";
import { Route } from "react-router-dom";
import { history } from "../redux/configureStore";
import { ConnectedRouter } from "connected-react-router";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import Login from "../pages/Login";
import LoginLaw from "../pages/LoginLaw";

import OAuthRedirect from "../components/OAuthRedirect";

import AddInfo from "../pages/AddInfo";
import ModifyInfo from "../pages/ModifyInfo";
import Main from "../pages/Main";
import Search from "../pages/Search";

import Detail from "../pages/Detail";
import Mypage from "../pages/Mypage";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Footer from "../components/Footer";

import Map from "../pages/Map";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userActions.loginCheck());
  }, []);

  return (
    <React.Fragment>
      <Header />

      <ConnectedRouter history={history}>
        <Route path="/test" exact component={Map} />

        <Route path="/" exact component={Login} />
        <Route path="/law" exact component={LoginLaw} />

        <Route
          path="/api/users/kakao/callback"
          exact
          component={OAuthRedirect}
        ></Route>
        <Route path="/search" exact component={Search} />
        <Route path="/addinfo" exact component={AddInfo} />
        <Route path="/modifyinfo" exact component={ModifyInfo} />

        <Route path="/main" exact component={Main} />
        <Route path="/main/:category" exact component={Main} />
        <Route path="/detail/:dataId" exact component={Detail} />
        <Route path="/modal" exact component={Modal} />
        <Route path="/mypage" exact component={Mypage} />

        <Footer />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
