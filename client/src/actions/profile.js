import axios from "axios";
import {
    GET_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    PROFILE_ERROR,
    CREATE_PROFILE,
    UPDATE_PROFILE,
    DELETE_ACCOUNT,
    CLEAR_PROFILE,
} from "./types";
import setAlert from "./alert";

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const response = await axios.get("./api/profile/me");
        dispatch({ type: GET_PROFILE, payload: response.data });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

export const createProfile = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await axios.post("/api/profile", formData, config);
        dispatch({ type: CREATE_PROFILE, payload: response.data });
        dispatch(
            setAlert(edit ? "Profile updated!" : "Profile created!", "success")
        );

        history.push("/dashboard");
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data,
                status: error.response.status,
            },
        });
    }
};

export const addExporEdu = (formData, history, isExperience) => async (
    dispatch
) => {
    console.log("reached action");

    const type = isExperience ? "experience" : "education";
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await axios.put(
            `/api/profile/${type}`,
            formData,
            config
        );
        dispatch({ type: UPDATE_PROFILE, payload: response.data });
        dispatch(
            setAlert(
                `${isExperience ? "Experience" : "Education"} Added`,
                "success"
            )
        );

        history.push("/dashboard");
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data,
                status: error.response.status,
            },
        });
    }
};

export const deleteExperience = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({ type: UPDATE_PROFILE, payload: response.data });
        dispatch(setAlert("Experience deleted", "success"));
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data,
                status: error.response.status,
            },
        });
    }
};

export const deleteEducation = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`/api/profile/education/${id}`);
        dispatch({ type: UPDATE_PROFILE, payload: response.data });
        dispatch(setAlert("Education deleted", "success"));
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data,
                status: error.response.status,
            },
        });
    }
};

export const deleteUser = () => async (dispatch) => {
    if (window.confirm("Are you sure? This is irreversible.")) {
        try {
            await axios.delete("/api/profile");
            dispatch({ type: DELETE_ACCOUNT });
            dispatch({ type: CLEAR_PROFILE });
            dispatch(setAlert("Account permanently deleted"));
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response.data,
                    status: error.response.status,
                },
            });
        }
    }
};

export const getProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE }); //will be filled with the profile the user is visiting
    try {
        const response = await axios.get("/api/profile");
        dispatch({ type: GET_PROFILES, payload: response.data });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data,
                status: error.response.status,
            },
        });
    }
};

export const getProfileByID = (userID) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/profile/user/${userID}`);
        dispatch({ type: GET_PROFILE, payload: response.data });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data,
                status: error.response.status,
            },
        });
    }
};

export const getRepos = (username) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/profile/github/${username}`);
        dispatch({ type: GET_REPOS, payload: response.data });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data,
                status: error.response.status,
            },
        });
    }
};
