interface IAddButtonProps {
  text: any;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  type?: any;
  iconClass?: any;
  icon?: any;
  showIcon?: boolean;
  alt?: string;
  textClassName?: string;
}

const AddButton = (props: IAddButtonProps) => {
  const {
    text,
    onClick,
    className,
    disabled,
    type = "button",
    showIcon = false,
    icon,
    iconClass,
    alt,
    textClassName,
  } = props;
  return (
    <button
      type={type}
      className={`${className} inline-flex  bg-[#F2F6FF] rounded-[4px] shadow-sm p-2 justify-center items-center`}
      onClick={onClick}
      disabled={disabled}
    >
      {showIcon && <img className={`${iconClass} mr-2`} src={icon} alt={alt} />}
      <p
        className={`${textClassName} text-[#004EFF] text-sm font-semibold leading-5`}
      >
        {text}
      </p>
    </button>
  );
};

export default AddButton;
