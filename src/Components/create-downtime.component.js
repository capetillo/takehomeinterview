import React, { useState } from 'react'; 
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { DesktopDateTimePicker } from '@mui/x-date-pickers';
import { v4 as uuidv4 } from 'uuid';
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'

// dayjs plugins to convert time to utc
dayjs.extend(utc);
dayjs.extend(timezone);


// creating a uniqueID for each downtime
const _id = uuidv4();

// initializes defaultValue of object where keys are the downtime features and their values are set as an empty string to use in useState below
// doing this outside of DownTime function so we can access it multiple times without repeating in the return statement
const defaultValue = {
    site: '', 
    telescope: '', 
    startDate: new Date(), 
    endDate: new Date(), 
    reason: '',
    id: _id
}


const DownTime = () => {
    const [inputDowntime, setInputDowntime] = useState(defaultValue)


    //setting limit to 255 characters for reason input below
    const [inputText, setInputText] = useState("");
    const [characterLimit] = useState(255);

    // event handler for character limit
    const handleInputChange = (key, value) => {
        setInputDowntime(prevData =>({
            ...prevData,
            [key]: value
        }));
    }

     // functionionality for button to assign value to keys of inputDowntime object
     const handleSubmit = e => {
        e.preventDefault();
        localStorage.setItem('inputDowntime', JSON.stringify(inputDowntime));
        console.log("this is input downtime", inputDowntime);
    };


    return (

            <div>
                {/* onSubmit, inputDowntime object is stored by using localStorage */}
              <form onSubmit={handleSubmit}>
                {/* mapping through each key of inputDowntime object and creating an input field for each key */}
                {Object.keys(inputDowntime).map(key => (
                  <div key={key}>
                    <label htmlFor={key}>{key}</label>
                    <input
                      type="text"
                      id={key}
                      name={key}
                      value={inputDowntime[key]}
                      onChange={e => handleInputChange(key, e.target.value)}
                    />
                  </div>
                ))}
                <button type="submit">Submit</button>

        <DesktopDateTimePicker 
            id="startDate"
            timezone='UTC'
        />
        <DesktopDateTimePicker 
            id="endDate"
            timezone='UTC'
        />
              </form>
              
            </div>
          );
};

export default DownTime; 


