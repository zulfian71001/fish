import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt as FaStarHalf } from "react-icons/fa";

const RatingTemp = ({ ratings }: { ratings: number }) => {
  if (ratings === 5) {
    return (
      <>
        <span className="text-yellow-300">
          <FaStar />
        </span>
        <span className="text-yellow-300">
          <FaStar />
        </span>
        <span className="text-yellow-300">
          <FaStar />
        </span>
        <span className="text-yellow-300">
          <FaStar />
        </span>
        <span className="text-yellow-300">
          <FaStar />
        </span>
      </>
    );
  } else if (ratings === 4) {
    return (
      <>
        <span className="text-yellow-300">
          <FaStar />
        </span>
        <span className="text-yellow-300">
          <FaStar />
        </span>
        <span className="text-yellow-300">
          <FaStar />
        </span>
        <span className="text-yellow-300">
          <FaStar />
        </span>
        <span className="text-slate-600">
          <CiStar />
        </span>
      </>
    );
  } else if (ratings === 3) {
    return (
      <>
        <span className="text-yellow-300">
          <FaStar />
        </span>
        <span className="text-yellow-300">
          <FaStar />
        </span>
        <span className="text-yellow-300">
          <FaStar />
        </span>
        <span className="text-slate-600">
          <CiStar />
        </span>
        <span className="text-slate-600">
          <CiStar />
        </span>
      </>
    );
  } else if (ratings === 2) {
    return (
      <>
        <span className="text-yellow-300">
          <FaStar />
        </span>
        <span className="text-yellow-300">
          <FaStar />
        </span>
        <span className="text-slate-600">
          <CiStar />
        </span>
        <span className="text-slate-600">
          <CiStar />
        </span>
        <span className="text-slate-600">
          <CiStar />
        </span>
      </>
    );
  } else if (ratings === 1) {
    return (
      <>
        <span className="text-yellow-300">
          <FaStar />
        </span>
        <span className="text-slate-600">
          <CiStar />
        </span>
        <span className="text-slate-600">
          <CiStar />
        </span>
        <span className="text-slate-600">
          <CiStar />
        </span>
        <span className="text-slate-600">
          <CiStar />
        </span>
      </>
    );
  } else {
    return (
      <>
        <span className="text-slate-600">
          <CiStar />
        </span>
        <span className="text-slate-600">
          <CiStar />
        </span>
        <span className="text-slate-600">
          <CiStar />
        </span>
        <span className="text-slate-600">
          <CiStar />
        </span>
        <span className="text-slate-600">
          <CiStar />
        </span>
      </>
    );
  }
};

export default RatingTemp;
