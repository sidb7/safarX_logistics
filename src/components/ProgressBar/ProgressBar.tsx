import * as React from "react";
import "./progressbar.css";
interface IProgressBarProps {}

const ProgressBar: React.FunctionComponent<IProgressBarProps> = (props) => {
  return (
    <div className="w-full">
      <div className="progress-bar h-[2px] bg-gray-200 w-full overflow-hidden">
        <div className="progress-bar-value w-full h-full bg-black"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
