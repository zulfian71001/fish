type Props = {
    children: string
    classname:string
    link?:string
}
import Link from "next/link"

const Button = (props:Props) => {
  const {children, classname, link} = props
  return (
    <Link className={`p-2 border-2 rounded-md ${classname}`} href={link || '#'}>
    <button>
      {children}
    </button>
    </Link>
  )
}

export default Button
