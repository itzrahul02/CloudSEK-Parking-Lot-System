import React, { useState } from "react";
import { getLabel } from "../utils/getLabel";

const CarRegistrationModal = ({ slot, onClose, onRegister }) => {
  const [registrationNumber, setRegistrationNumber] = useState("");
   
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 ">
      <div className="bg-white rounded-lg shadow-lg w-[400px] ">
        <div className="flex justify-between items-center pb-3 p-6">
          <h2 className="text-lg text-gray-700 font-semibold">Add Car Registration</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            ✕
          </button>
        </div>
        <div className="w-full border border-[#99A1AF80]"/>

        <div className="mt-4 space-y-4 text-slate-600 p-6">
          <div>
            <label className="block text-sm font-medium mb-1">Parking Slot</label>
            <input
              type="text"
              value={getLabel(slot.row,slot.col)}
              disabled
              className="w-full px-3 text-black py-2 border border-[#99A1AF46] rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Car Registration Number</label>
            <input
              type="text"
              placeholder="Enter registration number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className="w-full px-3 py-2 border border-[#99A1AF46] rounded-md"
            />
          </div>

          <p className="text-sm text-gray-600">
            <strong>Entry Time:</strong> {new Date().toLocaleString()}
          </p>
        </div>
        <div className="w-full border border-[#99A1AF80]"/>

        <div className="flex justify-end gap-3 p-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#99A1AF80] rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onRegister(registrationNumber)}
            disabled={!registrationNumber}
            className="px-4 py-2 bg-black text-white rounded-md  disabled:opacity-50"
          >
            Assign Car
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarRegistrationModal;
