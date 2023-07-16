import React from "react";
import "../../styles/inputBox.css";
interface IInputBoxProps {
  type?: string;
  label: string;
  className?: string;
}
const Index: React.FunctionComponent<IInputBoxProps> = ({
  label,
  className,
  type = "text",
}) => {
  return (
    <div className={`container ${className}`}>
      <div className="textfield">
        <input placeholder=" " type={type} title="inputBox" />
        <label>{label}</label>
      </div>
    </div>
  );
};
export default Index;