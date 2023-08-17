import UploadIcon from "../../assets/Product/Upload.svg";
import { useMediaQuery } from "react-responsive";
import Upload from "../../assets/uploadinbutton.svg";

const Index = () => {
  const isLgScreen = useMediaQuery({
    query: "(min-width:1024px)",
  });
  return (
    <div className=" flex justify-between items-center border-2 rounded-md h-12">
      <span className="text-gray-400 ml-4 text-xs">
        Upload product photo (optional)
      </span>
      <div className="flex mr-2 items-center">
        <img
          className="mr-2"
          src={`${isLgScreen ? Upload : UploadIcon}`}
          alt="Upload product"
          width="16px"
        />
        {isLgScreen && (
          <span className="text-[14px] text-[#004EFF] font-semibold">
            UPLOAD
          </span>
        )}
      </div>
    </div>
  );
};

export default Index;
