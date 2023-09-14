import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import WelcomeHeader from "../welcomeHeader";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomCheckBox from "../../../../components/CheckBox";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";
import Card from "./Card";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import { useNavigate } from "react-router-dom";
import { setAcceptTnCStatus } from "../../../../redux/reducers/onboarding";
import { useSelector, useDispatch } from "react-redux";
import { POST } from "../../../../utils/webService";
import { GST_AGREEMENTS } from "../../../../utils/ApiUrls";
import { toast } from "react-toastify";
import { Spinner } from "../../../../components/Spinner";

interface ITypeProps {}

export const GSTComponent = (props: ITypeProps) => {
  const singUpState = useSelector((state: any) => state?.signup);

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);
  const [checkbox, setCheckbox] = useState();
  const [userState, setIsUserState] = useState<any>();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("userInfo") as any);
    setIsUserState(data);
  }, []);

  const acceptStatus = async () => {
    let name = userState?.firstName + " " + userState?.lastName;
    const payload = { entityName: name, businessType: "logistics" };
    setLoading(true);
    const { data: responses } = await POST(GST_AGREEMENTS, payload);
    try {
      if (responses?.success) {
        setLoading(false);
        dispatch(setAcceptTnCStatus(true));
        navigate("/onboarding/kyc-terms/service-agreement");
      } else {
        setLoading(false);
        // toast.error(responses?.message);
        //As their is a error in api at this time routed to the service-agreement
        // navigate("/onboarding/kyc-terms/gst-agreement");
        navigate("/onboarding/kyc-terms/service-agreement");
      }
    } catch (error) {
      return error;
    }
  };

  const BottomButton = () => {
    return (
      <div className="flex flex-col items-center px-5 lg:px-0 pb-4  bg-white">
        <div className="flex items-center  lg:px-9 self-start my-1">
          <CustomCheckBox
            onChange={(e: any) => setCheckbox(e.target.checked)}
          />
          <p className="font-normal text-[12px] text-[#494949] font-Open">
            I Agree with the terms & conditions
          </p>
        </div>

        <ServiceButton
          text="ACCEPT AND CONTINUE"
          disabled={!checkbox}
          className={` w-full lg:!w-[320px] mb-1 mt-0 mx-5 font-Open  ${
            checkbox === true
              ? "bg-[#1C1C1C] text-white"
              : "bg-[#E8E8E8] text-[#BBBBBB]"
          }`}
          onClick={() => {
            acceptStatus();
          }}
        />
      </div>
    );
  };

  const gstCommonComponent = () => {
    return (
      <div className="lg:px-0 ">
        <div className="product-box sticky z-10 bg-white flex justify-between items-center w-full h-[60px] top-0 pl-5">
          <img src={CompanyLogo} alt="" />
        </div>

        <WelcomeHeader
          title="Welcome to Shipyaari"
          content="Terms & Agreement"
        />
        <div className=" px-5 mb-3 lg:mb-1 lg:mx-5">
          {/* <Card
            title="DECLARATION OF GST NON-ENROLMENT"
            subTitleOne="Sub: Declaration of"
          /> */}
          <div className="flex flex-col  border-[1px] rounded border-[#E8E8E8]  py-4">
            <div className="px-8 flex flex-col gap-y-2">
              <div className="h-[400px] overflow-y-scroll">
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
                      Central/State/UT/Integrated Goods and Services Tax Act,
                      2017
                    </li>
                    <li>Non-applicability of e-way bill</li>
                    <li>Non applicability of e-invoicing</li>
                    <li>Goods having no commercial value</li>
                  </ol>

                  <p>
                    I/We{" "}
                    <b className="uppercase">
                      {/* {`${singUpState?.firstName} ${singUpState?.lastName}`} */}
                      {userState?.firstName + "" + userState?.lastName}
                    </b>{" "}
                    (Name of the service provider/business entity), do hereby
                    declare that:
                  </p>
                  <ul>
                    <li>
                      I/we am/are not registered under the Goods and Services
                      Tax Act, 2017 as (select and fill below for the relevant
                      reason)
                    </li>
                    <ul>
                      <li>
                        - I/We deal in/supply the category of goods or services
                        <b> LOGISTICS </b> (Describe the nature of the
                        services/goods) which are exempted under the Goods and
                        Service Tax Act, 2017.
                      </li>
                      <li>
                        - I/We have the annual aggregate turnover below the
                        taxable limit as specified under the Goods and Services
                        Tax Act, 2017.
                      </li>
                      <li>
                        - I/We are yet to register ourselves under the Goods and
                        Services Tax Act, 2017.
                      </li>
                    </ul>
                    <li>
                      I/We hereby also confirm that if anytime during any
                      financial year I/we decide or require or become liable to
                      register under the GST, I/we undertake to provide all the
                      requisite documents and information.
                    </li>
                    <li>
                      I/We request you to consider this communication as a
                      declaration for not requiring to be registered under the
                      Goods and Service Tax Act, 2017 and comply with
                      e-invoicing or e-way bill requirement.
                    </li>
                    <li>
                      I/We hereby also confirm that AVN Business Solutions Pvt
                      Ltd or the carrier of the shipment/consignment shall not
                      be liable for any loss accrued to me/us, due to any
                      registration /e-way bill/e-invoice default with the GST or
                      under any other law prevailing.
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
        {BottomButton()}
      </div>
    );
  };

  return (
    <div>
      {!isBigScreen && gstCommonComponent()}

      {isBigScreen && (
        <CustomBottomModal
          isOpen={openModal}
          onRequestClose={closeModal}
          className="!p-0 !w-[500px] !h-[700px] overflow-x-scroll"
          overlayClassName="flex  items-center"
        >
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner />
            </div>
          ) : (
            gstCommonComponent()
          )}
        </CustomBottomModal>
      )}
    </div>
  );
};
