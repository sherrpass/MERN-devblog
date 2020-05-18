import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import setAuthToken from "../utils/setAuthToken";

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
);

//subscription which runs after every action is created and dispatched
let currentValue = {
    auth: {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        loading: true,
        user: null,
    },
};

store.subscribe(() => {
    let previousValue = currentValue;
    currentValue = store.getState();
    // console.log({ previousValue, currentValue });
    if (currentValue.auth.token !== previousValue.auth.token) {
        // console.log("triggered");
        setAuthToken(currentValue.auth.token);
    }
});

export default store;
