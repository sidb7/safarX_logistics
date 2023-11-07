import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InvoiceData from "./BillingData/invoiceData";
import CreditNoteData from "./BillingData/creditNoteData";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import { ScrollNav } from "../../../components/ScrollNav";
import { SearchBox } from "../../../components/SearchBox";
import AccessDenied from "../../../components/AccessDenied";
import { checkPageAuthorized } from "../../../redux/reducers/role";

interface IInvoiceProps {}

const Invoice: React.FunctionComponent<IInvoiceProps> = (props) => {
  const navigate = useNavigate();
  const [totalItemCount, setTotalItemCount] = useState(10);
  const [renderingComponents, setRenderingComponents] = useState(0);
  const arrayData = [{ label: "Invoice" }, { label: "Credit Note" }];
  const [isActive, setIsActive] = useState<any>(false);

  const render = (id: any) => {
    if (id === 0) {
      navigate("/billing/invoices");
    } else if (id === 1) {
      navigate("/billing/credit-notes");
    }
  };

  //on page change index
  const onPageIndexChange = () => {};

  // on per page item change
  const onPerPageItemChange = () => {};

  const setScrollIndex = (id: number) => {
    setRenderingComponents(id);

    render(id);
  };

  const GetCurrentPath = () => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const location = url;
    const path = location.pathname;
    const pathArray = path.split("/");
    const removedFirstPath = pathArray.slice(1);
    return removedFirstPath;
  };

  const data = GetCurrentPath() as any;

  console.log("data", data);

  useEffect(() => {
    if (renderingComponents === 0) {
      setIsActive(checkPageAuthorized("Invoices"));
    } else {
      setIsActive(checkPageAuthorized("Credit Notes"));
    }
  }, [renderingComponents]);

  const defaultTabIndex = data.includes("invoices") ? 0 : 1;
  console.log("defaulttabindex", defaultTabIndex);

  return (
    <>
      {isActive ? (
        <div>
          <Breadcrum label="Billing" />
          <div className="lg:flex justify-between mx-4 lg:mt-2 lg:mb-4">
            <div>
              <ScrollNav
                arrayData={arrayData}
                showNumber={false}
                setScrollIndex={setScrollIndex}
                defaultIndexValue={defaultTabIndex}
              />
            </div>
            <div>
              <div>
                <SearchBox label="Search" value="" onChange={() => {}} />
              </div>
            </div>
          </div>
          <div className="mx-4">
            {renderingComponents === 0 && defaultTabIndex === 0 ? (
              <InvoiceData />
            ) : (
              <CreditNoteData />
            )}
          </div>
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default Invoice;
