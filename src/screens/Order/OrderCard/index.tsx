interface IOrderCardProps {
  gif?: any;
  showGif?: boolean;
  label: string;
  number: string;
}
export const OrderCard: React.FunctionComponent<IOrderCardProps> = ({
  gif = "",
  showGif = false,
  label,
  number,
}) => {
  return (
    <div className="relative w-full">
      <div className="flex w-full justify-between border-[1px] border-[#A4A4A4] rounded-md h-[96px] shadow-lg">
        <div className="flex flex-col justify-center px-4 ">
          <span className="text-base text-[#494949]">{label}</span>
          <span className="text-xl mt-2.5  font-bold text-[#1C1C1C]">
            {number}
          </span>
        </div>
        {showGif ? (
          <div className=" flex items-end z-1">
            <img src={gif} alt="" width="125px" />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
