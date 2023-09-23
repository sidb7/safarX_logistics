import CustomRadioButton from "../../../../components/RadioButton/Index";
interface ITypesProps {
  name: string;
  value: string;
  title: string;
  subTitle?: string;
  titleClassName?: string;
  subContent?: string;
  isSubContent?: boolean;
  cardClassName?: string;

  doctype?: string;
  onClick?: (e?: any) => void;
  checked?: boolean;
}

const card = (props: ITypesProps) => {
  const {
    name,
    value,
    title,
    titleClassName,
    subContent,
    isSubContent,
    cardClassName,
    doctype,

    onClick = () => {},
    checked,
  } = props;

  return (
    <>
      <div
        className={` ${cardClassName} border-[1px] rounded-lg p-4 shadow ${
          !checked ? "border-[#E8E8E8]" : "border-[black]"
        } w-full lg:!w-[320px] relative`}
        onClick={(e: any) => {
          onClick(value);
        }}
      >
        <div className="flex items-center   gap-x-3 ">
          <CustomRadioButton
            name={name}
            value={value}
            style={{ accentColor: "black" }}
            inputClassName="cursor-pointer"
            checked={checked}
          />
          {doctype && (
            <p className="text-[10px] font-Open font-normal border-[0.5px] border-[#E8E8E8] p-1 rounded-md">
              {doctype}
            </p>
          )}

          {isSubContent && (
            <div className="border-[1px] rounded px-1 border-[#E8E8E8]  ">
              <p className="font-Open font-normal text-[10px] leading-4  ">
                {subContent}
              </p>
            </div>
          )}

          <p
            className={`${titleClassName} font-Open  font-semibold text-[16px] text-[#1C1C1C] leading-4`}
          >
            {title}
          </p>
        </div>
      </div>
    </>
  );
};

export default card;
