import TopCards from "../Layout/TopCards";
import Graph from "../Layout/Graph";
import RecentPayments from "../Layout/RecentPayments";

const DashboardBilling = () => {

    return (
        <>
            <div className="flex flex-col items-start px-6 w-full max-md:px-5 max-md:max-w-full">
                <time className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                    3rd May, 2024
                </time>
                <h1 className="text-4xl font-semibold leading-[57.6px] text-neutral-600">
                    Dashboard
                </h1>
            </div>
            <div className="px-6 pt-6">
                <TopCards />
            </div>
            <div className="px-6 pt-6">
                <Graph />
            </div>
            <div className="px-6 pt-6">
                <RecentPayments />
            </div>
        </>
    );
};

export default DashboardBilling;
