import BoxIcon from "../../../../assets/Catalogue/box.svg";
import PackageBox from "../../Product/PackageType/packageBox";
import NavBar from "../../../../layout/NavBar";

interface Props {}

const BoxCatalogueNew = (props: Props) => {
  return (
    <div>
      {/* if Navbar is commented then overflow functionality will work */}
      {/* <header className="fixed top-0 z-10 w-full lg:hidden">
        <NavBar />
      </header> */}
      <div className="flex items-center px-5 mt-12 gap-x-2 mb-5">
        <img src={BoxIcon} alt="" />
        <span className="font-bold font-Lato  text-lg lg:text-2xl text-[#323232] ">
          Brown Box
        </span>
      </div>
      <div className="flex   px-5 whitespaces-nowrap overflow-x-scroll w-[360px]  lg:w-screen">
        <div className="flex whitespaces-nowrap gap-x-6 overflow-x-scroll  lg:gap-x-60">
          <div className="w-[248px] lg:w-[272px]">
            <PackageBox
              packageType="Triple wall 7 ply"
              weight="5"
              dimension="12 x 12 x 12"
              boxType="Brown box"
            />
          </div>
          <div className="w-[248px] lg:w-[272px]">
            <PackageBox
              packageType="Triple wall 7 ply"
              weight="5"
              dimension="12 x 12 x 12"
              boxType="Brown box"
            />
          </div>
          <div className="w-[248px] lg:w-[272px]">
            <PackageBox
              packageType="Triple wall 7 ply"
              weight="5"
              dimension="12 x 12 x 12"
              boxType="Brown box"
            />
          </div>
          <div className="w-[248px] lg:max-w-[272px]">
            <PackageBox
              packageType="Triple wall 7 ply"
              weight="5"
              dimension="12 x 12 x 12"
              boxType="Brown box"
            />
          </div>
          {/* <div className="w-[272px]">
            <PackageBox
              packageType="Triple wall 7 ply"
              weight="5"
              dimension="12 x 12 x 12"
              boxType="Brown box"
            />
          </div> */}
        </div>
        {/* <div className="w-[272px]">
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
        </div> */}
      </div>

      <div className="flex items-center px-5 mt-12 gap-x-2 mb-5">
        <img src={BoxIcon} alt="" />
        <span className="font-weight text-[24px] text-[#323232] ">
          White Box
        </span>
      </div>
      <div className="flex  px-5  overflow-x-scroll w-[360px] lg:w-screen">
        <div className="flex  whitespace-nowrap gap-x-6 overflow-x-scroll lg:gap-x-60">
          <div className="w-[248px] lg:w-[272px]">
            <PackageBox
              packageType="Triple wall 7 ply"
              weight="5"
              dimension="12 x 12 x 12"
              boxType="White box"
            />
          </div>
          <div className="w-[248px] lg:w-[272px]">
            <PackageBox
              packageType="Triple wall 7 ply"
              weight="5"
              dimension="12 x 12 x 12"
              boxType="White box"
            />
          </div>
          <div className="w-[248px] lg:w-[272px]">
            <PackageBox
              packageType="Triple wall 7 ply"
              weight="5"
              dimension="12 x 12 x 12"
              boxType="White box"
            />
          </div>
          <div className="w-[248px] lg:w-[272px]">
            <PackageBox
              packageType="Triple wall 7 ply"
              weight="5"
              dimension="12 x 12 x 12"
              boxType="White box"
            />
          </div>
          {/* <div className="w-[272px]">
            <PackageBox
              packageType="Triple wall 7 ply"
              weight="5"
              dimension="12 x 12 x 12"
              boxType="White box"
            />
          </div> */}
        </div>

        {/* <div className="w-[272px]">
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
        </div> */}
      </div>
    </div>
  );
};

export default BoxCatalogueNew;
