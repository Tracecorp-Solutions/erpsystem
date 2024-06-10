import { Fragment, useState } from "react";
import SideNav from "../../shared/navigations/SideNav";
import TopNav from "../../shared/navigations/TopNav";

const Dashboard = () => {
    return (
        <>
         <SideNav />
          
            <div className="flex py-6 flex-col items-start px-6 max-md:px-5">
                <TopNav />
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
