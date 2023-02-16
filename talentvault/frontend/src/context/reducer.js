import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  PASSWORD_MISSMATCH,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    //handling the error for current state
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === PASSWORD_MISSMATCH) {
    //handling the error for current state
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Passwords don't match!",
    };
  }

  if (action.type === CLEAR_ALERT) {
    // clearing the error for current state
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  throw new Error(`no such action:${action.type}`);
};

export default reducer;
