import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt as FaStarHalf} from "react-icons/fa";
const Ratings = ({ ratings }: { ratings: number }) => {
  return (
    <>
      {ratings >= 1 ? (
        <span className="text-yellow-300">
          <FaStar />
        </span>
      ) : ratings >= 0.5 ? (
        <span className="text-yellow-300">
          <FaStarHalf />
        </span>
      ) : (
        <span className="text-slate-600">
          <CiStar />
        </span>
      )}
            {ratings >= 2 ? (
        <span className="text-yellow-300">
          <FaStar />
        </span>
      ) : ratings >= 1.5 ? (
        <span className="text-yellow-300 ">
          <FaStarHalf />
        </span>
      ) : (
        <span className="text-slate-600">
          <CiStar />
        </span>
      )}
            {ratings >= 3 ? (
        <span className="text-yellow-300">
          <FaStar />
        </span>
      ) : ratings >= 2.5 ? (
        <span className="text-yellow-300">
          <FaStarHalf />
        </span>
      ) : (
        <span className="text-slate-600">
          <CiStar />
        </span>
      )}
            {ratings >= 4 ? (
        <span className="text-yellow-300">
          <FaStar />
        </span>
      ) : ratings >= 3.5 ? (
        <span className="text-yellow-300">
          <FaStarHalf />
        </span>
      ) : (
        <span className="text-slate-600">
          <CiStar />
        </span>
      )}
            {ratings >= 5 ? (
        <span className="text-yellow-300">
          <FaStar />
        </span>
      ) : ratings >= 4.5 ? (
        <span className="text-yellow-300">
          <FaStarHalf />
        </span>
      ) : (
        <span className="text-slate-600">
          <CiStar />
        </span>
      )}
    </>
  );
};

export default Ratings;
