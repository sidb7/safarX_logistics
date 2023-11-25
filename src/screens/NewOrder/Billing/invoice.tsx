import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import InvoiceData from "./BillingData/invoiceData";
import CreditNoteData from "./BillingData/creditNoteData";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import { SearchBox } from "../../../components/SearchBox";
import AccessDenied from "../../../components/AccessDenied";
import { checkPageAuthorized } from "../../../redux/reducers/role";
import { POST } from "../../../utils/webService";
import { GET_ALL_INVOICES } from "../../../utils/ApiUrls";
import { toast } from "react-toastify";

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
  const [invoiceArray, setInvoiceArray] = useState<any>([]);
  const [creditArray, setCreditArray] = useState<any>([]);

  const listTab: ITab[] = useMemo(
    () => [
      {
        statusName: "Invoices",
        index: 0,
      },
      {
        statusName: "Credit Notes",
        index: 1,
      },
    ],
    []
  );

  const setScrollIndex = (id: number) => {
    const filterName = listTab.find((array) => array.index === id);
    const filterNewUrl = filterName?.statusName
      .toLocaleLowerCase()
      .replace(/ /g, "-");

    const newUrl = `/billing/${filterNewUrl}`;

    window.history.pushState(null, "", newUrl);
    setRenderingComponents(id);
  };

  const renderComponent = () => {
    if (renderingComponents === 0) {
      return <InvoiceData invoiceData={invoiceArray} />;
    } else if (renderingComponents === 1) {
      return <CreditNoteData creditData={creditArray} />;
    }
    return null;
  };

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

  useEffect(() => {
    if (data[1] === "invoices") {
      setIsActive(checkPageAuthorized("Invoices"));
      setRenderingComponents(0);
      setScrollIndex(0);
    } else {
      setIsActive(checkPageAuthorized("Credit Notes"));
      setRenderingComponents(1);
      setScrollIndex(1);
    }
  }, [data]);

  const renderTabs = () => {
    const tabs: React.ReactNode[] = [];
    for (let index = 0; index < listTab.length; index++) {
      const { statusName } = listTab[index];
      tabs.push(
        <div
          className={`flex lg:justify-center items-center border-b-2 cursor-pointer border-[#777777] px-4
            ${renderingComponents === index && "!border-[#004EFF]"}
          `}
          onClick={() => {
            sessionStorage.setItem("billingTab", statusName);
            setScrollIndex(index);
          }}
          key={index}
        >
          <span
            className={`text-[#777777] text-[14px] lg:text-[18px]
              ${
                renderingComponents === index &&
                "!text-[#004EFF] lg:text-[18px]"
              }`}
          >
            {statusName}
          </span>
        </div>
      );
    }
    return tabs;
  };

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
            <div className="flex flex-row whitespace-nowrap mt-2 lg:h-[34px]">
              {renderTabs()}
            </div>
            <div>
              <div>
                <SearchBox label="Search" value="" onChange={() => {}} />
              </div>
            </div>
          </div>
          <div className="mx-4">{renderComponent()}</div>
          {/* <div className="mx-4">
            {renderingComponents === 0 ? (
              <InvoiceData invoiceData={invoiceArray} />
            ) : (
              <CreditNoteData />
            )}
          </div> */}
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
