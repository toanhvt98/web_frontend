import { createContext, useEffect, useReducer } from "react";
import service from "../app/service";
import { useSelector } from "react-redux";

const initialState = {
  isAuthenticated: false,

  user: null,
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      break;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    service.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete service.defaults.headers.common.Authorization;
  }
};
const AuthContext = createContext({ ...initialState });
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const initialize = async () => {
      const accessToken = window.localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          setSession(accessToken);
          const response = await service.get("users/me/");
          dispatch({
            type: LOGIN,
            payload: { user: response },
          });
          console.log(response);
        } catch (error) {
          if (error && error.status === 400) {
            setSession(null);
            dispatch({
              type: LOGOUT,
            });
            console.error(error.data.error);
          }
        }
      } else {
        setSession(null);
        dispatch({
          type: LOGOUT,
        });
      }
    };
    initialize();
  }, []);
  const login = async (data) => {
    const response = await service.post("token/", data);
    return response.access;
  };
  const checkLogin = async (accessToken) => {
    const response = await service.get("users/me/");
    return response;
  };
  return (
    <AuthContext.Provider value={{ ...state, login }}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };
