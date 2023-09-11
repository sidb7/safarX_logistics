import React from "react";

import LabelIcon from "../../../../assets/Label/label.svg";
import ShareIcon from "../../../../assets/Label/share.svg";
import ViewIcon from "../../../../assets/Label/view.svg";
import CustomButton from "../../../../components/Button";
import Base64FileRenderer from "../../../../components/Base64ConverterToPdf";
import BackArrowIcon from "../../../../assets/backArrow.svg";
import NavBar from "../../../../layout/Old_NavBar";
import ServiceButton from "../../../../components/Button/ServiceButton";
import DownloadIcon from "../../../../assets/Label/download.svg";
import { useNavigate } from "react-router-dom";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import { useState } from "react";
import OrderModal from "../../../../screens/NewOrder/ReturningUser/Label/orderModal";

const FileText =
  "JVBERi0xLjYKMSAwIG9iago8PC9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovQmFzZUZvbnQgL0hlbHZldGljYQovTmFtZSAvRjEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2Rpbmc+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkCi9OYW1lIC9GMgovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZz4+CmVuZG9iagozIDAgb2JqCjw8L1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldCi9Gb250IDw8L0YxIDEgMCBSCi9GMiAyIDAgUj4+Pj4KZW5kb2JqCjUgMCBvYmoKPDwvRmlsdGVyIC9GbGF0ZURlY29kZQovTGVuZ3RoIDI2MzY+PgpzdHJlYW0KeJztXVlT20oWfudXnKp5SWqg0/vCWyALhDXgqdzU5T4IWxjNGItIchiq5sfPadlgWTa+WBhbBkwZhKzuPvv5TqvVpkQZii+4AQrf8P1v+PMv/NPC91d8t9e2GvDhCwNGCc1f0LiAz401Wr2hpYOGvNDw7qLW8HD84KTf8xO7WOOWCJX/Z5kgSuaH+Icwo/3hhqSOWC4V5ZCEcApPHHFtmrSmc0ucZEjVhIOkvSaNIpJrRR0gO8RxYQXDQ6KVZwQ2mCSCe049GxfwTGQIw4hiWklVJINRPEud03JRdHCuCVNOqlE6JCcOh3NsYfLgd+ZVJMMxgmbliVsQGUXrEIJobTl+ULQOPMmclPJ5yZCGaGfMKBlcoQisXSAZzBGnrVsyGYILQrVklhfJcBJdRRpuFkVG0VWWSIb1cZULDBEFKkYcdkFKuXfYIRlSE6py2iZQsfwUxiwxhnk/thQP+zmMUYVqVdzbM3dEaHyZuaWwaR8Pkr0lsj/mXa6fd5tF97gyXPMKVExoU9G90KJ/TbsmaQOOiBAwGZ67wRH9WSGJ6Xufcd6SGfX0tODPdydhFkQd2O3+jqNm+GEr6nQgvoDT3vV15/bDdpBewlV4Fb//CxrffGffKwq3OtNVxlv7tcawMXorCEussgIb3l/QvHqc5hBWzzLm99KwdHzYBzoebcqJsRKj5GNaLsWaOKdE9AOjcRoty9yb0/bRJ9g+2t//vN2Ak5QUzGaUR4lITVpZHLHGTFpMTkYYVEnOJEKcJ/oDCmOJLsGkJIzysvSf3Sc86lDj4z7KKRBTC2F1jQ1GcEMY13aCV8B23EuiMIHD4CqETdjq9MJPQZLB2btvHw/+h++z96tnUfXIzK+T65eDRxQWBm6IR07jTgu2bjfhOAl/x7dBtxmuGPaoFzWFELrhDJECy9JZoNBoFNYIpqixk1DNBLqWYVjWU4GZWuSWpajzKSO3rE9BFm4Cx1p4g+oNpuAoaWFI3m1tPohSGMWKjrEV4RcxleOa33kSpXtigx2cqi/Y4PMoj6scNFeX8mltnpwMlk5jnbximF4QxSPsdHfQfZhV1gsesYqMUUeUGka3nd5V0M3C5iVgBu1lUdxNsahvRQEc/84I7Gct2Il7aQiHMTAt1oGlGXzpxHGy/oj8ulRWtbPEmWFgc9nliitPY9QWbmiVL1l5xiBkGNopKg8OgqgLJ611OA2bWZyAXoed0xPYD27jXrbqqtWG8EIWXocXz7HSRBdC7FbQbQedOAnXYS9IukEW/CfYUJoyylec0fx2xdCUD+LzqIPlvNOcMmeMMI/mb4lVgMZ6ixtaml58hDpmrDZLSJozgnHcFi8azt/UQc/c+NtSzt/X8aCBcinvFA2wEMU+gXRMJyYXYJn0rUO84rAxA/1P1un8TWkWorRCmth8aFquFXrYY5W5n3VunOz9AyzFApZaZ5yut00K6YhjzN/GKDMCn7ePDo8OfmIjo/a+Pnl6ZwbjkEQx6SbdWhkbtfIM2zPSb4lyduKdoXrkyqL1lnAflF6Ptt6SBonmTJfmY9jd8fiBX3nglxZY7htpixnc5R9wQYnsX7PhAQyicSbytQfV9fXgYJIwLEKtnmWovDOHjiOpUyOUIwgxTIpZO+PYA1eKy2JnmjDj6+NZOxOaCMa4sPOgTKIqxiir3JlGJ9FO8WJnFjE5hiA2a2cKK0/hLKPz0CZWBkxbYdk82ERPE2OUVdWmZUSNUVaVTeuIGVNAVTad8ivKSpRVZFNSZGmMsopsSkaJmJfMJEOjHdNmRaOV6Oh2Xu4khcKG5RBUlTKpJhhtVcoQYMh5BUepxAQPqMqmFhPCdlWjNcjSvBKKtHRC2K5KmbUTjLaqAhyW2WOUVWTTLwm24xm/GmWKOqRiTqlOMTPBA6qyyQ2ioTlldIWOPjesgWYxIWxXZVPKCR5wf8Uzd1aHu02jENggWBqDwFW6/VvcXQ/u59/mET1ycAgjlVJ6lqUVY22WO1/JfN2NOZIPllZcRtfQiDdhKz1Pn7XqrlFJWhAHxXxuGKduMJ8SJq2gsw47fwj9z231fR32eq2geRn5ifrVnqlWDjODNdbol8+qxaqKDo38JbNqsErgQwM+CaLzoF24ywIbqHnGOV1xPjUWfWJovQdHW7v7n2ETnJODnxVnUGEdVAjMx52gGcLR3ap75PRepSvOKKItUwi52700i6/CBL6eNuCwd3WOh5sjLK4u4Fhdyqe1mT8KGJw1WFmMQKVpD489apwZe6w+XjVqnuOhunm4KJdEaOPuQWIC3XgeLjmV8PkbwQtQihWED57ULCnlOIlbvWaWPz7wpptl6IZz65fb5Q/zlj1m719vOllKEOMKU0v/Oe+STi7T7ptOlqETybm/LZJvAVDSyffGT/KmlKUoReGpwfYQJaV8itI3pSxHKX6BxGDrkJJSGnEWdJaklfkVFvf9a55fOENPM7Wp1mOtbKEAx6nxd8+lYX1TYIszg9cl8gLYLon8tBN123AetFdQ9G90vkJTLmKut/CxIJkXIFVJ5vRN5s+PmEoyH92RY5FSf368NIeJ0Zl6fHZUXmcbGyIx6Rihht2bGJTvmPNZHbBejGpitRXaM4odois5dlcSXoXdNIq7cPZuH/4LO/j+cfZ+5EZNtQhUKwH4p1ectopPUDWjyPPg19Ki+av2w8J86wt3RP8ggjbGMjXmiT/CqH2ZvTTH45oSI5hfaTimWko47C2v8HrVLucfKXD9LYZfuMsJowkV6G3jLvc1CbotKE/A1cfrlmK5M2r7oTa1soFCMVG2gYnb+9VW98tePfKUYuLt0+KnbyuI6knjVpXdDx5qtIz1eIKwQU1rOFHOWWd9pEOwZZTREho3vuwLm50gCfzmMxMA58J23Ks+oc8Rsli/VZvn0jArBRvnEn6E0Mo5DSG7DDL8FaUQ9Xc/hvQyvknxVAhBM+sFHbhO/On4Ij/XjuNWiq3TZhKdhy0IzuPfeCXihbynoIPXB0kWNXvYfQr5EEmvf0UzTpKwmY1siNtnxdO/Vqvlm0Nz0ZwwgSkyNxdGlGD5Li9ekI17gaR+x0bPbNTNwm4LBXMRJ4BH0EvDBDnvpr2ra29XuSS6cZZfkIRp0AkJNLwCRnehBjwTdzu3+XW73Y0GgrI0yuC6l1zHaV+geEnwgDDrKUuF8lMsN0QPMprx1XUvQ/m0w26IbuftCdlqxWGaiygJf/UiFGoA15e3adREY0yjdjfIeslcloA9y+aWNZK80oIYnn/VzGg8GK1m6iW/emTDqdPTtdCtQyr6XyNUdquzd18wZqz4Ln9F/qSvTYa2O7JP9CpDxtWlfFqblTEx7ogbJCa/bbm9S/IYHY/jmzAJ/SbME6Z9VgAHUiIo8/vvec6o1uouNpzu7B7//PjxZHfFNpSut/FW77EeXL+uADUzt9O/aPDX/Qej5x/VoZgcmYjNvygKu+T9L3DrPwIxiErnt9DYPv70Bc7e3dzckKx53bogcdIeJsbpD65P52dt6tcITm/7f4JbXG4KZW5kc3RyZWFtCmVuZG9iago2IDAgb2JqCjw8L1R5cGUgL1BhZ2UKL1BhcmVudCA0IDAgUgovTWVkaWFCb3ggWzAgMCA1OTUuMjc2IDg0MS44OV0KL1Jlc291cmNlcyAzIDAgUgovQ29udGVudHMgNSAwIFI+PgplbmRvYmoKNCAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbNiAwIFJdCi9Db3VudCAxPj4KZW5kb2JqCjcgMCBvYmoKPDwvVHlwZSAvQ2FsYWxvZwovUGFnZXMgNCAwIFI+PgplbmRvYmoKeHJlZgowIDgKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAxMTQgMDAwMDAgbiAKMDAwMDAwMDIyNCAwMDAwMCBuIAowMDAwMDAzMTM1IDAwMDAwIG4gCjAwMDAwMDAzMTkgMDAwMDAgbiAKMDAwMDAwMzAyNiAwMDAwMCBuIAowMDAwMDAzMTkwIDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA4Ci9Sb290IDcgMCBSPj4Kc3RhcnR4cmVmCjMyMzcKJSVFT0YK";

type Props = {};

const Label = (props: Props) => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(false);
  const closeModal = () => setOrder(false);

  const orderConfirmationModal = () => {
    setOrder(true);
  };

  return (
    <div className="flex flex-col  gap-y-5">
      <header className="fixed top-0 z-10 w-full ">
        <NavBar />
      </header>
      <div>
        <div className="inline-flex space-x-2 items-center justify-start px-5 mt-20">
          <img src={BackArrowIcon} alt="" />

          <p className="text-lg font-semibold text-center text-gray-900 ">
            Add new order
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5 mx-5">
        <div className="flex items-center gap-2">
          <img src={LabelIcon} alt="LabelIcon" />
          <p className="text-[18px] text-[#323232] font-bold ">Label</p>
        </div>
        <div className="flex items-center gap-2">
          <CustomButton
            text="SHARE"
            showIcon={true}
            icon={ShareIcon}
            onClick={() => {}}
            className="p-2 rounded !bg-[#F2F6FF] !text-[#0066FF]"
          />

          <CustomButton
            text="VIEW"
            showIcon={true}
            icon={ViewIcon}
            onClick={() => {}}
            className="p-2 rounded !bg-[#F2F6FF] !text-[#0066FF] "
          />
        </div>
      </div>
      <div className="mx-5">
        <Base64FileRenderer
          base64String={FileText}
          width="100%"
          height="600px"
        />
      </div>
      <CustomBottomModal
        isOpen={order}
        onRequestClose={closeModal}
        overlayClassName="flex p-5 items-center"
      >
        <OrderModal onRequestClose={closeModal} />
      </CustomBottomModal>
      <footer className="w-full fixed  bottom-0 	">
        <div className="grid grid-cols-2  shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0">
          {window.location.pathname !== "/neworder/label" ? (
            <>
              <ServiceButton
                text="DOWNLOAD"
                icon={DownloadIcon}
                showIcon={true}
                className="!bg-[#F2F6FF] text-[#0066FF] border-none text-[14px] font-semibold "
              />
            </>
          ) : (
            <>
              <ServiceButton
                text="BACK"
                onClick={() => {
                  window.history.back();
                }}
              />
            </>
          )}

          <ServiceButton
            text="NEXT"
            className="bg-[#1C1C1C] text-[#FFFFFF]"
            onClick={() => {
              orderConfirmationModal();

              if (window.location.pathname === "/neworder/pickup") {
                navigate("/neworder/delivery");
              } else if (window.location.pathname === "/neworder/delivery") {
                navigate("/neworder/package");
              } else if (window.location.pathname === "/neworder/package") {
                navigate("/neworder/service");
              } else if (window.location.pathname === "/neworder/service") {
                navigate("/neworder/summary");
              } else if (window.location.pathname === "/neworder/summary") {
                navigate("/neworder/payment");
              }
            }}
          />
        </div>
      </footer>
    </div>
  );
};

export default Label;
