import { faDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";

export const TotalRevenue = () => {
  const {revenue}=useSelector((state)=>state.parking)
  return (
    <div className="flex flex-col
    
     sm:flex-row w-full
     md:text-md bg-white justify-start gap-4 items-center border border-slate-300 p-4 sm:p-6 rounded-md">
      <div className="bg-slate-200 text-lg md:text-md lg:text-2xl rounded-full p-2 flex justify-center items-center">
        <FontAwesomeIcon icon={faDollar} />
      </div>
      <div className="text-center sm:text-left md:text-md lg:text-2xl font-semibold text-slate-800">
        <div>Today's Revenue</div>
        <div className="font-bold text-2xl md:text-xl">${revenue}</div>
      </div>
    </div>
  );
};
