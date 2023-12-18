'use client'
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import Button from "@/components/elements/Button";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { decrement, increment, removeValue } from "@/GlobalRedux/features/counterSlice";
import { useState } from "react";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const value = useAppSelector((state)=> state.counter.value);
 const [disable, setDisable] = useState<boolean>(false)
const handleClick= ()=> {
 if(value >= 1){
    setDisable(false)
    dispatch(decrement())
  }
  else{
    setDisable(true)
    
  }
  console.log(disable)
}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
        <h1>test</h1>
      <div className="flex flex-col">
        <Button handleOnClick={() => dispatch(increment())}>tambah</Button>
        <h3 className="text-3xl font-bold">{value}</h3>
        <button onClick={() =>dispatch(decrement())} disabled = {value === 0} className={` ${value === 0 ? 'bg-slate-800 ' : 'bg-transparent'} `} >kurang</button>
         <Button handleOnClick={() => dispatch(removeValue())}>reset</Button>
      </div>
    </main>
  );
}
