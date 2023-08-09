import React, { useState, useEffect } from 'react';
// importing getData utility function to avoid using long repetitive functions
import { getData, setData, deleteData } from '../Utils/storage';
// importing EditDowntime to be able to edit Reason
import EditDowntime from './edit-downtime.component';
// importing DeleteDowntime to be able to delete Downtime entry
import DeleteDowntime from './delete-downtime.component';

const ReadDowntime = () => {
    // using useState hook to keep track of changing values
    const [downtimeData, setDowntimeData] = useState([]);
    // initializing editId to null since no reason has been edited
    const [editId, setEditId] = useState(null);
  
    // using useEffect hook to update the dom and fetch data
    useEffect(() => {
        // using getData utility function 
        const savedData =  getData('inputDowntime') || [];
        // updating downtimeData state
        setDowntimeData(savedData);
        console.log("this is saved data!", savedData);
        // empty array simulates behavior of componentDidMount
    }, []);


    const handleEdit = (id) => {
        // calling setEditId function and passing the id as an arg
        setEditId(id);
      };


    
    const handleUpdateReason = (id, updatedReason) => {
    // mapping through downtimeData array to create new array
    const updatedData = downtimeData.map((entry) => {
        // checking to see if current entry id is the same as the provided id
        if (entry.id === id) {
        // creating new object with updated reason
        return { ...entry, reason: updatedReason };
        }
        // if id doesn't match, the same entry will be returned
        return entry;
    });
    // update downtime state to the new array with updated data
    setDowntimeData(updatedData);
    // resetting editId state to null
    setEditId(null);
    };
    

    const handleDelete = (id) => {
        const updatedDeletedData = downtimeData.filter((entry) => entry.id !== id);
        setDowntimeData(updatedDeletedData);
        setData('inputDowntime', updatedDeletedData);
        deleteData(id);
      };


    return (
        <div>
            <h1>Downtimes</h1>
            {downtimeData.length > 0 ? (
            <table>
          <thead>
            <tr>
              {Object.keys(downtimeData[0]).map(key => (
                <th key={key}>{key}</th>
              ))}
              <th>Edit Reason</th>
            </tr>
          </thead>
          <tbody>
  {downtimeData.map((entry, index) => (
    <tr key={index}>
      {Object.keys(entry).map(key => (
        <td key={key}>
          {key === 'id' ? (
            entry.id
          ) : (
            typeof entry[key] === 'object' ? JSON.stringify(entry[key]) : entry[key]
          )}
        </td>
      ))}
      <td>
        {editId === entry.id ? (

          <EditDowntime
            id={entry.id}
            initialReason={entry.reason}
            onSave={handleUpdateReason}
          />
        ) : (
          <div>
            <button onClick={() => handleEdit(entry.id)}>Edit</button>
            <DeleteDowntime id={entry.id} onDelete={handleDelete} />
          </div>
        )}
      </td>
    </tr>
  ))}
</tbody>

        </table>
            ) : (
            <p>No downtime data available.</p>
            )}
        </div>
    );
};



export default ReadDowntime