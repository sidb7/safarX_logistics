// import "../../../../styles/packageStyle.css";
import "../../../../../styles/packageStyle.css";
interface IPackageBoxProps {
  recommended?: boolean;
  packageType: string;
  weight: string;
  dimension: string;
  boxType: string;
}

const PackageBox: React.FunctionComponent<IPackageBoxProps> = ({
  recommended = false,
  packageType = "",
  weight = "",
  dimension = "",
  boxType = "",
}) => {
  return (
    <div className={recommended ? "relative py-2" : "py-2"}>
      <div className="flex flex-col py-2 justify-center h-[94px] w-[248px] border-2 rounded-xl px-4 package-box bg-gradient-to-br from-[#E7E4FF] via-[#CFDFFF] to-[#F8F8FF] border-[#9082FF] shadow-md relative">
        {recommended ? (
          <span className="absolute top-0 left-4 bg-[#9082FF] border-2 border-[#9082FF] rounded-md text-white text-xs px-4 h-[22px] flex items-center font-bold shadow">
            Recommended
          </span>
        ) : null}
        <span className="font-semibold mt-4 text-[#160783] text-base">
          {packageType}
        </span>
        <div className="flex items-center mt-1">
          <span className="font-bold text-[#9082FF]">{weight}</span>
          <span className="pl-1 text-[#494949]">{`Kg | ${dimension} cm`}</span>
        </div>
        <span className="text-[#9082FF] font-medium mt-1">{boxType}</span>
      </div>
    </div>
  );
};

export default PackageBox;
