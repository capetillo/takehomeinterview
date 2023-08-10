import React from "react";

const DowntimeTable = ({ data, handleEdit, handleEntryDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          {/* Displaying headers for the table */}
          {data.length > 0 && Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
          <th>Actions</th> 
        </tr>
      </thead>
      <tbody>
        {data.map((entry) => (
           <DowntimeEntry key={entry.id} entry={entry} handleEdit={handleEdit} handleEntryDelete={handleEntryDelete} />
        ))}
      </tbody>
    </table>
  );
};

const DowntimeEntry = ({ entry, handleEdit, handleEntryDelete }) => {
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
        <button onClick={() => handleEdit(entry.id)}>Edit</button>
        <button onClick={() => handleEntryDelete(entry.id)}>Delete</button>
      </td>

    </tr>
  );
};

export default DowntimeTable;
