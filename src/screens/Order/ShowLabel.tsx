import { POST } from "../../utils/webService";
import { GET_SINGLE_FILE } from "../../utils/ApiUrls";
import { toast } from "react-toastify";
import downloadIcon from "../../assets/download.svg";
import { useState } from "react";
interface IShowLabelProps {
  fileUrl?: string;
}

const ShowLabel: React.FunctionComponent<IShowLabelProps> = (props) => {
  const { fileUrl } = props;
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const showTooltip = () => {
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };

  const getSingleFile = async (url: any) => {
    const { data } = await POST(GET_SINGLE_FILE, {
      fileName: `labels/${url}`,
    });
    if (data?.status) {
      console.log("from label file", data);
      window.location.href = data?.data;
      // setIsPDFOpen(true);/
      // setPDFurl(data?.data);
    } else {
      toast.error(data?.meesage);
    }
  };

  return (
    <div className="relative inline-block mx-2">
      <img
        src={downloadIcon}
        alt=""
        onMouseOver={showTooltip}
        onMouseOut={hideTooltip}
        className="w-6 h-6 cursor-pointer text-[#004EFF] underline-offset-4 underline  decoration-2 "
        onClick={() => getSingleFile(fileUrl)}
      />
      {isTooltipVisible && (
        <div className="bg-gray-800 ml-2 text-white text-xs rounded-md px-2 py-1 absolute bottom-full left-1/2 transform -translate-x-1/2 transition-opacity duration-300 opacity-100 pointer-events-none">
          Download Label
        </div>
      )}
    </div>
  );
};

export default ShowLabel;
