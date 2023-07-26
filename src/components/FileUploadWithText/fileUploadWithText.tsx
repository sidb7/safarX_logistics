import UploadIcon from "../../assets/Product/Upload.svg";

interface IPropsTypes {
  placeholder?:any
  text?:any,
  className?:any,
  icon?:any
}

const FileUploadWithText : React.FC<IPropsTypes> = ({icon, placeholder, text, className}) => {
  return (
    <div className=" flex justify-between items-center border-2 rounded-md h-12">
      <span className="text-gray-400 ml-4 text-xs">
        {placeholder}
      </span>
      <div className="flex">
      <img
        className="mr-4"
        src={icon}
        alt="Upload product"
        width="16px"
        />
      <span className="mr-2 text-[#004EFF]">{text}</span>
        </div>
    </div>
  );
};

export default FileUploadWithText;
