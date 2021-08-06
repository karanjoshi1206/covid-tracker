import React from 'react'
import { preetystat } from './util';
const Table = ({ countries }) => {
    return (
        <div className="table">
            {countries.map(country => (
                <tr>
                    <td>{country.country}</td>
                    <td><strong>{preetystat(country.cases)}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
