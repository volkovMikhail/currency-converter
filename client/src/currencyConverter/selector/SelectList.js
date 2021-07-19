import React from "react";
import { connect } from "react-redux";
import SelectItem from "./SelectItem";
import { addCurrency, changeRates, updateSymbols } from "../redux/actions";

const SelectList = function (props) {
    const selectItems = () => {
        const result = [];
        for (const key in props.selectState) {
            result.push(<SelectItem symbol={props.selectState[key]} key={props.selectState[key].code} />);
        }
        return result;
    };

    const onChange = (event) => {
        props.addCurrency(event.target.value, true);
        const active = props.currencys.filter((c) => c.active)[0] || {};
        props.changeRates(active.code, active.rate);
        props.updateSymbols();
        event.target.selectedIndex = 0;
    };

    return (
        <select className="btn btn-light fullWidth" onChange={onChange}>
            <option value="0">Add currency</option>
            {selectItems()}
        </select>
    );
};

const mapStateToProps = (state) => ({
    selectState: state.select,
    currencys: state.currencys,
});

const mapDispatchToProps = {
    addCurrency,
    changeRates,
    updateSymbols,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectList);
