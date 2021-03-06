import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import User from "./modules/user";

import Info from "./modules/info";
import Post from "./modules/post";
import bookMark from "./modules/bookMark";
import category from "./modules/category";
import search from "./modules/search";
import guestBook from "./modules/guestBook";
import chat from "./modules/chat";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: User,
  info: Info,
  post: Post,
  bookMark: bookMark,
  category: category,
  search: search,
  guestBook: guestBook,
  chat : chat,

  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
