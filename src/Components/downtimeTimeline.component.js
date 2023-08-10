import React, { useEffect, useRef } from 'react';
import { Timeline } from 'vis-timeline';
import { DataSet } from "vis-data/peer/esm/vis-data";
// import styles
import 'vis-timeline/styles/vis-timeline-graph2d.css'; 


const DowntimeTimeline = ({ data }) => {
    console.log("this is data", data);
  const timelineRef = useRef();

  const generateContent = (entry) => {
    return `
      <strong>Reason:</strong> ${entry.reason}<br/>
      <strong>Site:</strong> ${entry.site}<br/>
      <strong>Telescope:</strong> ${entry.telescope}<br/>
      <strong>Start Date:</strong> ${entry.startDate}<br/>
      <strong>End Date:</strong> ${entry.endDate}
    `;
};


  useEffect(() => {
    const items = new DataSet();

    data.forEach((entry) => {
      const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`; // Generates a random color
      items.add({
        id: entry.id,
        start: new Date(entry.startDate),
        end: new Date(entry.endDate),
        content: generateContent(entry),
        style: `background-color: ${randomColor}; color: #FFF;`
      });
    }, [data]);

    const options = {
      rollingMode: {
        follow: true,
        offset: 0.5
      },
      start: new Date(),
      end: new Date(new Date().getTime() + 1000 * 60 * 60 * 24), // one day in the future
      verticalScroll: true,
      zoomKey: 'ctrlKey'
    };

    new Timeline(timelineRef.current, items, options);
  }, [data]);

  return <div ref={timelineRef} style={{ width: '100%', height: '300px' }} />;
};

export default DowntimeTimeline;
