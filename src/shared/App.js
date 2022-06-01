import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { history } from "../redux/configureStore";
import { ConnectedRouter } from "connected-react-router";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import {
  AddInfo,
  Detail,
  Login,
  LoginLaw,
  Main,
  ModifyInfo,
  NotFound,
  Search,
  GuestBook,
} from "../pages";

import { OAuthRedirect, Header, Modal, Footer } from "../components";

// const AddInfo = React.lazy(() => import("../pages/AddInfo"));
// const Detail = React.lazy(() => import("../pages/Detail"));

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userActions.loginCheck());
  }, []);

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Header />
        <Switch>
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
          <Route path="/guestbook" exact component={GuestBook} />

          <Route component={NotFound} />
        </Switch>

        <Footer />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
