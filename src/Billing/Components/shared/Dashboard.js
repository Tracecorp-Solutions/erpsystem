import React from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
    CursorArrowRaysIcon,
    EnvelopeOpenIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { BanknotesIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import SideNav from "../shared/navigations/SideNav"; // Import the SideNav component

const stats = [
    {
        id: 1,
        name: "Total Transactions",
        stat: "71,897",
        icon: UsersIcon,
        change: "122",
        changeType: "increase",
    },
    {
        id: 2,
        name: "Avg. Open Rate",
        stat: "58.16%",
        icon: EnvelopeOpenIcon,
        change: "5.4%",
        changeType: "increase",
    },
    {
        id: 3,
        name: "Total Expenses",
        stat: "24.57%",
        icon: CursorArrowRaysIcon,
        change: "3.2%",
        changeType: "decrease",
    },
    {
        id: 4,
        name: "Avg. Click Rate",
        stat: "24.57%",
        icon: CursorArrowRaysIcon,
        change: "3.2%",
        changeType: "decrease",
    },
];

const transactions = [
    {
        id: 1,
        name: "Payment to Molly Sanders",
        href: "#",
        amount: "$20,000",
        currency: "USD",
        status: "success",
        date: "July 11, 2020",
        datetime: "2020-07-11",
    },
    {
        id: 2,
        name: "Payment to Amos",
        href: "#",
        amount: "$30,000",
        currency: "USD",
        status: "success",
        date: "July 11, 2022",
        datetime: "2020-07-11",
    },
    {
        id: 3,
        name: "Payment to Daniel",
        href: "#",
        amount: "$4,000",
        currency: "USD",
        status: "success",
        date: "July 11, 2023",
        datetime: "2023-07-11",
    },
];

const statusStyles = {
    success: "bg-green-100 text-green-800",
    processing: "bg-yellow-100 text-yellow-800",
    failed: "bg-gray-100 text-gray-800",
};

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Dashboard = () => {
    return (
        <div className="flex">
            <SideNav />
            <div className="flex flex-col flex-1 py-6 px-6 max-md:px-5 ml-250">
                <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                    3rd May, 2024
                </div>
                <div className="text-4xl font-semibold leading-[57.6px] text-neutral-600">
                    Dashboard
                </div>

                <div className="mt-4">
                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
                        {stats.map((item) => (
                            <div
                                key={item.id}
                                className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
                            >
                                <dt>
                                    <div className="absolute rounded-md bg-indigo-500 p-3">
                                        <item.icon
                                            className="h-6 w-6 text-white"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <p className="ml-16 truncate text-sm font-medium text-gray-500">
                                        {item.name}
                                    </p>
                                </dt>
                                <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                                    <p className="text-2xl font-semibold text-gray-900">
                                        {item.stat}
                                    </p>
                                    <p
                                        className={classNames(
                                            item.changeType === "increase"
                                                ? "text-green-600"
                                                : "text-red-600",
                                            "ml-2 flex items-baseline text-sm font-semibold"
                                        )}
                                    >
                                        {item.changeType === "increase" ? (
                                            <ArrowUpIcon
                                                className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <ArrowDownIcon
                                                className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                                                aria-hidden="true"
                                            />
                                        )}
                                        <span className="sr-only">
                                            {" "}
                                            {item.changeType === "increase"
                                                ? "Increased"
                                                : "Decreased"}{" "}
                                            by{" "}
                                        </span>
                                        {item.change}
                                    </p>
                                    <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                                        <div className="text-sm">
                                            <a
                                                href="#"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                View all
                                                <span className="sr-only"> {item.name} stats</span>
                                            </a>
                                        </div>
                                    </div>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Activity list (smallest breakpoint only) */}
                <div className="shadow sm:hidden">
                    <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg leading-6 text-gray-900 sm:px-6 lg:px-8">
                        Recent activity
                    </h2>
                    <ul
                        role="list"
                        className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
                    >
                        {transactions.map((transaction) => (
                            <li key={transaction.id}>
                                <a
                                    href={transaction.href}
                                    className="block bg-white px-4 py-4 hover:bg-gray-50"
                                >
                                    <span className="flex items-center space-x-4">
                                        <span className="flex flex-1 space-x-2 truncate">
                                            <BanknotesIcon
                                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            <span className="flex flex-col truncate text-sm text-gray-500">
                                                <span className="truncate">
                                                    {transaction.name}
                                                </span>
                                                <span>
                                                    <span className="font-medium text-gray-900">
                                                        {transaction.amount}
                                                    </span>{" "}
                                                    {transaction.currency}
                                                </span>
                                                <time dateTime={transaction.datetime}>
                                                    {transaction.date}
                                                </time>
                                            </span>
                                        </span>
                                        <ChevronRightIcon
                                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Activity table (small breakpoints and up) */}
                <div className="hidden sm:block">
                    <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-lg font-medium leading-6 text-gray-900">
                            Recent activity
                        </h2>
                        <div className="mt-2 flex flex-col">
                            <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th
                                                className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                                scope="col"
                                            >
                                                Transaction
                                            </th>
                                            <th
                                                className="bg-gray-50 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                                                scope="col"
                                            >
                                                Amount
                                            </th>
                                            <th
                                                className="hidden bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell"
                                                scope="col"
                                            >
                                                Status
                                            </th>
                                            <th
                                                className="bg-gray-50 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                                                scope="col"
                                            >
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {transactions.map((transaction) => (
                                            <tr key={transaction.id} className="bg-white">
                                                <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                    <div className="flex">
                                                        <a
                                                            href={transaction.href}
                                                            className="group inline-flex space-x-2 truncate text-sm"
                                                        >
                                                            <BanknotesIcon
                                                                className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                            <p className="truncate text-gray-500 group-hover:text-gray-900">
                                                                {transaction.name}
                                                            </p>
                                                        </a>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                                    <span className="font-medium text-gray-900">
                                                        {transaction.amount}{" "}
                                                    </span>
                                                    {transaction.currency}
                                                </td>
                                                <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:table-cell">
                                                    <span
                                                        className={classNames(
                                                            statusStyles[transaction.status],
                                                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                                                        )}
                                                    >
                                                        {transaction.status}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                                    <time dateTime={transaction.datetime}>
                                                        {transaction.date}
                                                    </time>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
