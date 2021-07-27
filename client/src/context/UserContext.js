import React from "react";
import axios from "axios";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        name: action.payload,
      };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("auth-token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);

  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, email, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  if (!!email && !!password) {
    axios
      .post(`${window.APIPATH}/api/login`, {
        email,
        password,
      })
      .then((response) => {
        let { status, msg, data } = response.data;
        if (status) {
          localStorage.setItem("auth-token", data.token);
          setError("");
          setIsLoading(false);
          dispatch({ type: "LOGIN_SUCCESS", payload: "name" });

          history.push("/app/dashboard");
        } else {
          setError(msg);
          setIsLoading(false);
        }
      });
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError("Please provide email and password.");
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("auth-token");
  localStorage.removeItem("user-type");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
