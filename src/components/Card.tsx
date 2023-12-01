interface Props {
    title: string
    image: string
    desc: string
    link: string
}


const Card = (props:Props) => {
    const {title, image, desc, link,} = props
  return (
    <div>
      <div>test</div>
    </div>
  )
}

export default Card
