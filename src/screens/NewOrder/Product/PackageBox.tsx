import "../../../styles/packageStyle.css";
interface IPackageBoxProps {
  recommended?: boolean;
  packageType: string;
  volumetricWeight: string;
  dimension?: string;
  boxType: string;
  height?: string;
  breadth?: string;
  length?: string;
  selected?: boolean;
}

const PackageBox: React.FunctionComponent<IPackageBoxProps> = ({
  recommended = false,
  packageType = "",
  selected = false,
  volumetricWeight = "",
  boxType = "",
  height = "",
  breadth = "",
  length = "",
}) => {
  return (
    <div className={recommended ? "relative py-2" : "py-2"}>
      <div
        className={`flex flex-col  py-2 justify-center !w-64  ${
          selected ? "border-[#004EFF]" : ""
        }  lg:w-full border-2 rounded-md px-4 package-box`}
      >
        {recommended ? (
          <span
            className={`absolute top-0 bg-sky-500 rounded-md  border-2  border-sky-500 text-white text-xs px-4 h-[20px]`}
          >
            Recommended
          </span>
        ) : (
          ""
        )}
        <span className="font-bold leading-6 py-1 font-Open">
          {packageType}
        </span>
        <div className="flex">
          <span className="leading-6  font-Open">{`${volumetricWeight} Kg`}</span>
          <span className="leading-6  font-Open pl-1">{` |  ${height} x ${breadth} x ${length} cm`}</span>
        </div>
        <div className="text-gray-400">{boxType}</div>
      </div>
    </div>
  );
};

export default PackageBox;
