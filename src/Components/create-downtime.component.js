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
// doing this outside of DownTime function so we can access it multiple times without repeating in the return
const defaultValue = {
    site: '', 
    telescope: '', 
    startDate: '', 
    endDate: '', 
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
        console.log("this is key", key)
        console.log("this is value", value)
        setInputDowntime(prevData =>({
            ...prevData,
            [key]: value
        }));
        // console.log("this is value", value)
        // const newValue = inputDowntime
        // console.log("new value 1", newValue)
        // newValue[key] = value
        // console.log("new value 2", newValue)
        // setInputDowntime(newValue);
        console.log("now this is value", value)
    }

     // functionionality for button to assign value to keys of inputDowntime object
     const handleSubmit = e => {
        e.preventDefault();
        localStorage.setItem('inputDowntime', JSON.stringify(inputDowntime));
        console.log("this is input downtime", inputDowntime);
    };


    return (

            <div>
              <form onSubmit={handleSubmit}>
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


        // <div>{Object.entries(inputDowntime).map((key, value) => {
        //     return (
        //     <div key={key}>
        //     <div>{key}</div>
        //          <input className="input-site" id={key} type="text" value={value}  
        //             onChange={(e) => handleInputChange(key, e.target.value)} placeholder={`Enter the  ${key}`}/>
        //       </div>)})} 
             
              
   

    //  <Form>
    //      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    //          <Form.Control as="textarea" id="reason" rows={6} placeholder="Reason" value={inputDowntime.reason} onChange={handleInputChange} isInvalid={(inputText.length > characterLimit)} />
    //          <Badge className='mt-3' bg={`${inputText.length > characterLimit ? 'danger' : 'primary'}`}>{inputText.length}/{characterLimit}</Badge>
    //      </Form.Group>
    //  </Form>
    //  <button className="btn"  onClick={handleSubmit}>ADD</button>
//   </div>
//     );
};

export default DownTime; 


