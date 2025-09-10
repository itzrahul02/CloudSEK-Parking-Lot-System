import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLabel } from "../utils/getLabel";
import { getElapsedTime } from "../utils/TimeElapsed";
import {useNavigate} from "react-router-dom"
export const BookedSlotInfo=({slot,onClose})=>{
    const {bookedValues}=useSelector((state)=>state.parking)

    const router = useNavigate();
    const onBilling=()=>{
        router(
            `/billing?registrationNumber=${bookedValues.carNumber}&entryTime=${encodeURIComponent(
            bookedValues.entryTime
            )}&slot=${getLabel(slot.row, slot.col)}`
  );
    } 
    return(
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
                <div
                    className="w-full px-3 py-2 border border-[#99A1AF46] rounded-md"
                >{bookedValues.carNumber}</div>
                </div>
    
                <p className="text-gray-600">
                <strong>Entry Time:</strong>{" "}
                {new Date(bookedValues.entryTime).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })}
                </p>

                
                <p>
                    <strong>Time Elapsed</strong> {getElapsedTime(bookedValues.entryTime)}
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
                onClick={() => onBilling()}
                className="px-4 py-2 bg-black text-white rounded-md  disabled:opacity-50"
                >
                Billing
                </button>
            </div>
            </div>
        </div>
    )
}