import React from 'react';

const DowntimeTable = ({ data }) => {
    return (
      <table>
        <thead>
          <tr>
            {/* Displaying headers for the table */}
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Actions</th> {/* For Edit, Delete, etc. */}
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <DowntimeEntry
              key={entry.id}
              entry={entry}
              // You can also pass down the handlers if needed
            />
          ))}
        </tbody>
      </table>
    );
  };
  
  const DowntimeEntry = ({ entry }) => {
    return (
      <tr>
        {Object.keys(entry).map((key) => (
          <td key={key}>
            {key === "reason" && entry[key].length > 50 
              ? `${entry[key].substring(0, 50)}...` 
              : entry[key]}
          </td>
        ))}
        <td>
          {/* Action buttons like Edit, Delete, etc. */}
          <button>Edit</button>
          <button>Delete</button>
        </td>
      </tr>
    );
  };
  
  export default DowntimeTable;
  