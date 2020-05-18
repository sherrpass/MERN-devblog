import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_PROFILE,
} from "./types";
import axios from "axios";
import setAlert from "./alert";
//register user
export const register = ({ name, email, password }) => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await axios.post(
            "/api/users",
            { name, email, password },
            config
        );
        dispatch({ type: REGISTER_SUCCESS, payload: response.data });
        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => {
                dispatch(setAlert(error.msg, "danger"));
            });
        }
        dispatch({ type: REGISTER_FAIL });
    }
};

export const login = ({ email, password }) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await axios.post(
            "/api/auth",
            { email, password },
            config
        );
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => {
                dispatch(setAlert(error.msg, "danger"));
            });
        }
        dispatch({ type: LOGIN_FAIL });
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        const response = await axios.get("/api/auth");
        dispatch({ type: USER_LOADED, payload: response.data });
    } catch (error) {
        dispatch({ type: AUTH_ERROR });
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};
