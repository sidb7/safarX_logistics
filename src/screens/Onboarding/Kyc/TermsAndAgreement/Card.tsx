import { useEffect, useState } from "react";
import { POST } from "../../../../utils/webService";
import { POST_GET_SINGLE_FILE } from "../../../../utils/ApiUrls";
import LogisticsServicesAgreement from "./LogisticsServicesAgreement";

interface ITypesProps {
  title?: string;
  subTitleOne?: string;
  titleClassName?: string;
}

const Card = (props: ITypesProps) => {
  const { title, titleClassName } = props;
  // const [pdfUrl, setPdfUrl] = useState("");

  // async function fetchPdf() {
  //   try {
  //     const payload = { fileName: "SERVICE_AGREEMENT" };
  //     const { data: response } = await POST(POST_GET_SINGLE_FILE, payload);

  //     setPdfUrl(response.data[0]);
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // useEffect(() => {
  //   fetchPdf();
  // }, []);

  return (
    <div className="flex flex-col  border-[1px] rounded border-[#E8E8E8]  py-4">
      <div>
        <p
          className={`font-bold  font-Open  text-[16px] text-[#1C1C1C] text-center mb-3 ${titleClassName}`}
        >
          {title}
        </p>
        <div className="px-2 flex flex-col gap-y-2">
          <div className="h-[370px] w-full overflow-x-auto ">
            {/* <iframe src={pdfUrl} className="h-full w-full" title="PDF"></iframe> */}
            <LogisticsServicesAgreement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
