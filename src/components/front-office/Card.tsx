import Image from "next/image";
import { FaStar } from "react-icons/fa6";

interface Props {
  title: string;
  image: string;
  desc: string;
  link: string;
  price: string;
  city: string;
  stars:string;
}

const Card = (props: Props) => {
  const { title, image, desc, link, price, city, stars } = props;
  return (
    <div className="">
      <div>
        <Image src={image} alt={title} />
      </div>
      <div className="p-2">
        <p>{desc}</p>
        <p>Rp {price}</p>
        <p>{city}</p>
        <p><span><FaStar className="text-yellow-400"/></span>{stars}</p>
      </div>
    </div>
  );
};

export default Card;
