import React from "react";
import {connect} from 'react-redux';
import CurrencyItem from "./CurrencyItem";

const CurrencyList = function({ currencys }) {
    if (currencys.length === 0) {
        return (
            <div className="spinner-border m-3"/>
        );
    }
    return (
        <div className="d-flex flex-column mb-4">
            {currencys.map((currency) => {
                return <CurrencyItem currency={currency} key={currency.code} />;
            })}
        </div>
    );
}

const mapStateToProps = state =>({
    currencys: state.currencys
})

export default connect(mapStateToProps)(CurrencyList);