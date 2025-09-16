import React from "react";

const TrackCardComponent = () => {
  return (
    <div className="border rounded-xl bg-[#e7e4ff] px-3 py-3  ">
      <div className="relative w-full flex justify-end group">
        {/* Image */}
        <div className="absolute z-10 w-20 justify-end flex transition-transform duration-200 group-hover:scale-110">
          <img src="https://i.postimg.cc/rs41Lf8v/freepik-box.png" alt="" />
        </div>

        <div className="w-full">
          <div className="text-sm font-bold text-[#9082ff] font-Open">
            Know when your order will arrive
          </div>
          <p className="text-[10px] text-[#160783]">
            You will be redirected to myDrivaa to track all your orders.
          </p>

          {/* Button */}
          <button className="w-full border-[#160783] border text-sm rounded-lg hover:text-white hover:bg-[#160783] scale-95 group-hover:scale-100 text-[#160783] py-2 duration-150 transition mt-4">
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackCardComponent;
