import "../../../styles/packageStyle.css";
interface IPackageBoxProps {
  recommended?: boolean;
  packageType: string;
  weight: string;
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
  weight = "",
  dimension = "",
  boxType = "",
  height = "",
  breadth = "",
  length = "",
}) => {
  return (
    <div className={recommended ? "relative py-2" : "py-2"}>
      <div
        className={`flex flex-col  py-2 justify-center   ${
          selected ? "border-3 border-black" : ""
        } h-[94px] w-[248px] lg:w-full border-2 rounded-md px-4 package-box`}
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
        <span className="font-medium mt-2">{packageType}</span>
        <div className="flex">
          <span className="font-medium">{weight}</span>
          <span className="pl-1">{` |  ${height} x ${breadth} x ${length} cm`}</span>
        </div>
        <span className="text-gray-400">{boxType}</span>
      </div>
    </div>
  );
};

export default PackageBox;
