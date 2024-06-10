import { Fragment, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
    CursorArrowRaysIcon,
    EnvelopeOpenIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
    Bars3CenterLeftIcon,
    BellIcon,
    ClockIcon,
    CogIcon,
    CreditCardIcon,
    DocumentChartBarIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    ScaleIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    BanknotesIcon,
    BuildingOfficeIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";


const cards = [
    { name: "Account balance", href: "#", icon: ScaleIcon, amount: "$30,659.45" },
    // More items...
];
const ticket = [
    { name: "Total Transactions", href: "#", icon: ScaleIcon, amount: "4000" },
    // More items...
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
        id: 1,
        name: "Payment to Amos",
        href: "#",
        amount: "$30,000",
        currency: "USD",
        status: "success",
        date: "July 11, 2022",
        datetime: "2020-07-11",
    },
    {
        id: 1,
        name: "Payment to Daniel",
        href: "#",
        amount: "$4,000",
        currency: "USD",
        status: "success",
        date: "July 11, 2023",
        datetime: "2023-07-11",
    },
    // More transactions...
];
const statusStyles = {
    success: "bg-green-100 text-green-800",
    processing: "bg-yellow-100 text-yellow-800",
    failed: "bg-gray-100 text-gray-800",
};

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

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
        id: 3,
        name: "Avg. Click Rate",
        stat: "24.57%",
        icon: CursorArrowRaysIcon,
        change: "3.2%",
        changeType: "decrease",
    },
];

const Dashboard = () => {
    return (
        <>
            <div className="flex py-6 flex-col items-start px-6 max-md:px-5">
                <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                    3rd may, 2024
                </div>
                <div className="text-4xl font-semibold leading-[57.6px] text-neutral-600">
                    Dashboard
                </div>
            </div>

        </>
    );
}

export default Dashboard;
