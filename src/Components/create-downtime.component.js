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
    // initializing startDate and endDate to null because if preselected, it can cause errors where startDate and endDate can be the exact same value 
    startDate: null, 
    endDate: null, 
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
            // updating state but maintaining inputDowntime immutable 
            ...prevData,
            [key]: value
        }));
    }



    // function to handle date input and check the validity of these entries 
    const handleDateInput = (key, date) => {
        const currentDate = new Date();
        if (key === 'startDate') {
        //preventing startDate from being greater than or equal to endDate
          if (inputDowntime.endDate && date >=inputDowntime.endDate || date > currentDate) {
            alert("please select a start date before the end date or before the present")
            return
          }
        } else if (key === 'endDate') {
          if (date <= inputDowntime.startDate || date > currentDate) {
            // temporary alert. will add a better one tomorrow
            alert("please select a time before the present or after start date")
            return       
            };
          }
          setInputDowntime(prevData => ({
            ...prevData,
            [key]: date
        }));
      };


    // functionionality for button to assign values to keys of inputDowntime object, save da
     const handleSubmit = e => {
        e.preventDefault();
        // checking if any fields are empty
        const requiredFields = ['site', 'telescope','startDate', 'endDate', 'reason'];
        // using some method to test if there is a null field in the inputDowntime obj
        const isAnyFieldEmpty = requiredFields.some(field => !inputDowntime[field]);
        if (isAnyFieldEmpty) {
            //temporary alert. will add a better solution 
            alert('Please fill out all required fields.');
            return;
        }
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
    source: https://react.dev/learn/conditional-rendering
    if this were a larger form that had multiple fields and more data to handle, having a configuration object would be a better approach
    because it would be scalable, it would have consistent patterns for the rendering fields, 
    and the return statement would be more concise and easier to read.

     */
    return (
    <div>
    {/* onSubmit, inputDowntime object is stored by using localStorage */}
      <form onSubmit={handleSubmit}>
        {/* mapping through each key of inputDowntime object and creating an input field for each key */}
        {Object.keys(inputDowntime).map(key => {
            // skipping rendering of id because it's rendered below in a way that makes more sense
            if (key === 'id') {
                return null;
            }
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
         {/* rendering id */}
        <div>
            <label>Internal ID:</label>
            <span>{inputDowntime.id}</span>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DownTime; 


