import React from "react";

const GstContent = (userNameForGst: any) => {
  return (
    <div className=" px-5 mb-3 md:mb-1 md:mx-5">
      <div className="flex flex-col  border-[1px] rounded border-[#E8E8E8] overflow-x-auto  py-4">
        <div className="px-8 flex flex-col gap-y-2">
          <div className="h-[400px]">
            <div
              style={{ textAlign: "center", marginBottom: "20px" }}
              className="font-Open text-sm font-normal leading-5"
            >
              <h2 className="font-Open text-sm font-normal leading-5">
                (to be printed on Letterhead of the business entity)
              </h2>
            </div>

            <div
              style={{ textAlign: "center" }}
              className="font-Open text-base font-semibold leading-[22px]"
            >
              <p>DECLARATION OF GST NON-ENROLMENT</p>
              <p>To AVN Business Solutions Pvt. Ltd.</p>
              <p>12A, 3rd Floor, Techniplex - II,</p>
              <p>Techniplex Complex, S.V.Road,</p>
              <p>Off Veer Savarkar Flyover, Goregaon West,</p>
              <p>Mumbai, Maharashtra 400062</p>
            </div>

            <div
              style={{ marginTop: "20px" }}
              className="font-Open text-sm font-normal leading-5"
            >
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

              <p className="font-Open text-sm font-normal leading-5">
                I/We
                <b className="uppercase">
                  {/* {userState !== "" &&
                        userState !== undefined &&
                        userState !== null &&
                        ` ${userState?.firstName} ${userState?.lastName} `} */}

                  {/* {" " + userName + " "} */}
                  {" " + userNameForGst + " " || "-"}

                  {/* {userState?.firstName + " " + userState?.lastName} */}
                  {/*This will work when user login but didn't work when user signup as the line 144 is commented */}
                  {/* {signInState &&
                        signInState?.name !== undefined &&
                        ` ${signInState?.name} `} */}
                  {/*at the time of signup and signin rendering is different so tried with the condition*/}
                  {/* {(userState?.firstName &&
                        userState.lastName === undefined) ||
                      (userState?.firstName && userState.lastName === "")
                        ? signInState?.name
                        : userState?.firstName + " " + userState?.lastName} */}
                </b>
                (Name of the service provider/business entity), do hereby
                declare that:
              </p>
              <ul className="font-Open text-sm font-normal leading-5">
                <li>
                  I/we am/are not registered under the Goods and Services Tax
                  Act, 2017 as (select and fill below for the relevant reason)
                </li>
                <ul>
                  <li>
                    - I/We deal in/supply the category of goods or services
                    <b> LOGISTICS </b> (Describe the nature of the
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

            <div
              style={{ marginTop: "40px" }}
              className="font-Open text-base font-semibold leading-[22px]"
            >
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

export default GstContent;
