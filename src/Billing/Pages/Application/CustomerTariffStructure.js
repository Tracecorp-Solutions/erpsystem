
import * as React from "react";
import { useState } from "react";

const TariffRow = ({
  tariff,
  usageCharges,
  serviceCharges,
  latePaymentFee,
  reconnectionFee,
  isHeader = false,
  isSubHeader = false,
  onClick,
}) => {
  const cellClasses = `
    justify-center
    items-start
    py-4
    pr-1
    pl-4
    ${isHeader ? "font-semibold text-neutral-600" : ""}
    ${isSubHeader ? "bg-stone-100" : "bg-white"}
    border-r
    border-b
    border-solid
    border-neutral-500
    border-opacity-30
    max-md:pr-5
  `;

  return (
    <tr
      onClick={onClick}
      className={onClick ? "cursor-pointer hover:bg-gray-100" : ""}
    >
      <td className={`${cellClasses} ${isHeader ? "" : "border-l"}`}>
        {tariff}
      </td>
      <td className={cellClasses}>{usageCharges}</td>
      <td className={cellClasses}>{serviceCharges}</td>
      <td className={cellClasses}>{latePaymentFee}</td>
      <td className={cellClasses}>{reconnectionFee}</td>
    </tr>
  );
};

const TariffSection = ({ title, tiers, onTierClick }) => (
  <>
    <TariffRow
      tariff={title}
      usageCharges=""
      serviceCharges=""
      latePaymentFee=""
      reconnectionFee=""
      isSubHeader
    />
    {tiers.map((tier, index) => (
      <TariffRow
        key={index}
        {...tier}
        onClick={() => onTierClick(title, tier)}
      />
    ))}
  </>
);

function CustomerTariffStructure() {
  const [selectedTier, setSelectedTier] = useState(null);

  const residentialTiers = [
    {
      tariff: "Tier 1: 0 - 10 m³",
      usageCharges: "SSP 50 per m³",
      serviceCharges: "SSP 1,000",
      latePaymentFee: "SSP 500",
      reconnectionFee: "SSP 1,500",
    },
    {
      tariff: "Tier 2: 11 - 30 m³",
      usageCharges: "SSP 45 per m³",
      serviceCharges: "SSP 1,000",
      latePaymentFee: "SSP 500",
      reconnectionFee: "SSP 1,500",
    },
    {
      tariff: "Tier 3: 31 - 50 m³",
      usageCharges: "SSP 40 per m³",
      serviceCharges: "SSP 1,000",
      latePaymentFee: "SSP 500",
      reconnectionFee: "SSP 1,500",
    },
    {
      tariff: "Tier 4: 51 m³ and above",
      usageCharges: "SSP 35 per m³",
      serviceCharges: "SSP 1,000",
      latePaymentFee: "SSP 500",
      reconnectionFee: "SSP 1,500",
    },
  ];

  const commercialTiers = [
    {
      tariff: "Tier 1: 0 - 50 m³",
      usageCharges: "SSP 60 per m³",
      serviceCharges: "SSP 2,500",
      latePaymentFee: "SSP 1,000",
      reconnectionFee: "SSP 2,500",
    },
    {
      tariff: "Tier 2: 51 - 100 m³",
      usageCharges: "SSP 55 per m³",
      serviceCharges: "SSP 2,500",
      latePaymentFee: "SSP 1,000",
      reconnectionFee: "SSP 2,500",
    },
    {
      tariff: "Tier 3: 101 - 200 m³",
      usageCharges: "SSP 50 per m³",
      serviceCharges: "SSP 2,500",
      latePaymentFee: "SSP 1,000",
      reconnectionFee: "SSP 2,500",
    },
    {
      tariff: "Tier 4: 201 m³ and above",
      usageCharges: "SSP 45 per m³",
      serviceCharges: "SSP 2,500",
      latePaymentFee: "SSP 1,000",
      reconnectionFee: "SSP 2,500",
    },
  ];

  const industrialTiers = [
    {
      tariff: "Tier 1: 0 - 100 m³",
      usageCharges: "SSP 70 per m³",
      serviceCharges: "SSP 5,000",
      latePaymentFee: "SSP 2,000",
      reconnectionFee: "SSP 5,000",
    },
    {
      tariff: "Tier 2: 101 - 500 m³",
      usageCharges: "SSP 65 per m³",
      serviceCharges: "SSP 5,000",
      latePaymentFee: "SSP 2,000",
      reconnectionFee: "SSP 5,000",
    },
  ];

  const handleTierClick = (category, tier) => {
    setSelectedTier({ category, ...tier });
  };

  return (
    <section className="flex flex-col flex-wrap justify-center content-start px-8 pt-6 rounded-3xl bg-stone-100 leading-[160%] max-md:px-5">
      <h1 className="text-4xl font-semibold text-neutral-600 max-md:max-w-full">
        Customer Tariff Structure
      </h1>
      <div className="flex flex-col px-6 pt-6 mt-6 text-base bg-white rounded-3xl text-neutral-400 max-md:px-5 max-md:max-w-full">
        <table className="w-full border-collapse">
          <thead>
            <TariffRow
              tariff="Tariff"
              usageCharges="Usage Charges"
              serviceCharges="Service Charges"
              latePaymentFee="Late Payment Fee"
              reconnectionFee="Reconnection Fee"
              isHeader
            />
          </thead>
          <tbody>
            <TariffSection
              title="Residential Customers"
              tiers={residentialTiers}
              onTierClick={handleTierClick}
            />
            <TariffSection
              title="Commercial Customers"
              tiers={commercialTiers}
              onTierClick={handleTierClick}
            />
            <TariffSection
              title="Industrial Customers"
              tiers={industrialTiers}
              onTierClick={handleTierClick}
            />
          </tbody>
        </table>
      </div>
      {selectedTier && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            Selected Tier: {selectedTier.category} - {selectedTier.tariff}
          </h2>
          <p>Usage Charges: {selectedTier.usageCharges}</p>
          <p>Service Charges: {selectedTier.serviceCharges}</p>
          <p>Late Payment Fee: {selectedTier.latePaymentFee}</p>
          <p>Reconnection Fee: {selectedTier.reconnectionFee}</p>
        </div>
      )}
    </section>
  );
}

export default CustomerTariffStructure;
