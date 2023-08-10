import React, { useState, useEffect } from "react";
// importing utility function to avoid repetition
import { getData, setData } from "../Utils/storage";
// importing components
import EditDowntime from "./edit-downtime.component";
import DeleteDowntime from "./delete-downtime.component";

const ReadDowntime = () => {
  // using useState hook to keep track of changing values
  const [downtimeData, setDowntimeData] = useState([]);
  // initializing editId to null since no reason has been edited
  const [editId, setEditId] = useState(null);
  // state to expand reason. Initializing to null
  const [expandedId, setExpandedId] = useState(null);

  // performing side effects (this is what the hook does)
  useEffect(() => {
    // fetching data from local storage
    const savedData = getData("inputDowntime") || [];
    console.log("Retrieved data from local storage:", savedData);
    // setting the state of downtimeData with the data retrieved from local storage
    setDowntimeData(savedData);
  }, []);

  // handler function to edit reason based on id
  const handleEdit = (id) => {
    // state setter to update state of editId
    setEditId(id);
  };

  // handler function to update specific reason based on id
  const handleUpdateReason = (id, updatedReason) => {
    // fetching current data
    const currentData = getData("inputDowntime") || [];
    // updating the array by mapping
    const updatedData = currentData.map((entry) => {
      if (entry.id === id) {
        // creating and returning a new object with the same values as before (via spread operator) except reason is updated reason
        return { ...entry, reason: updatedReason };
        // if the ids don't match, return the same entry
      } else return entry;
    });
    // saving updated data
    setData("inputDowntime", updatedData);
    // updating state so UI rerenders
    setDowntimeData(updatedData);
    // resetting the id to null so that the entry is not being edited anymore
    setEditId(null);
  };

  // deleting specific entry based on id
  const handleEntryDelete = (id) => {
    // fetching current data
    const currentData = getData("inputDowntime") || [];
    // filtering out the entry based on id
    const updatedData = currentData.filter((entry) => entry.id !== id);
    // saving the filtered data
    setData("inputDowntime", updatedData);
    // updating the state so UI rerenders
    setDowntimeData(updatedData);
  };

  return (
    <div>
      <h1>Downtimes</h1>
      {downtimeData.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(downtimeData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th>Edit Reason</th>
            </tr>
          </thead>
          <tbody>
            {downtimeData.map((entry, index) => (
              <tr key={index}>
                {Object.keys(entry).map((key) => (
                  <td key={key}>
                    {key === "id" ? (
                      entry.id
                    ) : key === "reason" ? (
                      expandedId === entry.id ? (
                        <span>
                          {entry[key]}
                          <button onClick={() => setExpandedId(null)}>
                            Show Less
                          </button>
                        </span>
                      ) : (
                        <span>
                          {entry[key].length > 50
                            ? entry[key].substring(0, 50) + "..."
                            : entry[key]}
                          {entry[key].length > 50 && (
                            <button onClick={() => setExpandedId(entry.id)}>
                              Show More
                            </button>
                          )}
                        </span>
                      )
                    ) : typeof entry[key] === "object" ? (
                      JSON.stringify(entry[key])
                    ) : (
                      entry[key]
                    )}
                  </td>
                ))}
                <td>
                  {editId === entry.id ? (
                    <EditDowntime
                      id={entry.id}
                      initialReason={entry.reason}
                      onSave={(id, updatedReason) =>
                        handleUpdateReason(id, updatedReason)
                      }
                    />
                  ) : (
                    <div>
                      <button onClick={() => handleEdit(entry.id)}>Edit</button>
                      <DeleteDowntime
                        onDelete={() => handleEntryDelete(entry.id)}
                      />
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

export default ReadDowntime;
