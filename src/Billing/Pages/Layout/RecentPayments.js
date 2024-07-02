import * as React from "react";

const PaymentRow = ({ customerRef, customerName, amount, paymentDate, transRef, vendorID, status }) => (
  <tr className="text-neutral-600 text-base leading-6">
    <td className="px-6 py-3 whitespace-nowrap">
      <div className="flex gap-4">
        <div className="shrink-0 my-auto w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
        {customerRef}
      </div>
    </td>
    <td className="px-6 py-3 whitespace-nowrap">{customerName}</td>
    <td className="px-6 py-3 whitespace-nowrap">{amount}</td>
    <td className="px-6 py-3 whitespace-nowrap">{paymentDate}</td>
    <td className="px-6 py-3 whitespace-nowrap">{transRef}</td>
    <td className="px-6 py-3 whitespace-nowrap">{vendorID}</td>
    <td className="px-6 py-3 whitespace-nowrap">
      <div className="flex justify-center">
        <span className="px-3 py-1 rounded-xl bg-stone-100 text-xs font-medium tracking-wide uppercase">
          {status}
        </span>
      </div>
    </td>
  </tr>
);

function RecentPayments() {
  const payments = [
    { customerRef: "219754905", customerName: "Grace Eze", amount: "20,000", paymentDate: "5th May, 2024", transRef: "478530", vendorID: "First Bank", status: "completed" },
    { customerRef: "219754905", customerName: "Grace Eze", amount: "20,000", paymentDate: "5th May, 2024", transRef: "478530", vendorID: "First Bank", status: "completed" },
    { customerRef: "219754905", customerName: "Grace Eze", amount: "20,000", paymentDate: "5th May, 2024", transRef: "478530", vendorID: "First Bank", status: "completed" },
    { customerRef: "219754905", customerName: "Grace Eze", amount: "20,000", paymentDate: "5th May, 2024", transRef: "478530", vendorID: "First Bank", status: "completed" },
    { customerRef: "219754905", customerName: "Grace Eze", amount: "20,000", paymentDate: "5th May, 2024", transRef: "478530", vendorID: "First Bank", status: "completed" }
  ];

  return (
    <section className="flex flex-col px-6 py-4 bg-white rounded-3xl max-md:px-5">
      <header className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
        <h2 className="text-2xl font-semibold leading-10 text-slate-500">
          Recent Payments
        </h2>
        <div className="flex gap-2 self-start px-4 py-2 text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-600">
          <div className="my-auto">last 5</div>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e230b7ea2d550bf640ca159225698ee7a5b604118e1c573aef0dfaf7895e4553?apiKey=a1e51d57a9bf4fb0a44541a454bc05bc&" className="shrink-0 w-5 aspect-square" alt="" />
        </div>
      </header>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="text-xs font-medium tracking-wide uppercase text-neutral-400 bg-stone-100">
              <th className="px-6 py-3 text-left">Customer Ref</th>
              <th className="px-6 py-3 text-left">Customer Name</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Payment Date</th>
              <th className="px-6 py-3 text-left">Trans Ref</th>
              <th className="px-6 py-3 text-left">Vendor ID</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <PaymentRow key={index} {...payment} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecentPayments;
