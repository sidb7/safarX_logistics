interface IDropDownProps {
  options: any;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: any;
  wrapperClass?: string;
  selectClassName?: string;
  name?: string;
}

const CustomDropDown = (props: IDropDownProps) => {
  const { options, onChange, value, wrapperClass, selectClassName, name } =
    props;

  return (
    <div className={`${wrapperClass}`}>
      <select
        onChange={onChange}
        value={value}
        className={` ${selectClassName} h-[48px] px-2 rounded block w-full bg-transparent border-[1px] border-[#A4A4A4] text-[12px] text-[#777777] outline-none `}
        title="DropDown"
        name={name}
      >
        {options.map((option: any, index: number) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropDown;
