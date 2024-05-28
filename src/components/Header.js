import { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Button from "../components/Button";
import Dashboard from "../pages/Dashboard";
import Vendors from "../pages/Vendors";
import Deposit from "../pages/Deposit";
import Profit from "../pages/Profit";
import Loss from "../pages/Loss";
import Expense from "../pages/Expense";
import MainAccounts from "../pages/MainAccounts";
import About from "../pages/About";
import Reconciliation from "../pages/Reconciliation";
import Cashflows from "../pages/Cashflows";
import Budgets from "../pages/Budgets";
import Financial from "../pages/Financial";
import Transfers from "../pages/Transfers";
import Invoice from "../pages/Invoice";
import GroupAccount from "../pages/GroupCreation";
import AccountCreation from "../pages/AccountCreation";
import Products from "../pages/Products";
import Petty from "../pages/Petty";
import SubGroup from "../pages/SubGroup";
import Billing from "../pages/Billing";
import LineChart from "./LineGraph";
import TrialBalance from "../pages/TrialBalance";
import Transactions from "../pages/Transactions";
import Customer from "../pages/Customer";

import BillsForm from "./BillsForm";
import InvoiceSidebar from './InvoiceSidebar';

import InvoiceForm from "./InvoiceForm";
import EditInvoiceForm from "./EditInvoiceForm";


const navigation = [
  {
    name: "Dashboard",
    icon: HomeIcon,
    current: true,
    submenuItem: true,
    submenu: [{ name: "Home", href: "/", current: false }],
  },
  {
    name: "Banking",
    icon: UsersIcon,
    current: false,
    submenuItem: true,
    submenu: [
      { name: "Deposit", href: "/deposit", current: false },
      { name: "Transfers", href: "/transfers", current: false },
      { name: "Reconciliation", href: "/reconciliation", current: false },
    ],
  },
  {
    name: "Reports",
    icon: FolderIcon,
    current: false,
    submenuItem: true,
    submenu: [
      { name: "Profit", href: "/profit", current: false },
      { name: "Loss", href: "/loss", current: false },
      { name: "Financial Position", href: "/Financial", current: false },
      { name: "Cashflows", href: "/cashflows", current: false },
      { name: "Budgets", href: "/budgets", current: false },
    ],
  },
  {
    name: "Bill Tracker",
    icon: CalendarIcon,
    current: false,
    submenuItem: true,
    submenu: [
     
      { name: "Expense", href: "/expense", current: false },
    ],
  },
  {
    name: "Chart of Accounts",
    href: "#",
    icon: DocumentDuplicateIcon,
    current: false,
    submenuItem: true,
    submenu: [
      { name: "Accounts", href: "/account", current: false },
      { name: "Group Accounts", href: "/account-creation", current: false },
      { name: "SubGroup Accounts", href: "/sub-group", current: false },
      { name: "Transactions", href: "/transactions", current: false },
    ],
  }, 
  
  {
    name: "Bills & Invoice",
    icon: FolderIcon,
    current: false,
    submenuItem: true,
    submenu: [
      { name: "Billing", href: "/billing", current: false },
      { name: "Invoice", href: "/invoice", current: false },
     
    ],
  },
  {
    name: "People",
    href: "#",
    icon: DocumentDuplicateIcon,
    current: false,
    submenuItem: true,
    submenu: [
      { name: "Customer", href: "/customer", current: false },
      { name: "Vendors", href: "/vendors", current: false },
    ],
  },
  {
    name: "Files",
    icon: ChartPieIcon,
    current: false,
    submenuItem: true,
    submenu: [{ name: "About", href: "/about", current: false }],
  },
];
const teams = [
  { id: 1, name: "Users", href: "users", initial: "H", current: false },
  { id: 2, name: "Snap Shots", href: "#", initial: "T", current: false },
  { id: 3, name: "Calendar", href: "calendar", initial: "W", current: false },
];
const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Main() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
   <Fragment>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-gray-900"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-200 px-6 pb-4">
                    <div
                      className="flex grow flex-col gap-y-5 overflow-y-auto h-16 shrink-0 items-center bg-white px-6 pb-4"
                      style={{
                        width: "310px",
                        marginLeft: "-24px",
                        height: "80px",
                      }}
                    >
                      <img
                        className="h-16 w-24 rounded-full "
                        src="https://www.tracecorpsolutions.com/wp-content/uploads/2019/05/Tracecorp-logo.png"
                        alt="TraceCorp"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <h6
                            className="group -mx-2 flex gap-x-3 rounded-xl p-1 text-center text-xs leading-6 text-gray-500"
                            style={{ fontFamily: "outfit, sans-serif" }}
                          >
                            You are managing
                          </h6>
                          <li className="mt-auto bg-white rounded-xl mb-3">
                            <a
                              href="/"
                              className="group -mx-2 flex gap-x-3 rounded-xl p-2 pl-9 text-center text-sm leading-6 text-blue-500"
                              style={{ fontFamily: "outfit, sans-serif" }}
                            >
                              TraceCorp
                            </a>
                          </li>
                          <hr className=" flex gap-x-3 bg-gray-700 rounded-md text-center mb-3" />
                          <h6
                            className="group -mx-2 flex gap-x-3 rounded-xl text-center text-xs leading-6 text-gray-500"
                            style={{ fontFamily: "outfit, sans-serif" }}
                          >
                            Main Menu
                          </h6>
                          {navigation.map((item) => (
                            <Menu key={item.name} as="div" className="relative">
                              <Menu.Button
                                className={classNames(
                                  "group flex gap-x-3 rounded-xl p-2 text-sm leading-6",
                                  item.current
                                    ? "bg-gray-300 text-gray-500"
                                    : "text-gray-500",
                                  "hover:bg-green-300"
                                )}
                                style={{
                                  width: "250px",
                                  fontFamily: "outfit, sans-serif",
                                }}
                              >
                                <item.icon
                                  className={classNames(
                                    "text-gray-500 group-hover:text-blue-600",
                                    "h-6 w-6 saynk-0"
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                                <div className="flex-grow" />
                                <div>
                                  <ChevronDownIcon
                                    className={classNames(
                                      "text-gray-500 group-hover:text-gray-300",
                                      "h-5 w-5 text-gray-500 group-hover:text-gray-300"
                                    )}
                                    style={{ fontFamily: "outfit, sans-serif" }}
                                    aria-hidden="true"
                                  />
                                </div>
                              </Menu.Button>

                              <Transition
                                as={Fragment}
                                enter="transition ease-linear duration-200"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="mt-2 w-48 px-2 origin-top-right divide-gray-100 text-white rounded-xl focus:outline-none">
                                  {item.submenu.map((subItem) => (
                                    <Menu.Item key={subItem.name}>
                                      {({ active }) => (
                                        <a
                                          href={subItem.href}
                                          className={classNames(
                                            active ? "bg-green-300" : "",
                                            "block px-4 py-2 text-sm text-gray-500"
                                          )}
                                          style={{
                                            fontFamily: "outfit, sans-serif",
                                          }}
                                        >
                                          {subItem.name}
                                        </a>
                                      )}
                                    </Menu.Item>
                                  ))}
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          ))}
                        </li>
                        <li>
                          <div
                            className="text-xs font-semibold leading-6 text-gray-700"
                            style={{ fontFamily: "outfit, sans-serif" }}
                          >
                            Your teams
                          </div>
                          <ul className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-gray-700 text-gray-700"
                                      : "text-gray-700 hover:text-gray-700 hover:bg-green-300",
                                    "group flex gap-x-3 rounded-xl p-2 text-sm leading-6"
                                  )}
                                  style={{ fontFamily: "outfit, sans-serif" }}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-400 bg-gray-500 text-[0.625rem] font-medium text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto bg-white rounded-md">
                          <a
                            href="/"
                            className="group -mx-2 flex gap-x-3 rounded-xl p-2 pl-5 text-sm font-semibold leading-6 text-gray-500 hover:bg-green-300 hover:text-ray 500"
                            style={{ fontFamily: "outfit, sans-serif" }}
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-gray-500 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            Settings
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-200 px-4 pb-4">
            <div
              className="flex grow flex-col gap-y-5 h-16 shrink-0 flex justify-center items-center bg-white rounded-lg lg:w-full"
              style={{ width: "290px", marginLeft: "-12px" }}
            >
              <img
                className="h-20 w-20 bg-white rounded-full"
                src="https://www.tracecorpsolutions.com/wp-content/uploads/2019/05/Tracecorp-logo.png"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul className="flex flex-1 flex-col gap-y-7 mr-4">
                <li>
                  <h6
                    className="group -mx-2 flex gap-x-3 rounded-md p-1 text-center text-xs leading-6 text-gray-500"
                    style={{ fontFamily: "outfit, sans-serif" }}
                  >
                    You are managing
                  </h6>
                  <li className="mt-auto bg-white rounded-xl mb-3">
                    <a
                      href="/"
                      className="group -mx-2 flex gap-x-3 rounded-xl p-2 pl-9 text-center text-sm leading-6 text-blue-500"
                      style={{ fontFamily: "outfit, sans-serif" }}
                    >
                      TraceCorp
                    </a>
                  </li>
                  <hr className=" flex gap-x-3 bg-gray-700 rounded-md text-center mb-3" />
                  <h6
                    className="group -mx-2 flex gap-x-3 rounded-md text-center text-xs leading-6 text-gray-500"
                    style={{ fontFamily: "outfit, sans-serif" }}
                  >
                    Main Menu
                  </h6>
                  {navigation.map((item) => (
                    <li key={item.name}>
                      {item.submenu ? (
                        <Menu as="div" className="relative">
                          <Menu.Button
                            className={classNames(
                              "group flex gap-x-3 rounded-xl p-2 text-sm leading-6",
                              item.current
                                ? "bg-gray-300 text-gray-500"
                                : "text-gray-500",
                              "hover:bg-green-300"
                            )}
                            style={{
                              width: "250px",
                              fontFamily: "outfit, sans-serif",
                            }}
                          >
                            <item.icon
                              className={classNames(
                                "text-gray-500 group-hover:text-blue-600",
                                "h-6 w-6 saynk-0"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                            <div className="flex-grow" />
                            <div>
                              <ChevronDownIcon
                                className={classNames(
                                  "text-gray-500 group-hover:text-gray-300",
                                  "h-5 w-5 text-gray-500 group-hover:text-gray-300"
                                )}
                                style={{ fontFamily: "outfit, sans-serif" }}
                                aria-hidden="true"
                              />
                            </div>
                          </Menu.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-linear duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              className="mt-2.5 w-48 origin-top-right rounded-md py-1  ring-1 ring-gray-900/5 focus:outline-none"
                              style={{ width: "250px" }}
                            >
                              {item.submenu.map((subItem) => (
                                <Menu.Item key={subItem.name}>
                                  {({ active }) => (
                                    <a
                                      href={subItem.href}
                                      className={classNames(
                                        active
                                          ? " text-gray-900  hover:bg-green-300"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm  hover:bg-green-300"
                                      )}
                                      style={{ color: "gray" }}
                                    >
                                      {subItem.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ) : (
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-700 text-gray-500"
                              : "text-gray-500 hover:text-white hover:bg-gray-700",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-500"
                                : "text-gray-500 group-hover:text-gray-500",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      )}
                    </li>
                  ))}
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-500">
                    Your teams
                  </div>
                  <ul className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-gray-700 text-gray-500"
                              : "text-gray-500 hover:text-blue-600 hover:bg-green-300",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-400 bg-gray-500 text-[0.625rem] font-medium text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto rounded-md bg-white ">
                  <a
                    href="/"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm  leading-6 text-gray-500 hover:bg-green-300 hover:text-white"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-gray-500 pl-6 group-hover:text-green-300"
                      aria-hidden="true"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>

              <div className="flex items-center gap-x-4 lg:gap-x-6 mb-3">
                <Button />

                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 bg-gray-200 hover:text-gray-500 rounded-xl"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5 bg-gray-200 rounded-xl">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        Tom Cook
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/vendors" element={<Vendors />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/profit" element={<Profit />} />
                <Route path="/loss" element={<Loss />} />
                <Route path="/expense" element={<Expense />} />
                <Route path="/" element={<MainAccounts />} />
                <Route path="/about" element={<About />} />
                <Route path="/reconciliation" element={<Reconciliation />} />
                <Route path="/cashflows" element={<Cashflows />} />
                <Route path="/budgets" element={<Budgets />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/transfers" element={<Transfers />} />
                <Route path="/account-creation" element={<GroupAccount />} />
                <Route path="/account" element={<AccountCreation />} />
                <Route path="/petty" element={<Petty />} />
                <Route path="/sub-group" element={<SubGroup />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/trial-balance" element={<TrialBalance />} />
                <Route path="/products" element={<Products />} />
                <Route path="/grap" element={<LineChart />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/create-bills" element={<BillsForm/>} />
                <Route path="/create-invoice" element={<InvoiceForm />} />
                <Route path="/edit-invoice/:id" element={<EditInvoiceForm />} />
                <Route path="/view-invoice/:id" element={<InvoiceSidebar />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
   </Fragment>
     
  
  );
}