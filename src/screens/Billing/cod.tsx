// import React from "react";

// function cod() {
//   return <div>cod</div>;
// }

// export default cod;

import React, { useState } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import { ScrollNav } from "../../components/ScrollNav";
import { SearchBox } from "../../components/SearchBox";
import PaginationComponent from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import InvoiceData from "./BillingData/invoiceData";
import CodData from "./BillingData/codData";
import RightSideModal from "../../components/CustomModal/customRightModal";
import ShipmentDetailModal from "./Modal/shipmentDetailModal";

interface IInvoiceProps {}

const Cod: React.FunctionComponent<IInvoiceProps> = (props) => {
  const navigate = useNavigate();
  const [totalItemCount, setTotalItemCount] = useState(10);
  const [codModal, setCodModal] = useState({ isOpen: false, data: {} });
  const [renderingComponents, setRenderingComponents] = useState(0);
  const arrayData = [
    { label: "Orders" },
    { label: "Invoice" },
    { label: "Credit Note" },
    { label: "Cod" },
  ];

  const render = (id: any) => {
    if (id === 0) {
      navigate("/billing/orders");
    } else if (id === 1) {
      navigate("/billing/invoices");
    } else if (id === 2) {
      navigate("/billing/credit-notes");
    } else if (id === 3) {
      navigate("/billing/cod");
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
              defaultIndexValue={3}
            />
          </div>
          <div>
            <div>
              <SearchBox label="Search" value="" onChange={() => {}} />
            </div>
          </div>
        </div>
        <div className="mx-4">
          <CodData setCodModal={setCodModal} />
        </div>

        {totalItemCount > 0 && (
          <PaginationComponent
            totalItems={totalItemCount}
            itemsPerPageOptions={[10, 20, 30, 50]}
            onPageChange={onPageIndexChange}
            onItemsPerPageChange={onPerPageItemChange}
          />
        )}

        <RightSideModal
          isOpen={codModal?.isOpen}
          onClose={() => {
            setCodModal({ isOpen: false, data: {} });
          }}
          className="md:!w-[50%]"
        >
          <ShipmentDetailModal
            onClick={() => setCodModal({ isOpen: false, data: {} })}
          />
        </RightSideModal>
      </div>
    </>
  );
};

export default Cod;
