import React, { useEffect } from "react";
import { Card } from "./Card";
import { TotalSlots } from "./TotalSlots";
import { Occupied } from "./Occupied";
import { Available } from "./Available";
import { TotalRevenue } from "./TotalRevenue";
import { useDispatch, useSelector } from "react-redux";
import CarRegistrationModal from "./CarRegistrationModel";
import {
  setRows,
  setCols,
  createGrid,
  openModel,
  closeModel,
  registerCar,
  openBookedModel,
  closeBookedModel,
  setRevenue
} from "../store/parkingSlice";
import { BookedSlotInfo } from "./BookedInfo";

export const Grid = () => {
  const dispatch=useDispatch()
  const {row,col,grid,isModelOpen,selectedSlot,isBookedModelOpen,bookedValues,entryTime}=useSelector((state)=>state.parking)
  
  useEffect(() => {
  dispatch(createGrid());
}, [dispatch]);  

  return (
    <div className="bg-slate-200 border border-slate-300 p-4 flex flex-col gap-8">
      <div className="bg-white p-4 rounded-md shadow font-semibold flex gap-2 justify-center flex-wrap items-center">
        <label>Rows</label>
        <input
          type="number"
          value={row}
          onChange={(e) => dispatch(setRows(Number(e.target.value)))}
          placeholder="Enter Rows"
          className="w-full sm:max-w-[25%] md:max-w-[15%] lg:max-w-[8%] border-2 border-black/50 rounded-md text-center"
          onKeyDown={(e) => e.key === "Enter" && dispatch(createGrid())}
        />

        <label>Columns</label>
        <input
          type="number"
          value={col}
          onChange={(e) => dispatch(setCols(Number(e.target.value)))}
          placeholder="Enter Cols"
          className="w-full sm:max-w-[25%] md:max-w-[15%] lg:max-w-[8%] border-2 border-black/50 rounded-md text-center"
          onKeyDown={(e) => e.key === "Enter" && dispatch(createGrid())}
        />
        
        <button
          className="bg-black font-semibold text-white px-4 rounded-sm"
          onClick={()=>dispatch(createGrid())}
        >
          Create
        </button>
      </div>

      <div className="flex justify-between items-center gap-4 md:gap-2 lg:gap-4 flex-wrap md:flex-nowrap">
        <TotalSlots row={row} col={col} />
        <Occupied/>
        <Available/>
        <TotalRevenue/>
      </div>

      <div className="bg-white p-4 pb-4 rounded-md shadow">
        <div className="font-semibold px-4 flex justify-between mb-4">
          <p>
            Parking Layout ({row || 0}x{col || 0} Grid)
          </p>
          <div className="flex justify-center gap-2 items-center">
            <span className="bg-black/10 h-[16px] w-[16px] rounded-sm"></span>
            <p>Available</p>
            <span className="bg-black h-[16px] w-[16px] rounded-sm"></span>
            <p>Occupied</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {Array.from({ length: row || 0 }, (_, i) => {
            const rowSlots = grid.filter((slot) => slot && slot.row === i + 1);
            return (
              <div key={i} className="flex gap-4 justify-center flex-wrap">
                {
                rowSlots.map((slot) => (
                  <Card
                    key={`${slot.row}-${slot.col}`}
                    state={slot.state}
                    row={slot.row}
                    col={slot.col}
                    carNumber={slot.carNumber}
                    onClick={() =>!slot.state?dispatch(openModel(slot)):dispatch(openBookedModel(slot))}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {isModelOpen && (
        <CarRegistrationModal
          slot={selectedSlot}
          onClose={() => dispatch(closeModel())}
          onRegister={(carNumber)=>dispatch(registerCar({
            ...selectedSlot,
            carNumber:carNumber,
            entryTime:new Date().toISOString()
          }))
          }
        />
      )}

      {isBookedModelOpen &&(
        <BookedSlotInfo 
        slot={bookedValues}
        onClose={()=>dispatch(closeBookedModel())}/>
      )}
    </div>
  );
};