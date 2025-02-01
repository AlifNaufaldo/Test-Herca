"use client";
import { FC } from "react";

interface NavbarProps {
  onSelectSection: (section: string) => void;
  activeSection: string;
}

const Navbar: FC<NavbarProps> = ({ onSelectSection, activeSection }) => {
  return (
    <nav className="bg-white dark:bg-gray-900 sticky top-0 w-full z-20 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {[
              { id: "marketing", label: "Marketing" },
              { id: "penjualan", label: "Penjualan" },
              { id: "commission", label: "Commission" },
              { id: "payment", label: "Payment" },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onSelectSection(item.id)}
                  className={`block py-2 px-3 rounded-sm md:p-0 transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-blue-700 dark:text-blue-400 font-bold"
                      : "text-gray-900 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
