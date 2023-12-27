import React from "react";
import "../../styles/spinner.css";

export const Spinner = ({ parentClassName, className }: any) => {
  return (
    <div id="loading-bar-spinner" className={`spinner ${parentClassName}`}>
      <div className={`${className} spinner-icon`}></div>
    </div>
  );
};
