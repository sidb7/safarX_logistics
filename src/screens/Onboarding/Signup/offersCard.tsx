import React from "react";
interface IProps {
  cardData?: any;
  wrapperClassName?: string;
  cardHeaderText: string;
  cardBodyText: string;
  cardFooterText: string;
}
const Card: React.FC<IProps> = (props: IProps) => {
  const { wrapperClassName, cardHeaderText, cardBodyText, cardFooterText } =
    props;
  return (
    <div className="flex-col  mx-4 py-1 align-center justify-center">
      <div
        className={`flex-row justify-center my-2 border rounded-lg  ${wrapperClassName}`}
      >
        <p className="ml-2 mt-1 text-sm font-semibold leading-5 font-Open text-[#202427]">
          {cardHeaderText}
        </p>
        <p className="ml-2 mt-2 text-[12px] font-semibold leading-4 font-Open text-[#606060]">
          {cardBodyText}
        </p>
        <p className="ml-2 mt-5 text-[12px] mb-1 font-normal font-Open leading-4 text-[#004EFF]">
          {cardFooterText}
        </p>
      </div>
    </div>
  );
};
export default Card;
