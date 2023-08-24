import BoxIcon from "../../../../assets/Catalogue/box.svg";
import PackageBox from "../../Product/PackageType/packageBox";

interface Props {}

const BoxCatalogue = (props: Props) => {
  return (
    <div>
      <div className="flex items-center mt-6 gap-x-2">
        <img src={BoxIcon} alt="" />
        <span className="font-bold font-Lato  text-lg lg:text-2xl text-[#323232] ">
          Brown Box
        </span>
      </div>
      <div className="flex overflow-x-scroll">
        <div className="flex  whitespace-nowrap overflow-x-scroll gap-x-4">
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="White box"
          />
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="White box"
          />
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="White box"
          />
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="White box"
          />
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="White box"
          />
        </div>
      </div>
      <div className="flex items-center gap-x-2 mt-8">
        <img src={BoxIcon} alt="" />
        <span className="font-bold font-Lato  text-lg lg:text-2xl text-[#323232] ">
          White Box
        </span>
      </div>
      <div className="flex overflow-x-scroll">
        <div className="flex  whitespace-nowrap overflow-x-scroll gap-x-4">
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="White box"
          />
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="White box"
          />
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="White box"
          />
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="White box"
          />
        </div>
      </div>
    </div>
  );
};

export default BoxCatalogue;
