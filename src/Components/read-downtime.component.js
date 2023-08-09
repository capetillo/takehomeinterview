// importing react module, useState hook to keep track of changing values, and useEffect hook to fetch data and update the dom
import React, { useState, useEffect } from 'react';
// importing getData utility function to avoid using long repetitive functions
import { getData } from '../storage';
// importing defaultValue object to access key value pairs
import defaultValue from './DowntimeForm';

const ReadDowntime = () => {

    const [downtimeData, setDowntimeData] = useState([]);
  
    useEffect(() => {
        const savedData =  getData('inputDowntime') || [];
        setDowntimeData(savedData);
        console.log("this is saved data!", savedData);
    }, []);

return (
    <div>
        <h1>Downtime Data</h1>
        {downtimeData.length > 0 ? (
        <ul>
            {Object.keys(downtimeData).map(key => (
            <li key={key}>
                <label htmlFor={key}>{key}</label>
                <input
                type="text"
                id={key}
                name={key}
                value={downtimeData[key]}
                />
            </li>
            ))}
        </ul>
        ) : (
        <p>No downtime data available.</p>
        )}
    </div>
    );
};


export default ReadDowntime