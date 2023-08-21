import React, { useState } from "react";
import OtpInput from "react-otp-input";
import "../../../../styles/otpStyle.css";

type Props = {};

const Otp = (props: Props) => {
  const [otp, setOtp] = useState("");

  return (
    <div>
      <div className="flex justify-center">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>&nbsp;</span>}
          inputStyle={`mr-4 border-[1px] h-10 w-10 text-center border-[#A4A4A4]  rounded`}
          renderInput={(props) => <input {...props} />}
        />
      </div>
    </div>
  );
};

export default Otp;
