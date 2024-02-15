import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import InvoiceData from "./BillingData/invoiceData";
import CreditNoteData from "./BillingData/creditNoteData";
import { Breadcrum } from "../../components/Layout/breadcrum";
import { SearchBox } from "../../components/SearchBox";
import AccessDenied from "../../components/AccessDenied";
import { checkPageAuthorized } from "../../redux/reducers/role";
import { POST } from "../../utils/webService";
import { GET_ALL_INVOICES } from "../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import { ScrollNav } from "../../components/ScrollNav";
import { Spinner } from "../../components/Spinner";

interface IInvoiceProps {}

interface ITab {
  statusName: string;
  index: number;
}

const Invoice: React.FunctionComponent<IInvoiceProps> = (props) => {
  const navigate = useNavigate();
  const [totalItemCount, setTotalItemCount] = useState<number>(10);
  const [renderingComponents, setRenderingComponents] = useState<number>(0);
  const [isActive, setIsActive] = useState<any>(false);
  const [isLoading, setIsLoading] = useState(false);

  const [invoiceArray, setInvoiceArray] = useState<any>([]);
  const [creditArray, setCreditArray] = useState<any>([]);

  const getCurrentPath = () => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const location = url;
    const path = location.pathname;
    const pathArray = path.split("/");
    const removedFirstPath = pathArray.slice(1);
    return removedFirstPath;
  };

  const data = getCurrentPath() as string[];

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

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await POST(GET_ALL_INVOICES, {});
      if (data?.success) {
        setIsLoading(false);

        setInvoiceArray(data?.data);
      } else {
        toast.error(data?.message);
        setIsLoading(false);
      }
    })();
  }, []);

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
      {isActive || isActive === undefined ? (
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
            {isLoading ? (
              <div className="flex items-center justify-center h-[400px]">
                <Spinner />
              </div>
            ) : (
              <>
                <InvoiceData invoiceData={invoiceArray} />
              </>
            )}
          </div>
        </div>
      ) : (
        <div>
          <AccessDenied />
        </div>
      )}
    </>
  );
};

export default Invoice;

// import React, { useState } from "react";
// import { Breadcrum } from "../../components/Layout/breadcrum";
// import { ScrollNav } from "../../components/ScrollNav";
// import { SearchBox } from "../../components/SearchBox";
// import PaginationComponent from "../../components/Pagination";
// import { useNavigate } from "react-router-dom";
// import InvoiceData from "./BillingData/invoiceData";

// interface IInvoiceProps {}

// const Invoice: React.FunctionComponent<IInvoiceProps> = (props) => {
//   const navigate = useNavigate();
//   const [totalItemCount, setTotalItemCount] = useState(10);
//   const [renderingComponents, setRenderingComponents] = useState(0);
//   const arrayData = [
//     { label: "Orders" },
//     { label: "Invoice" },
//     { label: "Credit Note" },
//     { label: "Cod" },
//   ];

//   const render = (id: any) => {
//     if (id === 0) {
//       navigate("/billing/orders");
//     } else if (id === 1) {
//       navigate("/billing/invoices");
//     } else if (id === 2) {
//       navigate("/billing/credit-notes");
//     } else if (id === 3) {
//       navigate("/billing/cod");
//     }
//   };
//   //on page change index
//   const onPageIndexChange = () => {};

//   // on per page item change
//   const onPerPageItemChange = () => {};

//   const setScrollIndex = (id: number) => {
//     setRenderingComponents(id);
//     render(id);
//   };
//   return (
//     <>
//       <div>
//         <Breadcrum label="Billing" />
//         <div className="lg:flex justify-between mx-4 lg:mt-2 lg:mb-4">
//           <div>
//             <ScrollNav
//               arrayData={arrayData}
//               showNumber={false}
//               setScrollIndex={setScrollIndex}
//               defaultIndexValue={1}
//             />
//           </div>
//           <div>
//             <div>
//               <SearchBox label="Search" value="" onChange={() => {}} />
//             </div>
//           </div>
//         </div>
//         <div className="mx-4">
//           <InvoiceData />
//         </div>

//         {totalItemCount > 0 && (
//           <PaginationComponent
//             totalItems={totalItemCount}
//             itemsPerPageOptions={[10, 20, 30, 50]}
//             onPageChange={onPageIndexChange}
//             onItemsPerPageChange={onPerPageItemChange}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default Invoice;
