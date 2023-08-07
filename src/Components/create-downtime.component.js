import React, { useState } from 'react'; 
import dayjs from 'dayjs';
import { DesktopDateTimePicker } from '@mui/x-date-pickers';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


const DownTime = () => {
    const [inputDowntime, setInputDowntime] = useState("");
    const handleInputChange = (event) => {
        setInputDowntime(event.target.value);
    }; 





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
        <DesktopDateTimePicker 
            timezone='UTC'
        />
        <DesktopDateTimePicker 
            timezone='UTC'
        />
  

        <div className="reason">
            <input className="input" type="text" value={inputDowntime}
            maxLength="255" onChange={handleInputChange} placeholder="Enter a reason. 255" />
            <button className="btn">ADD</button>
        </div>
    </div>
    );
};

export default DownTime; 