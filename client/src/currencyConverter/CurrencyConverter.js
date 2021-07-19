/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import CurrencyList from "./currency/CurrencyList";
import SelectList from "./selector/SelectList";
import { addCurrency, getSymbols, changeRates, updateSymbols, onFocus } from "./redux/actions";

const CurrencyConverter = function (props) {
    React.useEffect(async () => {
        await props.getSymbols();
        props.defaultCurrencys.forEach((c) => {
            props.addCurrency(c, false);
        });
        await props.changeRates(props.defaultCurrencys[0], "1");
        props.updateSymbols();
        props.onFocus(props.defaultCurrencys[0]);
    }, []);

    return (
        <div>
            <div className="itemWidth">
                <h2 className="mt-4">Currency converter</h2>
                <span className="m-1">Exchange rate on {props.date}</span>
            </div>
            <div className="alert alert-primary itemWidth mt-1">
                <CurrencyList />
                <SelectList />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    date: state.date,
});

const mapDispatchToProps = {
    addCurrency,
    getSymbols,
    changeRates,
    updateSymbols,
    onFocus,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyConverter);
