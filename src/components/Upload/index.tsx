import UploadIcon from "../../assets/Product/Upload.svg";

const Index = () => {
  return (
    <div className=" flex justify-between items-center border-2 rounded-md h-12">
      <span className="text-gray-400 ml-4 text-xs">
        Upload product photo (optional)
      </span>
      <img
        className="mr-4"
        src={UploadIcon}
        alt="Upload product"
        width="16px"
      />
    </div>
  );
};

export default Index;
