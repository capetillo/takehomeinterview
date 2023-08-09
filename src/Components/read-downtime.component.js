// importing react module, useState hook to keep track of changing values, and useEffect hook to fetch data and update the dom
import React, { useState, useEffect } from 'react';
// importing getData utility function to avoid using long repetitive functions
import { getData } from '../storage'


const ReadDowntime = () => {

    const [downtimeData, setDowntimeData] = useState([]);
  
    useEffect(() => {
        const savedData =  getData('inputDowntime') || [];
        setDowntimeData(savedData);
    }, [])
}

export default ReadDowntime