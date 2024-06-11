import { IPaginationProps } from "@/utils/types";
import Link from "next/link";

const Pagination = (props: IPaginationProps) => {
  const { pageNumber, setPageNumber, totalItems, perPage, showItems } = props;
  const totalPage = Math.ceil(totalItems / perPage);

  let startPage = pageNumber - Math.floor(showItems / 2);
  let endPage = pageNumber + Math.floor(showItems / 2);

  if (startPage < 1) {
    startPage = 1;
    endPage = showItems;
  }

  if (endPage > totalPage) {
    endPage = totalPage;
    startPage = totalPage - showItems + 1;
    if (startPage < 1) {
      startPage = 1;
    }
  }

  const createButton = () => {
    const btns = [];
    for (let i = startPage; i <= endPage; i++) {
      btns.push(
        <li key={i}>
          <Link
            href="#"
            aria-current="page"
            className={`bg-slate-200 text-slate-700 hover:bg-slate-300 ${
              pageNumber == i ? "bg-slate-300" : "bg-slate-200"
            } z-10 flex items-center justify-center px-3 h-8 leading-tight  border-slate-400  text-slate-700`}
            onClick={() => setPageNumber(i)}
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
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(pageNumber - 1)}
              className={`${
                pageNumber <= 1 ? "bg-slate-300 hover:bg-slate-300" : ""
              } flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-e-0 rounded-s-lg bg-slate-200 hover:bg-slate-300 hover:text-slate-700 border-slate-400 text-slate-700`}
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
              onClick={() => setPageNumber(pageNumber + 1)}
              disabled={pageNumber == totalPage}
              className={`${
                pageNumber == totalPage
                  ? "bg-slate-300 hover:bg-slate-200 hover:text-slate-300"
                  : ""
              } flex items-center justify-center px-3 h-8 leading-tight text-slate-700 bg-slate-200 border border-slate-400 rounded-e-lg hover:bg-slate-300 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white`}
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
