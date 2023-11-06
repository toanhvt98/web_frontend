import { createContext, useEffect, useReducer } from "react";
import service from "../app/service";
import { useSelector } from "react-redux";

const initialState = {
  isAuthenticated: false,
  isInitialize: false,
  user: null,
};

const INITIALIZE = "INITIALIZE";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
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
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken) {
          setSession(accessToken);
          const response = await service.get("users/me/");
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user: response.data },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch {
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, user: null },
        });
      }
    };
    initialize();
  }, []);
  const login = async (data) => {
    const response = await service.post("token/", data);
    setSession(response.data.access);
    dispatch({
      type: LOGIN,
    });
  };
  return (
    <AuthContext.Provider value={{ ...state, login }}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };
