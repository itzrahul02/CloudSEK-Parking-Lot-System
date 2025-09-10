import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";

export const TotalSlots = () => {
  const {grid}=useSelector((state)=>state.parking)
  return (
    <div className="flex flex-col sm:flex-row w-full bg-white justify-start gap-4 items-center border border-slate-300 p-4 sm:p-6 rounded-md">
      <div className="bg-slate-200 text-lg rounded-full p-2 flex justify-center items-center">
        <FontAwesomeIcon icon={faCar} />
      </div>
      <div className="text-center sm:text-left font-semibold text-slate-800">
        <div>Total Slots</div>
        <div className="font-bold text-2xl">{grid.length}</div>
      </div>
    </div>
  );
};
