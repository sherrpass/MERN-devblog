import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    CREATE_PROFILE,
    UPDATE_PROFILE,
    GET_REPOS,
    GET_PROFILES,
} from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_PROFILE:
        case CREATE_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            };
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false,
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
                profile: null,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
            };
        default:
            return state;
    }
};
