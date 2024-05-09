import React, { useState } from "react";

// const tabs = [
//   { name: 'Group Account', href: '/account-creation', current: false },
//   { name: 'Sub Group', href: '/sub-group', current: false },
//   { name: 'Account List', href: '/account', current: false },
//   { name: 'Vendors', href: '/dashboard/vendors', current: false },
//   { name: 'Billing', href: '/billing', current: false },
//   { name: 'Petty Cash', href: '/petty', current: true },
//   // { name: 'Offer', href: '#', current: false },
//   // { name: 'Sales', href: '#', current: false },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavigationHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // const handleSelectChange = (e) => {
  //   const selectedTab = tabs.find((tab) => tab.name === e.target.value);
  //   if (selectedTab) {
  //     window.location.href = selectedTab.href;
  //   }
  // };
  //
  return (
    <div className="relative border-b border-gray-200 pb-5 mb-6 ml-8 sm:pb-0 ">
      <div className="md:flex md:items-center md:justify-between">
        <div className="mt-3 flex md:absolute md:right-0 mb-4 md:top-0 md:mt-0">
          {/* <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Print
          </button> */}
          {/* <button
            type="button"
            className="ml-3 mr-4 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            + New Entry
          </button> */}
          <div className="flex items-center gap-x-4 lg:gap-x-6 relative">
            <div>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                id="menu-button"
                style={{
                  fontFamily: "outfit, sans-serif",
                  height: "40px",
                  width: "120px",
                  marginTop: "-4px",
                }}
                aria-expanded={isOpen ? "true" : "false"}
                aria-haspopup="true"
                onClick={toggleDropdown}
              >
                + New Entry
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </button>
            </div>

            {isOpen && (
              <div
                className="absolute left-0 z-10 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
                style={{ top: "calc(100% + 0.5rem)" }}
              >
                <div className="py-1" role="none">
                  <a
                    href="/products"
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    Products
                  </a>
                  <a
                    href="/group-creation"
                    className="text-gray-700 block px-4 py-2 text-sm hover:green"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-1"
                  >
                    Group Account
                  </a>
                  <a
                    href="/view"
                    className="text-gray-700 block px-4 py-2 text-sm hover:green"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-1"
                  >
                    Petty Cash
                  </a>
                  <a
                    href="/sub-group"
                    className="text-gray-700 block px-4 py-2 text-sm hover:green"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-1"
                  >
                    SubGroup Accounts
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm hover:green"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-1"
                  >
                    Billing
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm hover:green"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-1"
                  >
                    Add Account
                  </a>
                </div>
                {/* Remaining menu items */}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div className="mt-4">
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            defaultValue={tabs.find((tab) => tab.current).name}
            onChange={handleSelectChange}
          >
            {tabs.map((tab) => (
              <option key={tab.name} value={tab.name}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div> */}
    </div>
  );
}
