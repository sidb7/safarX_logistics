import "../../styles/inputBox.css";

interface IInputBoxProps {
  type?: string;
  label?: string;
  className?: string;
  name?: string;
  value?: string | number;
  inputMode?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Index: React.FunctionComponent<IInputBoxProps> = ({
  label,
  className,
  type = "text",
  name,
  value,
  inputMode = "",
  onChange,
}) => {
  return (
    <div className={`container ${className}`}>
      <div className="textfield">
        <input
          placeholder=" "
          type={type}
          inputMode={inputMode}
          title="inputBox"
          name={name}
          value={value}
          onChange={onChange}
        />
        <label>{label}</label>
      </div>
    </div>
  );
};

export default Index;
