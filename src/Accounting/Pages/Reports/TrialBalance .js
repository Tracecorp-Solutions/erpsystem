import React from 'react';
import TableHeader from "../../components/trialbalance/TableHeader";
import TableRow from "../../components/trialbalance/TableRow";
import Pagination from "../../components/trialbalance/TableRow";

import FilterExportButtons from "../../components/trialbalance/FilterExportButtons";

const TransactionTable = () => {
  const transactions = [
    {
      account: 'Petty Cash',
      description: 'Pay Smart TV Screen for developer presentations',
      credit: '$1,120',
      debit: '$1,120'
    },
    {
      account: 'Petty Cash',
      description: 'Pay Smart TV Screen for developer presentations',
      credit: '$1,120',
      debit: '$1,120'
    },
    {
      account: 'Petty Cash',
      description: 'Pay Smart TV Screen for developer presentations',
      credit: '$1,120',
      debit: '$1,120'
    },
    {
      account: 'Petty Cash',
      description: 'Pay Smart TV Screen for developer presentations',
      credit: '$1,120',
      debit: '$1,120'
    },
    {
      account: 'Petty Cash',
      description: 'Pay Smart TV Screen for developer presentations',
      credit: '$1,120',
      debit: '$1,120'
    },
    {
      account: 'Petty Cash',
      description: 'Pay Smart TV Screen for developer presentations',
      credit: '$1,120',
      debit: '$1,120'
    },
    {
      account: 'Petty Cash',
      description: 'Pay Smart TV Screen for developer presentations',
      credit: '$1,120',
      debit: '$1,120'
    },
    {
      account: 'Petty Cash',
      description: 'Pay Smart TV Screen for developer presentations',
      credit: '$1,120',
      debit: '$1,120'
    },
  ];

  return (
    <section className="flex flex-col p-6 bg-white rounded-3xl max-md:px-5">
      <FilterExportButtons />
      <TableHeader />
      {transactions.map((transaction, index) => (
        <React.Fragment key={index}>
          <TableRow {...transaction} />
          {index < transactions.length - 1 && (
            <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
          )}
        </React.Fragment>
      ))}
      <Pagination />
    </section>
  );
};

export default TransactionTable;