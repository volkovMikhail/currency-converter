import React from "react";
import CurrencyConverter from "./currencyConverter/CurrencyConverter";
import { reducer } from "./currencyConverter/redux/reducer";
import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(
    reducer,
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

function App() {
    return (
        <div className="d-flex flex-column align-items-center">
            <Provider store={store}>
                <CurrencyConverter defaultCurrencys={["USD", "EUR", "RUB", "BYN"]} />
            </Provider>
        </div>
    );
}

export default App;
