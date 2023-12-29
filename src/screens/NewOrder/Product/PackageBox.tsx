import "../../../styles/packageStyle.css";
import EditIcon from "../../../assets/Product/Edit.svg";
import DeleteIcon from "../../../assets/DeleteIconRedColor.svg";
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
  showAction?: boolean;
  handleAction?: any;
  deleteSellerBox?: any;
  setIsDeleteModalOpen?: any;
  setDeleteBoxData?: any;
  index?: any;
  setDeleteBoxIndex?: any;
  data?: any;
  setDeleteData?: any;
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
  showAction = false,
  handleAction,
  deleteSellerBox,
  setIsDeleteModalOpen,
  index,
  setDeleteBoxIndex,
  data,
  setDeleteData,
}) => {
  return (
    <div className={recommended ? "relative py-2" : "py-2"}>
      <div
        className={`flex flex-col py-3 px-4 justify-center !w-64  ${
          selected ? "border-[#004EFF]" : ""
        }  lg:w-full border-2 rounded-md  package-box `}
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
        <div className="flex justify-between font-bold leading-6 py-1  font-Open ">
          <div className="max-w-[140px] whitespace-nowrap truncate">
            {packageType}
          </div>

          {showAction && (
            <div className="cursor-pointer flex">
              <img
                src={EditIcon}
                alt=""
                onClick={handleAction}
                className="w-4 mx-2"
              />
              <img
                src={DeleteIcon}
                alt=""
                // onClick={deleteSellerBox}
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setDeleteBoxIndex(index);
                  setDeleteData(data);
                }}
                className="w-4 mx-2"
              />
            </div>
          )}
        </div>
        <div className="flex text-sm">
          <span className="leading-6  font-Open">{`${volumetricWeight} Kg`}</span>
          <span className="leading-6  font-Open pl-1">{` |  ${height} x ${breadth} x ${length} cm`}</span>
        </div>
        <div className="text-gray-400">{boxType}</div>
      </div>
    </div>
  );
};

export default PackageBox;
