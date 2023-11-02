import { useRef, useState } from "react";
import CustomRadioButton from "../../../../components/RadioButton/Index";
import EditIcon from "../../../../assets/OrderDetails/EditIcon.svg";
interface ITypesProps {
  name: string;
  value: string;
  title: string;
  subTitle?: string;
  titleClassName?: string;
  subContent?: string;
  isSubContent?: boolean;
  cardClassName?: string;
  index?: number;
  updatedAddress?: any;

  doctype?: string;
  onClick?: (e?: any) => void;
  checked?: boolean;
}

const Card = (props: ITypesProps) => {
  const {
    name,
    value,
    title,
    titleClassName,
    subContent,
    isSubContent,
    cardClassName,
    doctype,
    index,
    updatedAddress,

    onClick = () => {},
    checked,
  } = props;
  const [editAdd, setEditAdd] = useState<number>();
  const [updateTempAdd, setUpdateTempAdd] = useState<any>(title);
  const boxRef = useRef<any>();

  const editAddress = (id: any) => {
    setTimeout(() => {
      boxRef.current && boxRef.current.focus();
      if (boxRef.current) {
        boxRef.current.style.border = "2px solid #004EFF";
      }
    }, 100);

    setEditAdd(id);
  };

  const blurFunction = () => {
    setEditAdd(-1);
    updatedAddress(updateTempAdd, index);
  };

  return (
    <>
      <div
        className={` ${cardClassName} border-[1px] rounded-lg p-4 shadow ${
          !checked ? "border-[#E8E8E8]" : "border-[black]"
        } w-[320px] md:w-full relative`}
        onClick={(e: any) => {
          onClick(value);
        }}
      >
        <div className="flex items-center  gap-x-3 justify-around ">
          <CustomRadioButton
            name={name}
            value={value}
            style={{ accentColor: "black" }}
            inputClassName="cursor-pointer"
            checked={checked}
          />
          {doctype && (
            <p className="text-[10px] text-center font-Open font-normal border-[0.5px] border-[#E8E8E8] p-1 rounded-md w-[70px]">
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
            className={`${titleClassName} w-[200px] overflow-hidden font-Open  font-semibold text-[16px] text-[#1C1C1C] leading-4`}
          >
            {editAdd === index ? (
              <textarea
                value={updateTempAdd}
                onChange={(e) => setUpdateTempAdd(e.target.value)}
                className={`text-[12px] h-[77px] w-full outline-none rounded-lg p-2`}
                ref={boxRef}
                onBlur={() => blurFunction()}
              />
            ) : (
              updateTempAdd
            )}
          </p>
          <img
            className="!z-9999 cursor-pointer "
            src={EditIcon}
            onClick={() => editAddress(index)}
            alt="edit"
          />
        </div>
      </div>
    </>
  );
};

export default Card;
