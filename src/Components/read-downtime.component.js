import React, { useState, useEffect } from 'react';
// importing getData utility function to avoid using long repetitive functions
import { getData } from '../Utils/storage';
// importing EditDowntime to be able to edit Reason
import EditDowntime from './edit-downtime.component';

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
        setEditId(id);
      };


    
      const handleUpdateReason = (id, updatedReason) => {
        const updatedData = downtimeData.map((entry) => {
          if (entry.id === id) {
            // 
            return { ...entry, reason: updatedReason };
          }
          return entry;
        });
        setDowntimeData(updatedData);
        setEditId(null);
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
                  <td key={key}>{entry[key]}</td>
                ))}
                <td>
                  {editId === entry.id ? (
                    <EditDowntime
                      id={entry.id}
                      initialReason={entry.reason}
                      onSave={handleUpdateReason}
                    />
                  ) : (
                    <button onClick={() => handleEdit(entry.id)}>
                      Edit
                    </button>
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