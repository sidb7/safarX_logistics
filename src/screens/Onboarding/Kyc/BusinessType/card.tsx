import CustomRadioButton from "../../../../components/RadioButton/Index";
import { useDispatch } from "react-redux";
import { setBusinessType } from "../../../../redux/reducers/onboarding";

interface ITypesProps {
  name: string;
  value: string;
  title: string;
  subTitle: string;
}

const Card = (props: ITypesProps) => {
  const { name, value, title, subTitle } = props;
  const dispatch = useDispatch();

  return (
    <>
      <div className=" border-[1px] rounded-lg p-4 mb-2 border-[#E8E8E8] shadow w-full">
        <div className="flex flex-col">
          <div className="flex items-center h-6 gap-x-2 ">
            <CustomRadioButton
              name={name}
              value={value}
              style={{ accentColor: "black" }}
              inputClassName="cursor-pointer"
              onChange={(e) => {
                dispatch(setBusinessType(e.target.value));
              }}
            />
            <p className="font-semibold font-Open text-base text-[#1C1C1C] leading-[22px]">
              {title}
            </p>
          </div>
          <div className=" px-6">
            <p className="font-normal font-Open text-[10px] text-[#777777] leading-4 ">
              {subTitle}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
