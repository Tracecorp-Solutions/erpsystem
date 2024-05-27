import React, { useState } from 'react';

const TrialBalance = () => {
  const dummyAccounts = [
    { id: 1, name: 'Cash', debit: 1000, credit: 1000 },
    { id: 2, name: 'Accounts Receivable', debit: 500, credit: 500 },
    { id: 3, name: 'Inventory', debit: 750, credit: 750 },
    { id: 4, name: 'Accounts Payable', debit: 700, credit: 700 },
    { id: 5, name: 'Equity', debit: 750, credit: 750 }
  ];

  const totalDebit = dummyAccounts.reduce((acc, curr) => acc + curr.debit, 0);
  const totalCredit = dummyAccounts.reduce((acc, curr) => acc + curr.credit, 0);
  const isBalanced = totalDebit === totalCredit;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trial Balance Of TraceCorp</h1>
      <table className="w-full bg-white shadow-lg rounded-lg divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dummyAccounts.map(account => (
            <tr key={account.id}>
              <td className="px-6 py-4 whitespace-nowrap">{account.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{account.debit}</td>
              <td className="px-6 py-4 whitespace-nowrap">{account.credit}</td>
            </tr>
          ))}
          <tr>
            <td  className="px-6 py-4 whitespace-nowrap">Total</td>
            <td  className="px-6 py-4 whitespace-nowrap">{totalDebit}</td>
            <td  className="px-6 py-4 whitespace-nowrap">{totalCredit}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TrialBalance;
