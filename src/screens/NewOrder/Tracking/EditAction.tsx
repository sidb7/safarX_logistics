// import React, { useState } from "react";
// import CustomDropDown from "../../../components/DropDown";
// import OneButton from "../../../components/Button/OneButton";
// import crossIcon from "../../../assets/cross.svg";
// import CustomInputBox from "../../../components/Input";
// import toast from "react-hot-toast";


// interface IPROPS {
//   onClose: any;
//   onSubmit: any;
// }

// const EditAction = (props: IPROPS) => {
//   const { onClose, onSubmit } = props;
//   const [action, setAction] = useState("");
//   const [remark, setRemark] = useState("");

//   const handleSubmit = () => {
//     onSubmit({ action, remark });
//     onClose();
//   };

//   const options = [
//     { value: "RTO", label: "RTO" },
//     { value: "REATTEMPT", label: "REATTEMPT" },
//   ];

//   return (
//     <>
//       <div className="flex justify-between items-center p-4 border-b">
//         <h2 className="font-Lato  text-2xl leading-5 text-black font-normal">
//           Action
//         </h2>
//         <img
//           src={crossIcon}
//           alt="EditIcon"
//           className="ml-1 w-6 h-6 cursor-pointer"
//           onClick={onClose}
//         />
//       </div>
//       <div className="p-4">
//         <CustomDropDown
//           options={options}
//           onChange={(e) => setAction(e.target.value)}
//           value={action}
//           placeHolder=""
//           heading="Select Action"
//         />
//         <div className="mt-4">
//           <CustomInputBox
//             label="Remark"
//             value={remark}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setRemark(e.target.value)
//             }
//             placeholder=""
//             inputType="text"
//             isRequired={true}
//             minLength={1}
//             maxLength={200}
//             className="h-[#751px]"
//           />
//         </div>
//       </div>

//       <div className="">
     

//       <footer className="mt-auto bottom-0 absolute w-full">
//         <div className="grid grid-cols-2 gap-4 p-4 shadow-lg border bg-white rounded-tl-xl rounded-tr-xl w-full lg:flex lg:justify-end lg:gap-8 lg:p-6">
//           <OneButton text="Back" variant="secondary" onClick={onClose}  />
//           <OneButton text="Save" onClick={handleSubmit} variant="primary" />
//         </div>
//       </footer>

//       </div>
//     </>
//   );
// };

// export default EditAction;


import React, { useState } from "react";
import CustomDropDown from "../../../components/DropDown";
import OneButton from "../../../components/Button/OneButton";
import crossIcon from "../../../assets/cross.svg";
import CustomInputBox from "../../../components/Input";
import toast from "react-hot-toast";

interface IPROPS {
  onClose: any;
  onSubmit: any;
}

const EditAction = (props: IPROPS) => {
  const { onClose, onSubmit } = props;
  const [action, setAction] = useState("");
  const [remark, setRemark] = useState("");

  const handleSubmit = () => {
    if (!action || !remark) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      onSubmit({ action, remark });
      toast.success("Action saved successfully");
      onClose();
    } catch (error) {
      console.error("Error saving action:", error);
      toast.error("Failed to save action. Please try again.");
    }
  };

  const options = [
    { value: "RTO", label: "RTO" },
    { value: "REATTEMPT", label: "REATTEMPT" },
  ];

  return (
    <>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-Lato  text-2xl leading-5 text-black font-normal">
          Action
        </h2>
        <img
          src={crossIcon}
          alt="EditIcon"
          className="ml-1 w-6 h-6 cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div className="p-4">
        <CustomDropDown
          options={options}
          onChange={(e) => setAction(e.target.value)}
          value={action}
          placeHolder=""
          heading="Select Action"
        />
        <div className="mt-4">
          <CustomInputBox
            label="Remark"
            value={remark}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRemark(e.target.value)
            }
            placeholder=""
            inputType="text"
            isRequired={true}
            minLength={1}
            maxLength={200}
            className="h-[#751px]"
          />
        </div>
      </div>

      <div className="">
        <footer className="mt-auto bottom-0 absolute w-full">
          <div className="grid grid-cols-2 gap-4 p-4 shadow-lg border bg-white rounded-tl-xl rounded-tr-xl w-full lg:flex lg:justify-end lg:gap-8 lg:p-6">
            <OneButton text="Back" variant="secondary" onClick={onClose} />
            <OneButton text="Save" onClick={handleSubmit} variant="primary" />
          </div>
        </footer>
      </div>
    </>
  );
};

export default EditAction;