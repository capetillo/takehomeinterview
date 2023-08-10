import React from "react";
import "./delete-downtime.css"

// onDelete: cb function to be called when delete button is clicked so that entry can be deleted
const DeleteDowntime = ({ onDelete }) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <div>
      <button className="delete" onClick={handleDelete}>X</button>
    </div>
  );
};

export default DeleteDowntime;