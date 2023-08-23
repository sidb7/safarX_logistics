import NavBar from "../../../../layout/Old_NavBar";
import BackArrowIcon from "../../../../assets/backArrow.svg";
import InputBox from "../../../../components/InputBox/index";
import CustomDropDown from "../../../../components/DropDown";
import Upload from "../../../../components/Upload";
import ButtonIcon from "../../../../assets/Product/Button.svg";
import ServiceButton from "../../../../components/Button/ServiceButton";
import DownloadIcon from "../../../../assets/Label/download.svg";
import { useNavigate } from "react-router-dom";
import ForwardArrowIcon from "../../../../assets/Delivery/forwardArrow.svg";
import MagicLocationIcon from "../../../../assets/Delivery/magicLocation.svg";
import { useRef, useState } from "react";
import ItemIcon from "../../../../assets/Product/Item.svg";

const ProductAddCombo = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [pastedData, setPastedData] = useState("");
  const [products, setProducts] = useState(false);
  const [productsArray,setProductArray]:any = useState([]);
  const [data, setData]:any = useState<any>(
    {
      productName: "",
      productCategory: "",
      productPrice: "",
      productTax: "",
      length: "",
      breadth: "",
      height: ""
    }
  );

const handleData = (e:any) => {
    e.preventDefault();
    let temp = [...productsArray]
    temp.push(data);
    setProductArray(temp)
    setProducts(true);
    setData({...data,productName: "",productCategory:"",productPrice:"",
    productTax:"",length:"",breadth:"",height:"" }, 
);
}

  const handleClick = () => {
    // inputRef.current?.focus();
  };
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData("text");
    setPastedData(pastedData);
  };
  const length = productsArray.length 
  
  return (
    <div>
      <header className="fixed top-0 z-10 w-full ">
        <NavBar />
      </header>
      <div className="mx-5">
        <div className="inline-flex space-x-2 items-center justify-start  mt-20">
          <img src={BackArrowIcon} alt="" />

          <p className="text-lg font-semibold text-center text-gray-900 ">
            Add Combo
          </p>
        </div>
        {
            products ? 
            (
                <>
                    {productsArray.map((each:any, index:any)=>{
                        return(
                            <>
                                <h1 className="text-[14px] font-semibold mt-4 text-[#004EFF]">Product {index+1}</h1>
                                <div className="flex gap-x-3 border-2 border-[#E8E8E8] p-3 rounded-lg mt-3">
                                    <img src={ItemIcon} alt="" />
                                    <div>
                                        {<p className="text-[14px] font-medium">{each.productName}</p>}
                                        <div className="flex">
                                            <p>5 kg | </p>
                                            {<p className="ml-1">{`${each.length} x`}</p>}
                                            {<p className="ml-1">{`${each.breadth} x`}</p>}
                                            {<p className="ml-1">{`${each.height} cm`}</p>}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )

                    })}
                </>
            )
            :
            ("")
        }
        
      
        <div className="mt-6">
          <h1 className="font-semibold text-[#004EFF] text-[14px]">Product {length+1}</h1>
        
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-lg relative mt-5">
          <div className="bg-black text-white p-4 h-1/3 flex items-center gap-x-2">
            <img
              src={MagicLocationIcon}
              alt="Magic Location Icon"
              className=""
            />
            <div className="text-white text-[12px] font-normal">
              Magic Address
            </div>
          </div>
          <div className="relative h-[75px] ">
            <div className="w-full max-w-xs mx-auto">
              <div
                onClick={handleClick}
                className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent border-none cursor-text"
              >
                {pastedData || "Click here to paste..."}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={pastedData}
                onPaste={handlePaste}
                onChange={() => {}}
                style={{ position: "absolute", left: "-9999px" }}
                title="inputWithImage"
              />
            </div>
          </div>
          <div className="absolute right-[5%] top-[70%] transform -translate-y-1/2">
            <img src={ForwardArrowIcon} alt="Arrow" />
          </div>
        </div>  

        <div className="flex flex-col justify-between gap-y-4 mt-4">
          <InputBox
            label="Product name"
            value={data.productName}
            onChange={(e)=>setData({...data, productName:e.target.value})}
          />
          <InputBox label="Product category" value={data.productCategory}
          onChange={(e)=>setData({...data, productCategory:e.target.value})}/>
          <InputBox label="Product price" value={data.productPrice}
          onChange={(e)=>setData({...data, productPrice:e.target.value})}/>
          <InputBox label="Product tax" value={data.productTax}
          onChange={(e)=>setData({...data, productTax:e.target.value})}/>
        </div>
        <div className="grid grid-cols-2 gap-x-2 mt-4">
          <div className="grid grid-cols-2 gap-x-2">
            <CustomDropDown
              value=""
              onChange={() => {}}
              options={[
                {
                  label: "CM",
                  value: "CM",
                },
              ]}
              selectClassName="rounded-md bg-[#FEFEFE]"
            />

            <InputBox className="" label="Length" value={data.length}
            onChange={(e)=>setData({...data, length:e.target.value})}/>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <InputBox className="" label="Breadth" value={data.breadth}
            onChange={(e)=>setData({...data, breadth:e.target.value})}/>
            <InputBox label="Height" value={data.height}
            onChange={(e)=>setData({...data, height:e.target.value})}/>
          </div>
        </div>
        <div className="text-gray-400	text-xs	mt-3">
          <p>Volumetric weight includes dimensions of the product</p>
        </div>
        <div className="mt-4">
          <Upload />
        </div>
        <div className="flex mt-6 mb-28">
          <img src={ButtonIcon} alt="Add Product" width="16px" />
          <span className="ml-2 text-blue-600 text-base" onClick={handleData}>Add Product</span>
        </div>
      </div>
      <footer className="w-full fixed  bottom-0 	">
        <div className="grid grid-cols-2  shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0">
          {window.location.pathname !== "/neworder/label" ? (
            <>
              <ServiceButton
                text="BACK"
                onClick={() => {
                  window.history.back();
                }}
              />
            </>
          ) : (
            <>
              <ServiceButton
                text="DOWNLOAD"
                icon={DownloadIcon}
                showIcon={true}
                className="!bg-[#F2F6FF] text-[#0066FF] border-none text-[14px] font-semibold "
              />
            </>
          )}

          <ServiceButton
            text="SAVE CAMBO"
            className="bg-[#1C1C1C] text-[#FFFFFF]"
            onClick={() => {
              console.log(window.location.pathname);

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
export default ProductAddCombo;
