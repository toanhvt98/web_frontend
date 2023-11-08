import { createContext, useEffect, useReducer } from "react";
import service from "../app/service";

const initialState = {
  isAuthenticated: false,
  isInitialize: false,
  user: null,
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const INIT = "INIT";

const reducer = (state, action) => {
  switch (action.type) {
    case INIT:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isInitialize: true,
        isAuthenticated,
        user,
      };
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
      return state;
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
    const initial = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken) {
          setSession(accessToken);
          const response = await service.get("users/me/");

          dispatch({
            type: LOGIN,
            payload: { response },
          });
        } else {
          setSession(null);
          dispatch({
            type: LOGOUT,
          });
        }
      } catch {
        setSession(null);
        dispatch({
          type: LOGOUT,
        });
      }
    };
    initial();
  }, []);
  const login = async (data) => {
    const response = await service.post("token/", data);
    return response.access;
  };
  const checkToken = async (accessToken) => {
    if (accessToken) {
      setSession(accessToken);
      const response = await service.get("users/me/");

      dispatch({
        type: LOGIN,
        payload: { response },
      });
    } else {
      setSession(null);
      dispatch({
        type: LOGOUT,
      });
    }
  };
  return (
    <AuthContext.Provider value={{ ...state, login, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };
