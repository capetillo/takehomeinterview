import React from "react";

// onDelete: cb function to be called when delete button is clicked so that entry can be deleted
const DeleteDowntime = ({ onDelete }) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete entry</button>
    </div>
  );
};

export default DeleteDowntime;
