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


const DownTime = () => {
    // initializing state of inputDowntime to empty string 
    const [inputDowntime, setInputDowntime] = useState("");
    // updating the state of inputDowntime any time the value of the input changes
    const handleInputChange = (event) => {
        setInputDowntime(event.target.value);
    }; 

    // adding functionality to the button 
    const [list, setList] = useState([])
    // runs when add button is clicked to add new downtime
    const handleAddDowntime = (downtime) => {
        const newDownTime = {
            downtime: downtime,
            // unique id generator 
            id: uuidv4(),
        }
    }


    //setting limit to 255 characters for reason input below
    const [inputText, setInputText] = useState("");
    const [characterLimit] = useState(255);

    // event handler for character limit
    const handleChange = event => {
    setInputText(event.target.value);
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

  <Form>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea"  rows={6} value={inputText} placeholder="Reason" onChange={handleChange} isInvalid={(inputText.length > characterLimit)} />
        <Badge className='mt-3' bg={`${inputText.length > characterLimit ? 'danger' : 'primary'}`}>{inputText.length}/{characterLimit}</Badge>
        </Form.Group>
    </Form>


     

           



    </div>
    );
};

export default DownTime; 