import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    LOADING,
    UPDATE_COMMENTS,
} from "../actions/types";

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {},
};

export default function(state = initialState, { type, payload }) {
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false,
            };
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === payload.postID
                        ? { ...post, likes: payload.likes }
                        : post
                ),
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== payload),
                loading: false,
            };
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false,
            };
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false,
            };
        case LOADING:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_COMMENTS:
            return {
                ...state,
                post: { ...state.post, comments: payload },
                loading: false,
            };
        default:
            return state;
    }
}
