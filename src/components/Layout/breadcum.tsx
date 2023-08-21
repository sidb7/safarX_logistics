import BackArrowIcon from "../../assets/backArrow.svg";
interface IBreadcumProps {
  label: string;
}

export const Breadcum = ({ label }: IBreadcumProps) => {
  return (
    <div className="inline-flex space-x-2 items-center justify-start px-5 my-4">
      <img src={BackArrowIcon} alt="" className="lg:w-[16px]" />

      <p className="text-lg font-bold text-center text-[#1C1C1C] lg:text-[28px]">
        {label}
      </p>
    </div>
  );
};
