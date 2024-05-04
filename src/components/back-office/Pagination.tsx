import { IPaginationProps } from "@/utils/types";
import Link from "next/link";
const Pagination = (props: IPaginationProps) => {
  const { pageNumber, setPageNumber, totalItems, perPage, showItems } = props;
  let totalPage = Math.ceil(totalItems / perPage);
  let startPage = pageNumber;
  let dif = totalPage - pageNumber;
  if (dif <= showItems) {
    startPage = totalPage - showItems;
  }
  let endPage = startPage < 0 ? showItems : showItems + startPage;
  if (startPage <= 0) {
    startPage - 1;
  }

  const createButton = () => {
    const btns = [];
    for (let i = startPage; i <= endPage; i++) {
      btns.push(
        <li key={i}>
          <Link
          
            href="#"
            aria-current="page"
            className={`${
              pageNumber == i ? "bg-slate-600" : "bg-slate-900"
            } z-10 flex items-center justify-center px-3 h-8 leading-tight  border-slate-500  text-white`}
          >
            {i}
          </Link>
        </li>
      );
    }
    return btns;
  };
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul  className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <button
              disabled={pageNumber <= 1 ? true : false}
              onClick={() => {
                pageNumber - 1;
              }}
              className={`${
                pageNumber <= 1 ? "bg-slate-600 hover:bg-slate-600 hover:text-slate-400" : ""
              } flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-e-0  rounded-s-lg bg-slate-900 hover:bg-slate-400 hover:text-slate-700 border-slate-700 text-slate-400 dark:hover:bg-slate-700 `}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>

          {createButton()}
          <li>
            <button
              onClick={() => {
                pageNumber + 1;
              }}
              disabled={pageNumber == totalPage ? true : false}
              className={`${
                pageNumber == totalPage ? "bg-slate-600 hover:bg-slate-600 hover:text-slate-400" : ""
              } flex items-center justify-center px-3 h-8 leading-tight text-slate-500 bg-slate-900 border border-slate-600 rounded-e-lg hover:bg-slate-400 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white`}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
