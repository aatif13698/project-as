import { applyMiddleware, createStore } from "redux";
import rootReducer from "../Reducer/rootReducer";
import thunk from "redux-thunk";

let store = createStore(rootReducer, applyMiddleware(thunk));

// let store = createStore()

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
  });

export default store;