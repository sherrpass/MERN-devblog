import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 } from "uuid";

const setAlert = (msg, alertType, time = 5000) => (dispatch) => {
    const id = v4();
    dispatch({ type: SET_ALERT, payload: { id, msg, alertType } });
    setTimeout(() => {
        dispatch({ type: REMOVE_ALERT, payload: id });
    }, time);
};

export default setAlert;
