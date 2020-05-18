import axios from "axios";
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    LOADING,
    UPDATE_COMMENTS,
} from "./types";
import setAlert from "./alert";

export const getPosts = () => async (dispatch) => {
    try {
        const response = await axios.get("/api/posts");
        dispatch({ type: GET_POSTS, payload: response.data });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data,
                status: error.response.status,
            },
        });
    }
};

export const addLike = (postID) => async (dispatch) => {
    try {
        const response = await axios.put(`/api/posts/like/${postID}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { postID, likes: response.data },
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data,
                status: error.response.status,
            },
        });
    }
};

export const deleteLike = (postID) => async (dispatch) => {
    try {
        const response = await axios.put(`/api/posts/unlike/${postID}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { postID, likes: response.data },
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data,
                status: error.response.status,
            },
        });
    }
};

export const deletePost = (postID) => async (dispatch) => {
    try {
        await axios.delete(`/api/posts/${postID}`);
        dispatch({
            type: DELETE_POST,
            payload: postID,
        });
        dispatch(setAlert("Post Deleted.", "success"));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data,
                status: error.response.status,
            },
        });
    }
};

export const addPost = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await axios.post("/api/posts", formData, config);
        dispatch({ type: ADD_POST, payload: response.data });
        dispatch(setAlert("Posted!", "success"));
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data,
                status: error.response.status,
            },
        });
    }
};

export const getPost = (postID) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/posts/${postID}`);
        dispatch({ type: GET_POST, payload: response.data });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data,
                status: error.response.status,
            },
        });
    }
};

export const loading = () => ({
    type: LOADING,
});

export const addComment = ({ text, postID }) => async (dispatch) => {
    try {
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const response = await axios.post(
            `/api/posts/comment/${postID}`,
            text,
            config
        );
        dispatch({
            type: UPDATE_COMMENTS,
            payload: response.data,
        });
        dispatch(setAlert("Comment Added.", "success"));
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data,
                status: error.response.status,
            },
        });
    }
};

export const deleteComment = ({ postID, commentID }) => async (dispatch) => {
    try {
        const response = await axios.delete(
            `/api/posts/comment/${postID}/${commentID}`
        );
        dispatch({
            type: UPDATE_COMMENTS,
            payload: response.data,
        });
        dispatch(setAlert("Comment Removed.", "success"));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data,
                status: error.response.status,
            },
        });
    }
};
