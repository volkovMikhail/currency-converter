/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { removeCurrency, changeRates, onFocus } from "../redux/actions";
import { fromEvent, debounceTime, map, distinctUntilChanged } from "rxjs";

const CurrencyItem = function (props) {
    const [state, setState] = React.useState(props.currency.rate);

    React.useEffect(() => {
        const input = document.getElementById(props.currency.code);
        const stream$ = fromEvent(input, "input").pipe(
            map((e) => e.target.value),
            debounceTime(400),
            distinctUntilChanged(),
        );
        stream$.subscribe((value) => {
            props.changeRates(props.currency.code, value.trim() === "" ? 0 : value);
        });
    }, []);

    React.useEffect(() => {
        setState(props.currency.rate);
    }, [props.currency.rate]);

    const onInput = (event) => {
        let val = event.target.value.replace(/[^0-9,.]/g, "");
        val = val.replace(",", ".");
        setState(val);
    };

    const style = props.currency.rmBtnVisibility ? {} : { visibility: "hidden" };

    return (
        <div className="d-flex justify-content-between align-items-start mb-1">
            <strong className="m-2">{props.currency.code}</strong>
            <div className="d-flex flex-column justify-content-start align-items-end fullWidth">
                <input
                    className="form-control"
                    type="text"
                    id={props.currency.code}
                    value={state}
                    onInput={onInput}
                    onFocus={() => props.onFocus(props.currency.code)}
                />
                <small className="text-muted">{props.currency.description}</small>
            </div>
            <button
                className="rmBtn mt-1"
                style={style}
                onClick={() => {
                    props.removeCurrency(props.currency.code, props.currency);
                }}
            >
                &times;
            </button>
        </div>
    );
};

const mapDispatchToProps = {
    removeCurrency,
    changeRates,
    onFocus,
};

const mapStateToProps = (state) => ({
    currencys: state.currencys,
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyItem);
