import BoxDetails from "./boxDetails";
import SummaryService from "./summaryService";
import SummaryAddressBox from "./summaryAddressBox";
import contactIcon from "../../../assets/serv/contact.svg";
import locationIcon from "../../../assets/serv/location.svg";
import phoneIcon from "../../../assets/serv/phone.svg";
import editIcon from "../../../assets/serv/edit.svg";
import TickLogo from "../../../assets/common/Tick.svg";
import SummaryIcon from "../../../assets/serv/summary.svg";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import Stepper from "../../../components/Stepper";
const steps = [
  {
    label: "Pickup",
    isCompleted: true,
    isActive: true,
    imgSrc: TickLogo,
  },
  {
    label: "Delivery",
    isCompleted: true,
    isActive: true,
    imgSrc: TickLogo,
  },
  {
    label: "Product",
    isCompleted: true,
    isActive: true,
    imgSrc: TickLogo,
  },
  {
    label: "Service",
    isCompleted: true,
    isActive: true,
    imgSrc: TickLogo,
  },
  {
    label: "Summary",
    isCompleted: false,
    isActive: true,
    imgSrc: TickLogo,
  },
  {
    label: "Payment",
    isCompleted: false,
    isActive: false,
    imgSrc: TickLogo,
  },
];
type Props = {};

const Summary = (props: Props) => {
  return (
    <div>
      <Breadcrum label="Add New Order" />
      <div className="lg:mb-8">
        <Stepper steps={steps} />
      </div>
      <div className="grid grid-cols-1 gap-y-5 p-5   ">
        <div className="flex flex-row gap-2">
          <img src={SummaryIcon} alt="Summary Icon" />
          <p className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C]  ">
            Summary
          </p>
        </div>
        <div className="flex flex-row justify-between items-center h-[48px] rounded  p-[10px] border-[1px] border-[#A4A4A4] lg:w-1/4  ">
          <p className="text-[12px] text-[#1C1C1C] font-normal lg:text-[#777777]">
            Create order ID
          </p>
          <p className="text-[#004EFF] text-[14px] font-semibold">
            AUTO GENERATE
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between shadow-lg rounded-lg border-[1px] border-[#E8E8E8] p-4 gap-y-5 lg:w-[770px]">
          <SummaryAddressBox
            locationImage={locationIcon}
            summaryTitle="Pickup Details"
            isEditIcon={true}
            warehouse="Warehouse"
            editImage={editIcon}
            locationImage2={locationIcon}
            summaryAddres="Door 12, sector 8, Shankar Nagar"
            city=" Andheri East, Mumbai 422011"
            profileImage={contactIcon}
            contactNumber="+91 12345 12345"
            contactImage={phoneIcon}
            contactName="Amith Sharma"
            isContactName={true}
            isContactNumber={true}
          />
          <SummaryAddressBox
            locationImage={locationIcon}
            summaryTitle="RTO Address"
            editImage={editIcon}
            warehouse="Warehouse Pune"
            locationImage2={locationIcon}
            summaryAddres="Door 12, sector 8, Shankar Nagar"
            city=" Andheri East, Mumbai 422011"
            profileImage={contactIcon}
            contactNumber="+91 12345 12345"
            contactImage={phoneIcon}
            contactName="Amith Sharma"
          />

          <div className="hidden lg:block">
            <img src={editIcon} alt="" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between shadow-lg rounded-lg border-[1px] border-[#E8E8E8] p-4 gap-y-5 lg:w-[770px]">
          <SummaryAddressBox
            locationImage={locationIcon}
            summaryTitle="Delivery Details"
            isEditIcon={true}
            warehouse="Warehouse Mumbai"
            editImage={editIcon}
            locationImage2={locationIcon}
            summaryAddres="Door 12, sector 8, Shankar Nagar"
            city=" Andheri East, Mumbai 422011"
            profileImage={contactIcon}
            contactNumber="+91 12345 12345"
            contactImage={phoneIcon}
            contactName="Amith Sharma"
            isContactName={true}
            isContactNumber={true}
          />
          <SummaryAddressBox
            locationImage={locationIcon}
            summaryTitle="Billing Address"
            editImage={editIcon}
            warehouse="Warehouse Mumbai"
            locationImage2={locationIcon}
            summaryAddres="Door 12, sector 8, Shankar Nagar"
            city=" Andheri East, Mumbai 422011"
            profileImage={contactIcon}
            contactNumber="+91 12345 12345"
            contactImage={phoneIcon}
            contactName="Amith Sharma"
          />

          <div className="hidden lg:block">
            <img src={editIcon} alt="" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-x-5 lg:w-[770px]">
          <BoxDetails />

          {/*Service */}

          <SummaryService />
        </div>
      </div>
    </div>
  );
};

export default Summary;
