import React, { useState } from 'react';

const DownTime = () => {
    const [inputDowntime, setInputDowntime] = useState("");
    const handleInputChange = (event) => {
        setInputDowntime(event.target.value);
    }; 

    // converting dates to UTC time with js method
    const event = new Date;
    const dateTime = event.toUTCString();

    return (
    <div className="downtime-form">
        <h1>Downtimes</h1>
        <div className="site">
        <input className="input-site" type="text" value={inputDowntime}
           onChange={handleInputChange} placeholder="Enter a site" />
            <button className="btn">ADD</button>
        </div>
        <div className="telescope">
        <input className="input-telescope" type="text" value={inputDowntime}
           onChange={handleInputChange} placeholder="Enter a telescope" />
            <button className="btn">ADD</button>
        </div>
        <div className="startdate">
        <input className="input-startdate" type="date" value={inputDowntime}
           onChange={handleInputChange} placeholder="Enter the start date" />
            <button className="btn">ADD</button>
        </div>
        <div className="starttime">
        <input className="input-starttime" type="time" value={dateTime}
           onChange={handleInputChange} placeholder="Enter the start date" />
            <button className="btn">ADD</button>
        </div>
        <div className="enddate">
        <input className="input" type="date" value={inputDowntime}
           onChange={handleInputChange} placeholder="Enter the end date" />
            <button className="btn">ADD</button>
        </div>
        <div className="endtime">
        <input className="input-endtime" type="time" value={dateTime}
           onChange={handleInputChange} placeholder="Enter the start date" />
            <button className="btn">ADD</button>
        </div>
        <div className="reason">
        <input className="input" type="text" value={inputDowntime}
           maxLength="255" onChange={handleInputChange} placeholder="Enter a reason. 255" />
            <button className="btn">ADD</button>
        </div>
    </div>
    );
};

export default DownTime; 