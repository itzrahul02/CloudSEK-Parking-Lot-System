import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAddressCard, faCar, faCreditCard, faBars, faTimes, faPrint } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeBookedModel, setRevenue } from "../store/parkingSlice";

import { getLabel, getSlot } from "../utils/getLabel";
export const Billing = () => {
  const [searchParams] = useSearchParams();
  const navigate=useNavigate()
  const [regNumber, setRegNumber] = useState(searchParams.get("registrationNumber")||"");
  const [receipt, setReceipt] = useState(
    {
    regNumber: null,
    slot: null,
    entryTime: null,
    exitTime: null,
    duration: null,
    initialCost: null,
    additionalCost: null,
    totalAmount: null,
    generatedOn: null,
  }
  );
  const dispatch=useDispatch()
  const { grid } = useSelector((state) => state.parking);
  const handleCloseParking=()=>{

    const {row,col}=getSlot(receipt.slot)
    dispatch(setRevenue({row:row,col:col,revenue:receipt.totalAmount}))
    dispatch(closeBookedModel())
    navigate('/')
  }
const generateReceipt = () => {
  if (!regNumber) return alert("Enter a registration number");

  const slot = grid.find((s) => s && s.carNumber === regNumber);

  if (!slot) return alert("Car not found in parking grid");

  const entryTime = new Date(slot.entryTime); 
  const exitTime = new Date();

  const durationMs = exitTime - entryTime; 
  const durationSec = Math.floor(durationMs / 1000); 

  const hours = Math.floor(durationSec / 3600);
  const minutes = Math.floor((durationSec % 3600) / 60);
  const seconds = durationSec % 60;

  let initialCost = 5;
  let additionalCost = 0;

  if (durationSec > 30) {
    const extraTime = durationSec - 30;
    additionalCost = Math.ceil(extraTime / 10); 
  }

  const totalAmount = initialCost + additionalCost;

  setReceipt({
    regNumber: slot.carNumber,
    slot: getLabel(slot.row, slot.col),
    entryTime: entryTime.toLocaleTimeString(),
    exitTime: exitTime.toLocaleTimeString(),
    duration: `${hours}h ${minutes}m ${seconds}s`,
    initialCost,
    additionalCost,
    totalAmount,
    generatedOn: exitTime.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  });
};



 useEffect(() => {
  const urlReg = searchParams.get("registrationNumber");
  if (urlReg) {
    setRegNumber(urlReg);
    generateReceipt(); 
  }
}, []);

  return (
    <div className="p-4 bg-slate-100 flex flex-col gap-8 sm:flex-row sm:items-start">
  {/* Left Panel */}
  <div className="bg-white p-6 rounded-md shadow-md flex-1 flex flex-col gap-4 w-full sm:w-1/2">
    <h2 className="text-lg font-semibold">Generate Receipt</h2>
    <label className="font-medium">Car Registration Number</label>
    <input
      type="text"
      value={regNumber}
      onChange={(e) => setRegNumber(e.target.value)}
      placeholder="Enter registration number"
      className="border rounded-md p-2 w-full"
    />
    <button
      className="bg-black text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-800 transition-colors w-full sm:w-auto"
      onClick={generateReceipt}
    >
      Generate Receipt
    </button>
  </div>

  {/* Right Panel */}
  <div className="bg-white p-6 rounded-md shadow-md flex-1 flex flex-col gap-4 w-full sm:w-1/2">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div className="text-xl font-semibold">Receipt Preview</div>
      {receipt && (
          <div className="flex flex-wrap gap-2 justify-center sm:justify-end text-sm md:text-xs lg:text-sm">
            <button
              onClick={()=>window.print()}
              className="bg-gray-300 px-2 md:px-3 py-1 rounded-md hover:bg-gray-400 flex items-center gap-1"
            >
              <FontAwesomeIcon icon={faPrint} /> Print
            </button>
            <button
              onClick={handleCloseParking}
              className="bg-black text-white px-2 md:px-3 py-1 rounded-md hover:bg-gray-800 flex items-center gap-1"
            >
              <FontAwesomeIcon icon={faCar} /> Close Parking
            </button>
          </div>
      )}
    </div>
    {receipt ? (
      <div className="border bg-[#99a1af21] border-gray-200 p-4 rounded-md flex flex-col gap-2 overflow-x-auto">
        <h3 className="text-center text-xl font-semibold">PARKING RECEIPT</h3>
        <div className="my-2 w-16 border-1 border-[#99A1AF46] mx-auto" />
        <div className="flex justify-between">
          <span>Registration Number:</span>
          <span>{receipt.regNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>Parking Slot:</span>
          <span>{receipt.slot}</span>
        </div>
        <div className="flex justify-between">
          <span>Entry Time:</span>
          <span>{receipt.entryTime}</span>
        </div>
        <div className="flex justify-between">
          <span>Exit Time:</span>
          <span>{receipt.exitTime}</span>
        </div>
        <div className="flex justify-between">
          <span>Duration:</span>
          <span>{receipt.duration}</span>
        </div>
        <div className="my-2 w-full border-[1px] border-[#99A1AF46] mx-auto" />
        <div className="flex justify-between">
          <span>Initial 30 seconds:</span>
          <span>${receipt.initialCost}.00</span>
        </div>
        <div className="flex justify-between">
          <span>Additional time ({receipt.additionalCost} intervals):</span>
          <span>${receipt.additionalCost}.00</span>
        </div>
        <div className="my-2 w-full border-1 border-[#99A1AF46] mx-auto" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total Amount:</span>
          <span>${receipt.totalAmount}.00</span>
        </div>
        <div className="my-2 w-full border-1 border-[#99A1AF46] mx-auto" />
        <p className="text-center text-sm text-gray-500">
          Thank you for parking with us! <br />
          Receipt generated on {receipt.generatedOn}
        </p>
      </div>
    ) : (
      <p className="text-gray-500 text-center">No receipt generated yet.</p>
    )}
  </div>
</div>

  );
};
