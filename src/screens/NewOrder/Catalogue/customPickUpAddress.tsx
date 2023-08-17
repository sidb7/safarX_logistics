interface IPickUpData {
  props: {
    header: string;
    editImage: any;
    address: string;
    ProfileImage: any;
    ProfileName: string;
    PhoneIcon: any;
    PhoneNumber: string;
  }[];
}

const PickupAddress: React.FunctionComponent<IPickUpData> = ({ props }) => {
  return (
    <div className="block lg:grid lg:grid-cols-3">
      {props.map((each, index) => {
        return (
          <div className="p-[12px] shadow-lg rounded-lg border-[1px] border-[#E8E8E8] bg-[#FFFFFF] mx-5 my-4" key={index}>
            <div className="flex justify-between">
              <p className="text-[#3371FF] text-[16px] font-medium">
                {each.header}
              </p>
              <img src={each.editImage} alt="" />
            </div>
            <p className="text-[16px] font-normal mt-2 w-[250px]">
              {each.address}
            </p>
            <div className="flex gap-x-2 mt-1">
              <img
                src={each.ProfileImage}
                alt=""
                className="w-[16px] h-[16px] flex self-center"
              />
              <p className="text-[16px] font-normal">{each.ProfileName}</p>
            </div>
            <div className="flex gap-x-2 mt-1">
              <img src={each.PhoneIcon} alt="" className="w-[16px] h-[16px]" />
              <p className="text-[16px] font-normal">{each.PhoneNumber}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default PickupAddress;
