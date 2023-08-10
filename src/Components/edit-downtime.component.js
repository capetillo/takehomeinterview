import React, { useState } from "react";

// passing three arguments to be able to edit and save (U of CRUD)
// id: unique id of entry to be edited
// initial reason: initial value of key 'reason' to be edited
// onSave: cb function to be called when save button is clicked so that data can be updated
const EditDowntime = ({ id, initialReason, onSave }) => {
  const [editedReason, setEditedReason] = useState(initialReason);
  // state to not exceed 255 characters
  const [charCount, setCharCount] = useState(initialReason.length);
  // initializing state to no error. Later usedd to create error if reason is left blank
  const [error, setError] = useState("");


  // event handler that updates editedReason's  state
  const handleReasonChange = (e) => {
    // rerendering state of error to an empty string because there's text now
    setError("")
    // rerenders component to new value in the entry
    const value = e.target.value;
    setEditedReason(value);
    setCharCount(value.length);
  };

  const handleSave = () => {
    // checking for no reason or whitespace
    if (!editedReason.trim().length) {
      // updates state
      setError("Please provide a reason")
      // does nothing 
      return
    }
    // cb function passed down as props to the component
    onSave(id, editedReason);

  };

  return (
    <div>
      <input
        type="text"
        value={editedReason}
        maxLength="255"
        onChange={handleReasonChange}
      />
      <p>{255 - charCount} characters remaining</p>
      <button onClick={handleSave}>Save</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
};

export default EditDowntime;
