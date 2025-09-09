import { faCar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { getLabel } from "../utils/getLabel";

export const Card = ({ state, row, col, onClick, carNumber }) => {
  return (
    <>
      {state === true ? (

        <div
          onClick={onClick}
          className="cursor-pointer bg-black w-[150px] h-[100px] rounded-md flex justify-center items-center hover:scale-105 transition"
        >
          <div className="flex justify-center items-center flex-col">
            <p className="text-center text-white">{getLabel(row, col)}</p>
            <p><FontAwesomeIcon icon={faCar} className=" text-white" /></p>
            <p className="text-center text-white">{carNumber}</p>
          </div>
        </div>
      ) : (
  
        <div
          onClick={onClick}
          className="cursor-pointer bg-gray-500 text-white w-[150px] h-[100px] rounded-md flex justify-center items-center hover:scale-105 transition"
        >
          <div>
            <p className="text-center text-white">{getLabel(row, col)}</p>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
      )}
    </>
  );
};
