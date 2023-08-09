import React from 'react';

// id: unique id of downtime entruy to be deleted
// onDelete: cb function to be called when delete button is clicked so that entry can be deleted
const DeleteDowntime = ({ id, onDelete }) => {
// handler function that deletes downtime entry by finding id 
  const handleDelete = () => {
    console.log("this is id", id)
    onDelete(id);
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteDowntime;