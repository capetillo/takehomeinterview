import React, { useState, useEffect } from "react";
// importing utility function to avoid repetition
import { retrieveDowntimeData, storeDowntimeData } from "../Utils/storage";
// importing component
import DowntimeTable from "./downtimeTable.component";
import DowntimeTimeline from "./downtimeTimeline.component";
import "./read-downtime.css"

const ReadDowntime = () => {
  // using useState hook to keep track of changing values
  const [downtimeData, setDowntimeData] = useState([]);
  // initializing editId to null since no reason has been edited
  const [editId, setEditId] = useState(null);
  // state to expand reason. Initializing to null
  const [expandedId, setExpandedId] = useState(null);
  // state of keyword entry to be able to filter later
  const [lookupKeyword, setLookupKeyword] = useState("");

  // performing side effects (this is what the hook does)
  useEffect(() => {
    // fetching data from local storage
    const savedData = retrieveDowntimeData("inputDowntime") || [];
    console.log("Retrieved data from local storage:", savedData);
    // converting date strings into Dates and sorting it in descending order
    savedData.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
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
    const currentData = retrieveDowntimeData("inputDowntime") || [];
    // updating the array by mapping
    const updatedData = currentData.map((entry) => {
      if (entry.id === id) {
        // creating and returning a new object with the same values as before (via spread operator) except reason is updated reason
        return { ...entry, reason: updatedReason };
        // if the ids don't match, return the same entry
      } else return entry;
    });
    // saving updated data
    storeDowntimeData("inputDowntime", updatedData);
    // updating state so UI rerenders
    setDowntimeData(updatedData);
    // resetting the id to null so that the entry is not being edited anymore
    setEditId(null);
  };

  // deleting specific entry based on id
  const handleEntryDelete = (id) => {
    // fetching current data
    const currentData = retrieveDowntimeData("inputDowntime") || [];
    // filtering out the entry based on id
    const updatedData = currentData.filter((entry) => entry.id !== id);
    // saving the filtered data
    storeDowntimeData("inputDowntime", updatedData);
    // updating the state so UI rerenders
    setDowntimeData(updatedData);
  };

  const filteredData = lookupKeyword
    ? downtimeData.filter(
        (entry) =>
          entry.telescope.toLowerCase().includes(lookupKeyword.toLowerCase()) ||
          entry.site.toLowerCase().includes(lookupKeyword.toLowerCase())
      )
    : downtimeData;

  return (
    <div>
      <h1>DOWNTIMES</h1>
      <input
      className="search-bar"
        type="text"
        placeholder="Search by telescope or site..."
        value={lookupKeyword}
        onChange={(e) => setLookupKeyword(e.target.value)}
      />

      {filteredData.length > 0 ? (
        <DowntimeTable
          // passing down props to be able to handle edits, updates, and deletes
          data={filteredData}
          handleEdit={handleEdit}
          handleEntryDelete={handleEntryDelete}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
          editId={editId}
          handleUpdateReason={handleUpdateReason} // pass it down here
        />
      ) : (
        <p>No matching downtime data available.</p>
      )}
      <DowntimeTimeline data={downtimeData} />
    </div>
  );
};
export default ReadDowntime;
