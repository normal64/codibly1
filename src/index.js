import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {createStore,applyMiddleware, compose} from "redux";
import App from './App';
import reducers from "./reducers";
import reduxThunk from "redux-thunk";


const rootElement = document.querySelector("#root");
const root = createRoot(rootElement);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
)

root.render(
    <Provider store={store}>
    <App />
    </Provider>
)
