import React, { useState } from 'react'; 
import { v4 as uuidv4 } from 'uuid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    
    // using useState 
    const [inputDowntime, setInputDowntime] = useState(defaultValue)


    //setting limit to 255 characters for reason input below
    const [inputText, setInputText] = useState("");
    const [characterLimit] = useState(255);

    // event handler to reuse key value pairs 
    const handleInputChange = (key, value) => {
        setInputDowntime(prevData =>({
            ...prevData,
            [key]: value
        }));
    }



    // functionality to check that startDate is before endDate and endDate is before the present 
    // passing key and date as args. Key is the key of either startDate or endDate and date is the date and time 
    // that are  selected in the return statement's input 
    const handleDateInput = (key, date) => {
        if (key === 'startDate') {
          if (date < inputDowntime.endDate) {
            setInputDowntime(prevData => ({
              ...prevData,
              startDate: date,
            }));
          }
        } else if (key === 'endDate') {
          const currentDate = new Date();
          if (date > inputDowntime.startDate && date < currentDate) {
            setInputDowntime(prevData => ({
              ...prevData,
              endDate: date,
            }));
          }
        }
      };


    // functionionality for button to assign values to keys of inputDowntime object, save da
     const handleSubmit = e => {
        e.preventDefault();
        localStorage.setItem('inputDowntime', JSON.stringify(inputDowntime));
        console.log("this is input downtime", inputDowntime);
        const dataToSave = {
            ...inputDowntime,
            // converting time to UTC
            startDate: inputDowntime.startDate.toISOString(),
            endDate: inputDowntime.endDate.toISOString(),
          };
    };



    /* for this return statement, I'm choosing to use individual conditional rendering because this is a simple form
    and using specific rendering allows for more control.
    if this were a larger form that had multiple fields and more data to handle, configuration object would be a better approach
    because it would be scalable, it would have consistent patterns for the rendering fields, 
    and the return statement would be more concise and easier to read.
     */
    return (
    <div>
    {/* onSubmit, inputDowntime object is stored by using localStorage */}
      <form onSubmit={handleSubmit}>
        {/* mapping through each key of inputDowntime object and creating an input field for each key */}
        {Object.keys(inputDowntime).map(key => {
          if (key === 'startDate' || key === 'endDate') {
            return (
              <div key={key}>
                <label htmlFor={key}>{key}</label>
                <DatePicker
                  selected={inputDowntime[key]}
                  onChange={date => handleDateInput(key, date)}
                  showTimeSelect
                  timeIntervals={1}
                  dateFormat="MM/dd/yyyy h:mm aa"
                  className="date-picker"
                />
              </div>
            );
            } else if (key === 'reason') {
                return (
                  <div key={key}>
                    <label htmlFor={key}>Reason</label>
                    <textarea
                      id={key}
                      name={key}
                      value={inputDowntime[key]}
                      onChange={e => handleInputChange(key, e.target.value)}
                      maxLength={255}
                    />
                    <p>Characters remaining: {255 - inputDowntime[key].length}</p>
                  </div>
                );
          } else {
            return (
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
            );
          }
        })}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


export default DownTime; 


