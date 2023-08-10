import React, { useState, useEffect } from 'react';
// importing getData utility function to avoid using long repetitive functions
import { getData, setData } from '../Utils/storage';
// importing EditDowntime to be able to edit Reason
import EditDowntime from './edit-downtime.component';
import DeleteDowntime from './delete-downtime.component';

const ReadDowntime = () => {
    // using useState hook to keep track of changing values
    const [downtimeData, setDowntimeData] = useState([]);
    // initializing editId to null since no reason has been edited
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const savedData = getData('inputDowntime') || [];
        console.log("Retrieved data from local storage:", savedData);
        setDowntimeData(savedData);
    }, []);
      

    const handleEdit = (id) => {
        setEditId(id);
      };


      const handleUpdateReason = (id, updatedReason) => {
        const currentData = getData('inputDowntime') || [];
        const updatedData = currentData.map((entry) => {
            if (entry.id === id) {
                return { ...entry, reason: updatedReason };
            }
            return entry;
        });
        setData('inputDowntime', updatedData);
        setDowntimeData(updatedData);
        setEditId(null);
    };


    const handleEntryDelete = (id) => {
        const currentData = getData('inputDowntime') || [];
        const updatedData = currentData.filter((entry) => entry.id !== id);
        setData('inputDowntime', updatedData);
        setDowntimeData(updatedData);
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
        onSave={(id, updatedReason) => handleUpdateReason(id, updatedReason)}
        />
        ) : (
          <div>
            <button onClick={() => handleEdit(entry.id)}>Edit</button>

            <DeleteDowntime onDelete={() => handleEntryDelete(entry.id)} />
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