import React, { useEffect, useRef } from "react";
import { Timeline } from "vis-timeline";
import { DataSet } from "vis-data/peer/esm/vis-data";
// import styles
import "vis-timeline/styles/vis-timeline-graph2d.css";
import "./downtimeTimeline.css"

const DowntimeTimeline = ({ data }) => {
    // ref for the dom element where the timeline will be attached
  const timelineRef = useRef();

  useEffect(() => {
    const items = new DataSet();

    // adding each entry to the dataset
    data.forEach((entry) => {
      items.add({
        id: entry.id,
        start: new Date(entry.startDate),
        end: new Date(entry.endDate),
        content: `${entry.reason} (${entry.site}, ${entry.telescope})`,
      });
    });

  
  const options = {
    animateWindow: {
      follow: false,
      offset: 0.5
    },
  };
  

    const timeline = new Timeline(timelineRef.current, items, options);

    // I asked chatgpt why my timeline imported from vis-timeline was getting rendering more than once
    //and it recommended adding this cleanup function to prevent duplicates
    return () => {
      timeline.destroy();
    };
  }, [data]);

  return (
    <div className="timeline" ref={timelineRef} style={{ width: "100%", height: "400px" }}></div>
  );
};

export default DowntimeTimeline;