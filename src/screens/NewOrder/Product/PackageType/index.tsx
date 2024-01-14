import ProductIcon from "../../../../assets/Product/Product.svg";
import PackageBox from "../PackageType/packageBox";
import ButtonIcon from "../../../../assets/Product/Button.svg";
import "../../../../styles/packageStyle.css";
// import ProductDetails from "../productDetails";
import AddButton from "../../../../components/Button/addButton";
import { UploadInput } from "../../../../components/UploadInput";

const Index = () => {
  return (
    <div>
      <div className="flex py-5 pr-5 gap-2">
        <img src={ProductIcon} alt="Package Icon" />
        <h1 className="font-bold text-lg leading-6">Box types</h1>
      </div>

      <div className="flex  gap-x-4 mt-4 customScroll lg:grid grid-cols-4">
        <PackageBox
          packageType="Triple wall 7 ply"
          weight="5"
          dimension="12 x 12 x 12"
          boxType="Brown box"
          recommended={true}
        />
        <PackageBox
          packageType="Triple wall 7 ply"
          weight="5"
          dimension="12 x 12 x 12"
          boxType="Brown box"
        />
        <PackageBox
          packageType="Triple wall 7 ply"
          weight="5"
          dimension="12 x 12 x 12"
          boxType="Brown box"
        />
        <PackageBox
          packageType="Triple wall 7 ply"
          weight="5"
          dimension="12 x 12 x 12"
          boxType="Brown box"
        />
      </div>

      {/* <ProductDetails /> */}
      <UploadInput />

      <div className="mb-8">
        <AddButton
          text="ADD PACKAGE"
          onClick={() => {}}
          showIcon={true}
          icon={ButtonIcon}
          alt="Add Product"
        />
      </div>
    </div>
  );
};

export default Index;
