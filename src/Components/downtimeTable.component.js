import React from "react";
import EditDowntime from "./edit-downtime.component";
import DeleteDowntime from "./delete-downtime.component";
import "./downtimeTable.css";

//rendering a table to display downtime data
// passing down props
// data: array of downtime data objects to be displayed
// handleEdit: triggers the edit mode for reason entry
// handleEntryDelete: deletes an entire entry
// handleUpdateReason: updates reason for an entry
// expandedId: if of entry whose reason is displayed
// setExpandedId: setter function for expandedId. makes reason expandable
// editId: id of the entry that is currently being edited
const DowntimeTable = ({
  data,
  handleEdit,
  handleEntryDelete,
  handleUpdateReason,
  expandedId,
  setExpandedId,
  editId,
}) => {
  return (
    <div className="table-parent">
    <table className="dt-table">
      <thead className="dt-head">
        <tr className="dt-tr">
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody className="dt-tbody">
        {data.map((entry, index) => (
          <tr key={index}>
            {Object.keys(entry).map((key) => (
              <td key={key}>
                {key === "id" ? (
                  entry.id
                ) : key === "reason" ? (
                  <>
                    {expandedId === entry.id ? (
                      <span>
                        {entry[key]}
                        <button className="button-as-link" onClick={() => setExpandedId(null)}>
                          Show Less
                        </button>
                      </span>
                    ) : (
                      <span>
                        {entry[key].length > 50
                          ? entry[key].substring(0, 50) + "..."
                          : entry[key]}
                        {entry[key].length > 50 && (
                          <button className="button-as-link" onClick={() => setExpandedId(entry.id)}>
                            Show More
                          </button>
                        )}
                      </span>
                    )}
                    {editId === entry.id ? (
                      <EditDowntime
                        id={entry.id}
                        initialReason={entry.reason}
                        onSave={(id, updatedReason) =>
                          handleUpdateReason(id, updatedReason)
                        }
                      />
                    ) : (
                      <button className="edit" onClick={() => handleEdit(entry.id)}>Edit</button>
                    )}
                  </>
                ) : typeof entry[key] === "object" ? (
                  JSON.stringify(entry[key])
                ) : (
                  entry[key]
                )}
              </td>
            ))}
            <td>
              <DeleteDowntime onDelete={() => handleEntryDelete(entry.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

  
  );
};

export default DowntimeTable;
