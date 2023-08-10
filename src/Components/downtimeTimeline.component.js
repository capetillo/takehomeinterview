import React, { useEffect, useRef } from 'react';
import { Timeline } from 'vis-timeline';
import { DataSet } from "vis-data/peer/esm/vis-data";


const DowntimeTimeline = ({ data }) => {
  const timelineRef = useRef();

  useEffect(() => {
    const items = new DataSet();

    data.forEach((entry) => {
      items.add({
        id: entry.id,
        start: new Date(entry.startDate),
        end: new Date(entry.endDate),
        content: `${entry.reason} (${entry.site}, ${entry.telescope})`,
      });
    });

    const options = {

            format: {
                minorLabels: {
                  second: 's',
                  minute: 'H:mm',
                  hour: 'H:mm',
                  weekday: 'ddd D',
                  day: 'D',
                  month: 'MMM',
                  year: 'YYYY'
                },
                majorLabels: {
                  second: 'D MMMM H:mm',
                  minute: 'ddd D MMMM',
                  hour: 'ddd D MMMM',
                  weekday: 'MMMM YYYY',
                  day: 'MMMM YYYY',
                  month: 'YYYY',
                  year: 'YYYY'
                }
              }, 
              zoomable: true,
              moveable: true

    };

    new Timeline(timelineRef.current, items, options);
  }, [data]);

  return <div ref={timelineRef} style={{ width: '100%', height: '300px' }} />;
};

export default DowntimeTimeline;

