import React from "react";

const VerticalTimeline = ({ events }: any) => {
  return (
    <div className="vertical-timeline">
      {events.map((event: any, index: number) => (
        <div
          className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
          key={index}
        >
          <div className="timeline-content">
            <h3>{event.date}</h3>
            <p>{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalTimeline;
