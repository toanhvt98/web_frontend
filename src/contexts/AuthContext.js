import { createContext, useEffect, useReducer } from "react";
import service from "../app/service";
import { AxiosError } from "axios";

const initialState = {
  isAuthenticated: false,
  isInitialize: false,
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
        isInitialize: true,
        user: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isInitialize: true,
        user: null,
      };

    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setSession = (accessToken) => {
    if (accessToken) {
      window.localStorage.setItem("accessToken", accessToken);
    } else {
      window.localStorage.removeItem("accessToken");
      delete service.defaults.headers.common.Authorization;
    }
  };
  useEffect(() => {
    const initial = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        checkToken(accessToken)
          .then()
          .catch(() => {
            logout();
          });
      } catch {}
    };
    initial();
  }, []);
  const login = async (data) => {
    const response = await service.post("token/", data);
    return response.data.access;
  };
  const checkToken = async (accessToken) => {
    if (accessToken) {
      service.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const response = await service.get("users/me/");
      const user = response.data;
      dispatch({
        type: LOGIN,
        payload: { user },
      });
      setSession(accessToken);
      return response;
    } else {
      setSession(null);
      dispatch({
        type: LOGOUT,
      });
    }
  };
  const logout = () => {
    setSession(null);
    dispatch({
      type: LOGOUT,
    });
  };
  return (
    <AuthContext.Provider
      value={{ ...state, login, checkToken, setSession, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };
