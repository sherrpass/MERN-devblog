//To manage token within localStorage and the default x-auth-token header within axios
import axios from "axios";

const setAuthToken = (token) => {
    if (token) {
        //if token changes value or changes from null to a value
        localStorage.setItem("token", token);
        axios.defaults.headers.common["x-auth-token"] = token;
    } else {
        //if token is changed to null
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["x-auth-token"];
    }
};

export default setAuthToken;
