import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InvoiceData from "./BillingData/invoiceData";
import CreditNoteData from "./BillingData/creditNoteData";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import { ScrollNav } from "../../../components/ScrollNav";
import { SearchBox } from "../../../components/SearchBox";

interface IInvoiceProps {}

const Invoice: React.FunctionComponent<IInvoiceProps> = (props) => {
  const navigate = useNavigate();
  const [totalItemCount, setTotalItemCount] = useState(10);
  const [renderingComponents, setRenderingComponents] = useState(0);
  const arrayData = [{ label: "Invoice" }, { label: "Credit Note" }];

  const render = (id: any) => {
    if (id === 0) {
      navigate("/billing/invoice");
    } else if (id === 1) {
      navigate("/billing/credit-note");
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
  return (
    <>
      <div>
        <Breadcrum label="Billing" />
        <div className="lg:flex justify-between mx-4 lg:mt-2 lg:mb-4">
          <div>
            <ScrollNav
              arrayData={arrayData}
              showNumber={false}
              setScrollIndex={setScrollIndex}
              defaultIndexValue={1}
            />
          </div>
          <div>
            <div>
              <SearchBox label="Search" value="" onChange={() => {}} />
            </div>
          </div>
        </div>
        <div className="mx-4">
          {renderingComponents === 0 ? <InvoiceData /> : <CreditNoteData />}
        </div>
      </div>
    </>
  );
};

export default Invoice;
