// importing react module, useState hook to keep track of changing values, and useEffect hook to fetch data and update the dom
import React, { useState, useEffect } from 'react';
// importing getData utility function to avoid using long repetitive functions
import { getData } from '../Utils/storage';

const ReadDowntime = () => {
    // using useState hook to keep track of changing values
    const [downtimeData, setDowntimeData] = useState([]);
  
    // using useEffect hook to update the dom and fetch data
    useEffect(() => {
        // using getData utility function 
        const savedData =  getData('inputDowntime') || [];
        setDowntimeData(savedData);
        console.log("this is saved data!", savedData);
    }, []);

    return (
        <div>
            <h1>Downtimes</h1>
            {downtimeData.length > 0 ? (
            <table>
          <thead>
            <tr>
              {Object.keys(downtimeData[0]).map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {downtimeData.map((entry, index) => (
              <tr key={index}>
                {Object.keys(entry).map(key => (
                  <td key={key}>{entry[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
            ) : (
            <p>No downtime data available.</p>
            )}
        </div>
    );
};


export default ReadDowntime