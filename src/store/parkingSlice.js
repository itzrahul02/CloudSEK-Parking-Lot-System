import {createSlice} from "@reduxjs/toolkit"

const initialState={
    row:4,
    col:6,
    grid:[],
    isModelOpen:false,
    selectedSlot:null,
    isBookedModelOpen:false,
    bookedValues:null,
    entryTime:null,
    revenue:0
}

const parkingSlice= createSlice({
    name:"parking",
    initialState,
    reducers:{
        setRows:(state,action)=>{
            console.log(action);
            state.row=action?.payload
        },
        setCols:(state,action)=>{
            state.col=action?.payload
        },
        createGrid:(state)=>{
            state.grid=[]
            for(let i=1;i<=state.row;i++){
                for (let j=1;j<=state.col;j++){
                    state.grid.push({
                        row:i,col:j,state:false,carNumber:"",entryTime:""
                    })
                }
            }
        },

        openModel:(state,action)=>{
            console.log(action.payload);
            state.selectedSlot=action.payload
            state.isModelOpen=true
        },
        openBookedModel:(state,action)=>{
            console.log("openBookedModel",action.payload);
            state.bookedValues=action.payload
            state.isBookedModelOpen=true
        },
        closeModel:(state)=>{
            state.isModelOpen=false,
            state.selectedSlot=null
        },
        closeBookedModel:(state)=>{
            state.isBookedModelOpen=false,
            state.bookedValues=null
        },
        registerCar:(state,action)=>{
        const {row,col,carNumber,entryTime} = action.payload

        state.grid = state.grid.map((slot)=>{
            if (slot.row === row && slot.col === col) {
            return {
                ...slot,
                state: true,
                carNumber: carNumber,
                entryTime:entryTime
            }
            }
            return slot
        })

        state.isModelOpen = false
        state.selectedSlot = null
        },
        setRevenue: (state, action) => {
        const { row, col, revenue } = action.payload;
        state.revenue += revenue;
        state.grid = state.grid.map((eachSlot) => {
            if (eachSlot.row === row && eachSlot.col === col) {
            return { ...eachSlot, state: false, entryTime: "", carNumber: "" };
            }
            return eachSlot;
        });
        }

    }
})



export const {
  setRows,
  setCols,
  createGrid,
  openModel,
  closeModel,
  registerCar,
  openBookedModel,
  closeBookedModel,
  setRevenue
} = parkingSlice.actions;

export default parkingSlice.reducer;