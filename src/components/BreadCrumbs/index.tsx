import { useNavigate } from "react-router-dom";
import { GetCurrentPath, capitalizeFirstLetter } from "../../utils/utility";

interface propTypes {
  data: any;
}

const CustomBreadcrumb = () => {
  const data = GetCurrentPath();
  const navigate = useNavigate();
  const fetchedLastItem = data[data?.length - 1];
  if (fetchedLastItem === "") {
    data.pop();
  }

  const handleClick = (index: number, el: any) => {
    if (index === 0 || index === data?.length - 1) return;
    return navigate(-1);

    // if (el === "user-management") {
    //   return navigate("/employee-management/user-management");
    // } else {
    //   return navigate(-1);
    // }
    // if (el === "user-management") {
    //   return navigate("/client-management/client-list");
    // } else if (el === "pincode-management") {
    //   return;
    // } else if (el === "manage-services") {
    //   return;
    // } else {
    //   navigate(-1);
    // }
  };

  return (
    <div className={`hidden lg:flex gap-x-2 my-4  `}>
      <div
        className={`flex items-center gap-x-2 cursor-pointer`}
        onClick={() => navigate("/")}
      >
        <p className="!mb-0 hover:underline font-semibold font-Open text-sm lg:text-xl md:text-lg text-[#1C1C1C]">
          Home
        </p>
        <div>
          <span className="text-2xl">/</span>
        </div>
      </div>
      {/* Render the rest of the breadcrumbs */}
      {data?.map((el: any, index: number) => {
        return (
          <div
            className={`flex items-center gap-x-2 ${
              index === 0 ? " cursor-not-allowed " : ""
            } `}
            key={index}
          >
            <p
              className={`${
                index === 0
                  ? "cursor-not-allowed text-[#777777]"
                  : el === "pincode-management"
                  ? "cursor-not-allowed"
                  : el === "manage-services"
                  ? "cursor-not-allowed"
                  : "hover:underline cursor-pointer "
              } !mb-0 font-semibold font-Open text-sm lg:text-xl md:text-lg text-[#1C1C1C]`}
              onClick={() => {
                handleClick(index, el);
              }}
            >
              {capitalizeFirstLetter(el)}
            </p>
            <div>
              {index !== data?.length - 1 && (
                <span className="text-2xl">/</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CustomBreadcrumb;
