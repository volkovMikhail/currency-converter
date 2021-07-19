import { CHANGE_RATES, ON_FOCUS, REMOVE_CURRENCY, ADD_CURRENCY, GET_SYMBOLS, UPDATE_SYMBOLS } from "./types";

export function removeCurrency(code) {
    return {
        type: REMOVE_CURRENCY,
        payload: code,
    };
}

export function changeRates(base, amount) {
    return async (dispatch) => {
        const data = await (await fetch(`/api/rates/${base}/${amount}`)).json();
        dispatch({ type: CHANGE_RATES, payload: [data,{base,amount}] });
    };
}

export function onFocus(code) {
    return {
        type: ON_FOCUS,
        payload: code,
    };
}

export function addCurrency(c, removeButton) {
    return {
        type: ADD_CURRENCY,
        payload: [c, removeButton],
    };
}

export function getSymbols() {
    return async (dispatch) => {
        const data = await (await fetch("/api/symbols")).json();
        dispatch({ type: GET_SYMBOLS, payload: data.symbols });
    };
}

export function updateSymbols() {
    return {
        type: UPDATE_SYMBOLS,
    };
}
