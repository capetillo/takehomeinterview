import React, { useState } from 'react';

// passing three arguments to be able to edit and save (U of CRUD)
// id: unique id of entry to be edited
// initial reason: initial value of key 'reason' to be edited
// onSave: cb function to be called when save button is clicked so that data can be updated
const EditDowntime = ({ id, initialReason, onSave }) => {

  const [editedReason, setEditedReason] = useState(initialReason);

  // event handler that updates editedReason's  state
  const handleReasonChange = (e) => {
    // rerenders component to new value in the entry
    setEditedReason(e.target.value);
  };

  const handleSave = () => {
    onSave(id, editedReason);
  };

  return (
    <div>
      <input
        type="text"
        value={editedReason}
        onChange={handleReasonChange}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditDowntime;