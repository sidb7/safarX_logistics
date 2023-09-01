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
  // const [pdfUrl, setPdfUrl] = useState("");

  // // async function fetchPdf() {
  // //   try {
  // //     const payload = { fileName: "SHIPYAARI_AGREEMENT" };
  // //     const { data: response } = await POST(POST_GET_SINGLE_FILE, payload);

  // //     setPdfUrl(response.data[0]);
  // //   } catch (error) {
  // //     return error;
  // //   }
  // // }

  // // useEffect(() => {
  // //   fetchPdf();
  // // }, []);

  return (
    <div className="flex flex-col  border-[1px] rounded border-[#E8E8E8]  py-[27px]">
      <div>
        <p
          className={`font-bold  font-Open  text-[16px] text-[#1C1C1C] text-center mb-3 ${titleClassName}`}
        >
          {title}
        </p>
        <div className="px-8 flex flex-col gap-y-2">
          <div className="h-[370px] overflow-y-scroll">
            {/* <iframe src={pdfUrl} className="h-full w-full" title="PDF"></iframe> */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <h2>(to be printed on Letterhead of the business entity)</h2>
            </div>

            <div style={{ textAlign: "center" }}>
              <p>DECLARATION OF GST NON-ENROLMENT</p>
              <p>To AVN Business Solutions Pvt. Ltd.</p>
              <p>12A, 3rd Floor, Techniplex - II,</p>
              <p>Techniplex Complex, S.V.Road,</p>
              <p>Off Veer Savarkar Flyover, Goregaon West,</p>
              <p>Mumbai, Maharashtra 400062</p>
            </div>

            <div style={{ marginTop: "20px" }}>
              <p>Dear Sir/Madam,</p>
              <p>Sub: Declaration of:</p>
              <ol>
                <li>
                  Non-requirement of registration under the
                  Central/State/UT/Integrated Goods and Services Tax Act, 2017
                </li>
                <li>Non-applicability of e-way bill</li>
                <li>Non applicability of e-invoicing</li>
                <li>Goods having no commercial value</li>
              </ol>

              <p>
                I/We___________________________________(Name of the service
                provider/business entity), do hereby declare that:
              </p>
              <ul>
                <li>
                  I/we am/are not registered under the Goods and Services Tax
                  Act, 2017 as (select and fill below for the relevant reason)
                </li>
                <ul>
                  <li>
                    - I/We deal in/supply the category of goods or services
                    _______________________(Describe the nature of the
                    services/goods) which are exempted under the Goods and
                    Service Tax Act, 2017.
                  </li>
                  <li>
                    - I/We have the annual aggregate turnover below the taxable
                    limit as specified under the Goods and Services Tax Act,
                    2017.
                  </li>
                  <li>
                    - I/We are yet to register ourselves under the Goods and
                    Services Tax Act, 2017.
                  </li>
                </ul>
                <li>
                  I/We hereby also confirm that if anytime during any financial
                  year I/we decide or require or become liable to register under
                  the GST, I/we undertake to provide all the requisite documents
                  and information.
                </li>
                <li>
                  I/We request you to consider this communication as a
                  declaration for not requiring to be registered under the Goods
                  and Service Tax Act, 2017 and comply with e-invoicing or e-way
                  bill requirement.
                </li>
                <li>
                  I/We hereby also confirm that AVN Business Solutions Pvt Ltd
                  or the carrier of the shipment/consignment shall not be liable
                  for any loss accrued to me/us, due to any registration /e-way
                  bill/e-invoice default with the GST or under any other law
                  prevailing.
                </li>
              </ul>
            </div>

            <div style={{ marginTop: "40px" }}>
              <p>Signature of Authorised Signatory</p>
              <p>Name of the Authorised Signatory:</p>
              <p>Name of Business:</p>
              <p>Date:</p>
              <p>Stamp/Seal of the business entity:</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
