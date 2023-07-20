interface IOrderCardProps {
  gif?: any;
  showGif?: boolean;
  label: string;
  number: string
}
export const OrderCard: React.FunctionComponent<IOrderCardProps> = ({
  gif = "",
  showGif = false,
  label,
  number,
}) => {
  return (
    <div className="relative">
      <div className="flex justify-between border-[1px] border-[#A4A4A4] rounded-md h-[96px] lg:w-[272px] shadow-lg">
        <div className="flex flex-col justify-center ">
          <span className="ml-4 text-base font-medium">{label}</span>
          <span className="ml-4 mt-2.5 text-base font-bold text-[#1C1C1C]">
            {number}
          </span>
        </div>
        {showGif && (
          <div className=" flex items-end z-1">
            <img src={gif} alt="" width="124px" />
          </div>
        )}
      </div>
    </div>
  );
};
