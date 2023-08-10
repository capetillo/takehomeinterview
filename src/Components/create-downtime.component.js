// importing react module and useState hook to keep track of changing values
import React, { useState } from 'react'; 
// importing datepicker to have a calendar and time 
import DatePicker from 'react-datepicker';
// importing css for datepicker to look like a calendar 
import 'react-datepicker/dist/react-datepicker.css';
// importing setData function to avoid using long repetitive functions since it's used more than once in the app
import { setData, getData } from '../Utils/storage';
// importing useNavigate to redirect
import { useNavigate } from 'react-router-dom';
  // importing package for uniqueid generator
  import { v4 as uuidv4 } from 'uuid';



const CreateDownTime = () => {

    // creating a uniqueID for each downtime
const _id = uuidv4();

// initializes defaultValue of object where the keys are the downtime features and their values are set to empty strings and null 
const defaultValue = {
    site: '', 
    telescope: '', 
    // initializing startDate and endDate to null because if preselected, it can create erroneous data
    // where startDate and endDate can be the exact same value 
    startDate: null, 
    endDate: null, 
    reason: '',
    // unique id
    id: _id
}

    // for redirecting after submission
    const navigate = useNavigate();
    // using useState hook to keep track of changing values without mutating object
    const [inputDowntime, setInputDowntime] = useState(defaultValue)

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
        //preventing startDate from being greater than or equal to endDate || preventing date from being greater than the present
          if ((inputDowntime.endDate && date >=inputDowntime.endDate) || date > currentDate) {
            alert("please select a start date before the end date or before the present")
            return
          }
        } else if (key === 'endDate') {
        // preventing startDate from being greater than today || preventing date from being greater than the present
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
        // using imported function to setData (C of CRUD)
        const existingData = getData('inputDowntime') || [];
        const dataToSave = {
            ...inputDowntime,
            startDate: inputDowntime.startDate.toISOString(),
            endDate: inputDowntime.endDate.toISOString(),
        };
        
        existingData.push(dataToSave);
        setData('inputDowntime', existingData);
    
        console.log("this is input downtime", inputDowntime);
        navigate('/read-downtime');

    };



    /* for the return statement, I'm choosing to use individual conditional rendering because this project is a simple form
    and using specific rendering allows for more control.
    source: https://react.dev/learn/conditional-rendering
    if this were a larger form that had multiple fields and more data to handle, having a configuration object outside of the return 
    would be a better approach because it would be scalable, it would have consistent patterns for the rendering fields, 
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
            // if the key is startDate or endDate, render DatePicker
            if (key === 'startDate' || key === 'endDate') {
            return (
              <div key={key}>
                <label htmlFor={key}>{key}</label>
                <DatePicker
                  selected={inputDowntime[key]}
                  onChange={date => handleDateInput(key, date)}
                  showTimeSelect
                  // time comes in intervals of 1 minute instead of 5 minutes (default)
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

export default CreateDownTime; 