import * as React from "react";

const MonthBar = ({ month, collectedHeight, billedHeight }) => (
  <div className="flex flex-col items-center justify-end">
    <div className="flex gap-1 items-end">
      <div style={{ height: `${billedHeight}px` }} className="rounded-xl bg-dark-blue w-[60px]" />
      <div style={{ height: `${collectedHeight}px` }} className="bg-dirt-green rounded-xl w-[60px]" />
    </div>
    <div className="mt-1 text-xs text-center text-zinc-800">{month}</div>
  </div>
);

const Legend = ({ color, text }) => (
  <div className="flex gap-3.5 items-center">
    <span className={`shrink-0 w-4 h-4 rounded-full bg-${color}`} role="img" aria-label={`${text} indicator`} />
    <span>{text}</span>
  </div>
);

function Graph() {
  const monthData = [
    { month: "Jan 2024", collected: 119, billed: 170 },
    { month: "Feb 2024", collected: 82, billed: 220 },
    { month: "Mar 2024", collected: 157, billed: 196 },
    { month: "Apr 2024", collected: 220, billed: 119 },
    { month: "May 2024", collected: 154, billed: 220 },
    { month: "Jun 2024", collected: 51, billed: 76 }
  ];

  return (
    <section className="flex flex-col px-8 py-9 bg-white rounded-3xl max-md:px-5">
      <div className="flex gap-5 justify-between max-md:flex-wrap">
        <aside className="flex flex-col text-xs text-right whitespace-nowrap text-zinc-800 max-md:hidden">
          <div>100</div>
          <div className="mt-16 max-md:mt-10">75</div>
          <div className="mt-16 max-md:mt-10">50</div>
          <div className="mt-16 max-md:mt-10">25</div>
          <div className="mt-16 max-md:mt-10">0</div>
        </aside>
        <div className="flex gap-5 items-end justify-between self-end mt-24 max-md:flex-wrap max-md:mt-10">
          {monthData.map((data, index) => (
            <MonthBar
              key={index}
              month={data.month}
              collectedHeight={data.collected}
              billedHeight={data.billed}
            />
          ))}
        </div>
      </div>
      <footer className="flex gap-5 justify-center self-start mt-6 text-sm capitalize text-neutral-400 max-md:flex-wrap">
        <Legend color="dirt-green" text="Total Collected Amount" />
        <Legend color="dark-blue" text="Total Billed Amount" />
      </footer>
    </section>
  );
}

export default Graph;
