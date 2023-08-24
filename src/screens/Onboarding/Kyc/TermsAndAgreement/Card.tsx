import { useEffect, useState } from "react";
import { POST } from "../../../../utils/webService";
import { POST_GET_SINGLE_FILE } from "../../../../utils/ApiUrls";

interface ITypesProps {
  title?: string;
  subTitleOne?: string;
  titleClassName?: string;
}

const Card = (props: ITypesProps) => {
  const { title, titleClassName } = props;
  const [pdfUrl, setPdfUrl] = useState("");

  async function fetchPdf() {
    try {
      const payload = { fileName: "SHIPYAARI_AGREEMENT" };
      const { data: response } = await POST(POST_GET_SINGLE_FILE, payload);

      setPdfUrl(response.data[0]);
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    fetchPdf();
  }, []);

  return (
    <div className="flex flex-col  border-[1px] rounded border-[#E8E8E8]  py-[27px]">
      <div>
        <p
          className={`font-semibold  font-Open  text-[16px] text-[#1C1C1C] text-center mb-3 ${titleClassName}`}
        >
          {title}
        </p>
        <div className="px-8 flex flex-col gap-y-2">
          {/* <p className="font-semibold text-[16px] text-[#323232] font-Open ">
            {`1.${subTitleOne}`}
          </p> */}
          {/* <p className="h-[370px] overflow-y-scroll lg:text-[12px] font-Open  ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            fugit accusamus nisi, iusto voluptas dolores repellendus minus vel
            reiciendis corrupti facere assumenda ipsum corporis totam
            consequuntur quam culpa, quo ipsam. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Consequatur perferendis qui eius
            officia fugit in excepturi expedita, id doloremque atque numquam
            placeat hic aut dolores voluptates ab non debitis provident! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus id
            adipisci nesciunt atque veniam omnis fuga error expedita non saepe
            optio debitis deserunt nobis ipsum, dolorem esse dignissimos
            aspernatur sit. Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Dolorum, ipsa. Aperiam temporibus officia assumenda
            consequuntur ea. Quia, qui nisi dolorem officia dolor eum dicta
            exercitationem suscipit eos ab et enim. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Non, ab hic delectus distinctio
            consequuntur aliquam culpa fugit nesciunt vitae sed quod nisi nam
            accusamus. Quis numquam sunt ipsam obcaecati nesciunt. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Culpa aspernatur eius,
            mollitia dignissimos reprehenderit velit placeat facilis odio iste
            dolor, ipsam aperiam odit similique impedit quis. Similique
            temporibus quas molestias! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Nemo odio non incidunt et ea soluta dolore dolorum
            expedita ratione temporibus vitae, possimus magni laboriosam commodi
            eum. Quo architecto eaque harum!
          </p> */}
          <div className="h-[370px] overflow-y-scroll">
            <iframe src={pdfUrl} className="h-full w-full" title="PDF"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
