import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const systems = [
  {
    title: "Accounting System",
    description: "Streamline financial operations with integrated accounting features.",
    isActive: false
  },
  {
    title: "Water Billing System",
    description: "Manage customer connections, billing, and payments efficiently.",
    isActive: false
  },
  {
    title: "Customer Relationship System (CRM)",
    description: "Enhance customer engagement and satisfaction.",
    isActive: true
  },
  {
    title: "Human Resources System",
    description: "Optimize HR processes from recruitment to retirement.",
    isActive: true
  },
  {
    title: "Inventory Management System",
    description: "Keep track of stock levels and manage inventory accurately.",
    isActive: true
  },
  {
    title: "Sales System",
    description: "Boost sales productivity and manage sales processes effectively.",
    isActive: true
  },
  {
    title: " Payment System",
    description: "Settle financial transactions through the transfer of monetary value.",
    isActive: true
  },
  {
    title: "Geographical Interface System (GIS)",
    description: "Store, analayze, edit, and visualize geographic data.",
    isActive: true
  },
];

const SystemCard = ({ title, description, isActive, onClick }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (title) => {
    setButtonClicked(true);
    try {
      if (title === "Water Billing System") {
        navigate("/billingdashboard");
      } else {
        navigate("/Dashboardlayout");
      }
    } catch (error) {
      console.error("Error loading system:", error);
      setButtonClicked(false);
    }
  };
  return (
    <div className="flex flex-col grow p-8 w-full bg-white rounded-3xl max-md:px-5 max-md:mt-5 relative">
      {isActive && (
        <div className="justify-center self-end px-4 py-[5px] whitespace-nowrap bg-active-green txt-color-blue text-sm absolute top-0 right-0 rounded-bl-[16px] rounded-tr-[24px]">
          Activate
        </div>
      )}
      <h2 className="text-2xl capitalize text-neutral-600 mt-4">{title}</h2>
      <p className="mt-4 mb-5 text-sm text-neutral-400">{description}</p>
      <button
        className={`justify-center px-8 py-3 mt-auto text-base leading-6 text-white rounded-3xl ${
          buttonClicked ? "bg-blue-400 text-white" : title === "Accounting System" || title === "Water Billing System" ? "bg-dark-blue text-white" : "bg-gray-200 text-white"
        } max-md:px-5 max-md:mb-10`}
        disabled={isActive || buttonClicked}
        aria-label={`${title} - ${isActive ? "Contact Us" : "Load System"}`}
        onClick={() => handleClick(title)}
      >
        {buttonClicked ? "Contact us" : "Load System"}
      </button>
    </div>
  );
};

const Landing = () => {
  return (
    <main className="flex flex-col justify-center items-center bg-stone-100">
      <header className="flex justify-center items-center self-stretch px-16 w-full text-base leading-6 bg-white text-neutral-600 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-2.5 justify-between py-2 w-full max-w-[1200px] max-md:flex-wrap max-md:max-w-full">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/408fafcebc6b68b9bb22a4c9f099c724596e89747ebf76a6651a94c7f3a08b5e?apiKey=a1e51d57a9bf4fb0a44541a454bc05bc&" className="shrink-0 aspect-[1.25] w-[87px]" alt="Company logo" />
          <div className="justify-center px-4 py-2 my-auto rounded-3xl bg-stone-100">
          Welcome, {sessionStorage.getItem("fullname")}
          </div>
        </div>
      </header>
      <section className="px-5 mt-8 text-left w-full max-w-[1200px] max-md:max-w-full">
        <h1 className="mt-8 text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
          Welcome to the TRACE ERP
        </h1>
      </section>
      <section className="px-5 mt-8 w-full max-w-[1200px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          {systems.slice(0, 4).map((system, index) => (
            <div key={index} className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
              <SystemCard
                title={system.title}
                description={system.description}
                isActive={system.isActive}
                onClick={() => console.log(`Loading ${system.title}`)}
              />
            </div>
          ))}
        </div>
      </section>
      <section className="px-5 mt-6 w-full max-w-[1200px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          {systems.slice(4).map((system, index) => (
            <div key={index} className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
              <SystemCard
                title={system.title}
                description={system.description}
                isActive={system.isActive}
                onClick={() => console.log(`Loading ${system.title}`)}
              />
            </div>
          ))}
        </div>
      </section>
      <footer className="flex justify-center items-center self-stretch px-16 mt-12 w-full text-base leading-6 border-t bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-2.5 justify-between py-6 w-full max-w-[1200px] max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-5 justify-between">
            <div className="text-neutral-600">@2024 ERP System</div>
            <div className="text-neutral-400">All rights reserved</div>
          </div>
          <nav className="flex gap-5 justify-between text-neutral-400">
            <a href="#support">Support</a>
            <a href="#documentation">Documentation</a>
            <a href="#contact">Contact us</a>
          </nav>
        </div>
      </footer>
    </main>
  );
};

export default Landing;
