import { INCREMENT, DECREMENT } from "./action-types";
import { combineReducers } from "redux";
function count(state = 0, action) {
  console.log("reducer", state, action);
  switch (action.type) {
    case INCREMENT:
      return state + action.data;
    case DECREMENT:
      return state - action.data;
    default:
      return state;
  }
}

function user(state = {}, action) {
  console.log("reducer", state, action);
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  count,
  user,
});
