import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InvoiceData from "./BillingData/invoiceData";
import CreditNoteData from "./BillingData/creditNoteData";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import { ScrollNav } from "../../../components/ScrollNav";
import { SearchBox } from "../../../components/SearchBox";
import AccessDenied from "../../../components/AccessDenied";
import { checkPageAuthorized } from "../../../redux/reducers/role";
import { POST } from "../../../utils/webService";
import { GET_ALL_INVOICES } from "../../../utils/ApiUrls";
import { toast } from "react-toastify";

interface IInvoiceProps {}

const Invoice: React.FunctionComponent<IInvoiceProps> = (props) => {
  const navigate = useNavigate();
  const [totalItemCount, setTotalItemCount] = useState(10);
  const [renderingComponents, setRenderingComponents] = useState(0);
  const arrayData = [{ label: "Invoice" }, { label: "Credit Note" }];
  const [isActive, setIsActive] = useState<any>(false);
  const [invoiceArray, setInvoiceArray] = useState<any>([]);

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

  useEffect(() => {
    if (renderingComponents === 0) {
      setIsActive(checkPageAuthorized("Invoices"));
    } else {
      setIsActive(checkPageAuthorized("Credit Notes"));
    }
  }, [renderingComponents]);

  useEffect(() => {
    (async () => {
      const { data } = await POST(GET_ALL_INVOICES, {});
      if (data?.success) {
        setInvoiceArray(data?.data);
      } else {
        toast.error(data?.message);
      }
    })();
  }, []);

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
                defaultIndexValue={0}
              />
            </div>
            <div>
              <div>
                <SearchBox label="Search" value="" onChange={() => {}} />
              </div>
            </div>
          </div>
          <div className="mx-4">
            {renderingComponents === 0 ? (
              <InvoiceData invoiceData={invoiceArray} />
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
