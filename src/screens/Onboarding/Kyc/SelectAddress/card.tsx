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
  onClick?: (e: any) => void;
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
    onClick,
  } = props;

  return (
    <>
      <div
        className={` ${cardClassName} border-[1px] rounded-lg p-4 shadow border-[#E8E8E8] w-full lg:!w-[320px] relative`}
        onClick={onClick}
      >
        <div className="flex items-center   gap-x-3 ">
          <CustomRadioButton
            name={name}
            value={value}
            style={{ accentColor: "black" }}
            inputClassName="cursor-pointer"
          />

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
          {doctype && (
            <p className="absolute -top-3 right-2 text-[10px] font-semibold bg-[#1C1C1C] text-white px-2 py-1 rounded-md">
              {doctype}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default card;
