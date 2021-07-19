import React from 'react';

export default function SelectItem({symbol}){
    return(
        <option value={symbol.code}>{symbol.code} - {symbol.description}</option>
    );
}
