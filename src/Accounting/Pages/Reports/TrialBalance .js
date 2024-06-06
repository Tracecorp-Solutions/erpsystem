import React from "react";

const TrialBalance = () => {
  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Trial Balance</h2>
      {/* Your trial balance content here */}
      <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Account</th>
            <th className="border border-gray-400 px-4 py-2">Debit</th>
            <th className="border border-gray-400 px-4 py-2">Credit</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample trial balance data */}
          <tr>
            <td className="border border-gray-400 px-4 py-2">Account 1</td>
            <td className="border border-gray-400 px-4 py-2">1000</td>
            <td className="border border-gray-400 px-4 py-2">500</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">Account 2</td>
            <td className="border border-gray-400 px-4 py-2">700</td>
            <td className="border border-gray-400 px-4 py-2">900</td>
          </tr>
          {/* More rows */}
        </tbody>
      </table>
    </div>
  );
};

export default TrialBalance;
