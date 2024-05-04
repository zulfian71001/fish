import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Dropdown = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false)

  const dropdownContent = [
      {
        name: "Home",
        url: "/home",
      },
      {
        name: "Register Seller",
        url: "/seller-register",
      }, 
  ]
  return (
    <div className="relative">
  <button
    className="text-white bg-cyan-500 hover:bg-cyan-600  font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center "
    type="button"
    onClick={() => setOpen(!open)}
  >
    {
      dropdownContent.find((item:any) => item.url === pathname)?.name
    }
    <svg
      className="w-2.5 h-2.5 ms-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m1 1 4 4 4-4"
      />
    </svg>
  </button>
  {/* Dropdown menu */}
  <div
    id="dropdownInformation"
    className={`z-40 bg-white divide-y divide-gray-100 rounded-lg shadow w-24 dark:bg-gray-700 dark:divide-gray-600 ${open ? "absolute top-11" : "hidden"}`}
  >
    <ul
      className="py-2 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownInformationButton"
    >
        {
          dropdownContent.map((item:any, i:number) => (
            <li key={i}>
            <Link
              href={item.url}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {item.name}
            </Link>
          </li>
          ))
        }

    </ul>

  </div>
</div>

  );
};

export default Dropdown;
