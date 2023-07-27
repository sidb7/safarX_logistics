import BoxIcon from "../../../../assets/Catalogue/box.svg";
import PackageBox from "../../Product/PackageType/packageBox";

interface Props {}

const BoxCatalogueNew = (props: Props) => {
  return (
    <div>
        <div className="flex items-center px-5 mt-12 gap-x-2 mb-5">
          <img src={BoxIcon} alt="" />
          <span className="font-weight text-[24px] text-[#323232] ">
            Brown Box
          </span>
        </div>
      <div className="grid grid-cols-4 gap-1 px-5 overflow-x-scroll">
        <div className="w-[272px]">
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="Brown box"
          />
        </div>
        <div className="w-[272px]">
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="Brown box"
          />
        </div>
        <div className="w-[272px]">
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="Brown box"
          />
        </div>
        <div className="w-[272px]">
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="Brown box"
          />
        </div>
        <div className="w-[272px]">
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="Brown box"
          />
        </div>
        <div className="w-[272px]">
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="Brown box"
          />
        </div>
        <div className="w-[272px]">
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="Brown box"
          />
        </div>
        <div className="w-[272px]">
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="Brown box"
          />
        </div>
      </div>

        <div className="flex items-center px-5 mt-12 gap-x-2 mb-5">
          <img src={BoxIcon} alt="" />
          <span className="font-weight text-[24px] text-[#323232] ">
            White Box
          </span>
        </div>
      <div className="grid grid-cols-4 gap-1 px-5 overflow-x-scroll">
        <div className="w-[272px]">
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="White box"
          />
        </div>
        <div className="w-[272px]">
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="White box"
          />
        </div>
        <div className="w-[272px]">
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="White box"
          />
        </div>
        <div className="w-[272px]">
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="White box"
          />
        </div>
        <div className="w-[272px]">
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="White box"
          />
        </div>
        <div className="w-[272px]">
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="White box"
          />
        </div>
        <div className="w-[272px]">
          <PackageBox
            packageType="Triple wall 7 ply"
            weight="5"
            dimension="12 x 12 x 12"
            boxType="White box"
          />
        </div>
        <div className="w-[272px]">
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

export default BoxCatalogueNew;
