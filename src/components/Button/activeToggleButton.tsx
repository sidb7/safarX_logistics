import ToggleSwitch from "../../assets/toggle-on-circle.svg";
import CustomSwitchToggle from "../CustomSwitchToggle";
interface IActiveButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  type?: any;
  iconClass?: any;
  icon?: any;
  showIcon?: boolean;
  alt?: string;
  textClassName?: string;
  value?: boolean;
}

const ActiveButton = (props: IActiveButtonProps) => {
  const {
    onClick,
    disabled,
    type = "button",
    alt,
    textClassName,
    className,
  } = props;
  let { value } = props;
  return (
    <div
      // type={type}
      className={`${className} bg-[#white] border-[1.5px] border-[#white] rounded-md px-4 py-2  inline-flex  justify-center items-center cursor-pointer`}
      // onClick={onClick}
      // disabled={disabled}
    >
      <CustomSwitchToggle initValue={value} toggleValue={() => onClick()} />
      {/* <img src={ToggleSwitch} alt={alt} /> */}
      <p className={`${textClassName} text-[#black] text-md  ml-2 `}>
        {value ? "DEACTIVATE" : "ACTIVATE"}
      </p>
    </div>
  );
};

export default ActiveButton;
