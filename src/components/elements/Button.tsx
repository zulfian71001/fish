import { MouseEventHandler } from "react"

type Props = {
    children: string
    classname?:string
    handleOnClick?:MouseEventHandler<HTMLButtonElement>
    disabled?:boolean
}


const Button = (props:Props) => {
  const {children, classname, handleOnClick,disabled} = props
  return (
   
    <button className={`p-2 border-2 rounded-md ${classname}`} onClick={handleOnClick} disabled={disabled}>
      {children}
    </button>

  )
}

export default Button
