import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type data = {
    value:number
}

const initialState:data = {
    value:0
}

export const counterSLice = createSlice({
    name:"counter",
    initialState,
    reducers:{
        increment:(state)=>{
            state.value+=1;
        },
        decrement:(state)=>{
            if(state.value !== 0){

                state.value-=1;
            }
        },
        incrementByAmount:(state,action:PayloadAction<number>)=>{
            state.value += action.payload
        },
        removeValue:()=>{
            return initialState
        },
    }
})

export const {increment, decrement, incrementByAmount, removeValue} = counterSLice.actions;

export default counterSLice.reducer