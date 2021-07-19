import { CHANGE_RATES, ON_FOCUS, REMOVE_CURRENCY, ADD_CURRENCY, GET_SYMBOLS, UPDATE_SYMBOLS } from "./types";

const initState = {
    currencys: [],
    select: {},
    symbols: {},
    date: new Date().toLocaleDateString(),
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case REMOVE_CURRENCY:
            return { ...state, currencys: state.currencys.filter((c) => c.code !== action.payload) };
        case CHANGE_RATES:
            const newState = state.currencys.map((c) => {
                if (c.code === action.payload[1].base) {
                    c.rate = action.payload[1].amount;
                }else{
                    c.rate = action.payload[0].rates[c.code] === null ? 0 : action.payload[0].rates[c.code];
                }
                return c;
            });
            return { ...state, currencys: newState, date: new Date(action.payload[0].date).toLocaleDateString() };
        case ON_FOCUS:
            return {
                ...state,
                currencys: state.currencys.map((c) => {
                    if (action.payload === c.code) {
                        c.active = true;
                    } else {
                        c.active = false;
                    }
                    return c;
                }),
            };
        case ADD_CURRENCY:
            if (action.payload.code !== "0") {
                const newCurrencys = [...state.currencys];
                newCurrencys.push({
                    code: action.payload[0],
                    description: state.symbols[action.payload[0]].description,
                    rate: 0,
                    rmBtnVisibility: action.payload[1],
                    active: false,
                });
                return { ...state, currencys: newCurrencys };
            }
            return state;
        case GET_SYMBOLS:
            return { ...state, symbols: action.payload };
        case UPDATE_SYMBOLS:
            let newSymbols = { ...state.symbols };
            state.currencys.forEach((c) => {
                delete newSymbols[c.code];
            });
            return { ...state, select: newSymbols };
        default:
            return state;
    }
};
