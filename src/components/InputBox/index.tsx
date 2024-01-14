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
  function camelCaseToWords(s: string = "") {
    const result = s.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  return (
    <div className={`container ${className}`}>
      <div className="textfield">
        <input
          placeholder=" "
          type={type}
          inputMode={inputMode}
          title={camelCaseToWords(name) || "inputBox"}
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
