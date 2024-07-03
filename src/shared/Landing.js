import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, description, isLoading, isComingSoon }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
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
    <article className="relative flex flex-col grow p-8 pb-8 w-full font-semibold bg-white rounded-3xl max-md:px-5 max-md:mt-5">
      {isComingSoon && (
        <div className="absolute top-0 right-0 px-4 py-2 bg-lime-200 text-slate-500 mb-5 rounded-md">Coming soon</div>
      )}
      <h3 className="text-2xl capitalize text-neutral-600 mt-6">{title}</h3>
      <p className="mt-4 text-sm text-neutral-400">{description}</p>
      <button
        className={`justify-center px-8 py-3 mb-6 mt-16 text-base leading-6 rounded-3xl ${
          buttonClicked ? "bg-blue-500 text-white" : "bg-gray-400 text-white"
        } max-md:px-5 max-md:mb-10`}
        disabled={isLoading || isComingSoon || buttonClicked}
        aria-label={`${title} - ${isComingSoon ? "Coming soon" : "Load System"}`}
        onClick={handleClick}
      >
        {buttonClicked ? "Loading..." : "Load System"}
      </button>
    </article>
  );
};

const Landing = () => {
  const systems = [
    {
      title: "Accounting System",
      description: "Streamline financial operations with integrated accounting features.",
      isLoading: false,
      isComingSoon: false,
    },
    {
      title: "Water Billing System",
      description: "Manage customer connections, billing, and payments efficiently.",
      isLoading: false,
      isComingSoon: false,
    },
    {
      title: "Customer Relationship System (CRM)",
      description: "Enhance customer engagement and satisfaction.",
      isLoading: false,
      isComingSoon: true,
    },
    {
      title: "Human Resources System",
      description: "Optimize HR processes from recruitment to retirement.",
      isLoading: false,
      isComingSoon: true,
    },
    {
      title: "Inventory Management System",
      description: "Keep track of stock levels and manage inventory accurately.",
      isLoading: false,
      isComingSoon: true,
    },
    {
      title: "Sales System",
      description: "Boost sales productivity and manage sales processes effectively.",
      isLoading: false,
      isComingSoon: true,
    },
  ];

  return (
    <div className="flex flex-col justify-center bg-stone-100">
      <header className="flex justify-center items-center px-16 w-full text-base leading-6 bg-white text-neutral-600 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-2.5 justify-between py-4 w-full max-w-[1200px] max-md:flex-wrap max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/408fafcebc6b68b9bb22a4c9f099c724596e89747ebf76a6651a94c7f3a08b5e?apiKey=27ec22b9382040ef8580a5e340d3a921&"
            alt=""
            className="shrink-0 aspect-[1.25] w-[87px]"
          />
          <div className="justify-center px-4 py-2 my-auto rounded-3xl bg-stone-100">
            Welcome, {sessionStorage.getItem("fullname")}
          </div>
        </div>
      </header>
      <main>
        <section className="self-center ml-10 mt-8 text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
          Welcome to the TRACE ERP
        </section>
        <section className="self-center px-5 mt-8 w-full max-md:max-w-full">
          <div className="grid grid-cols-3 gap-5 max-md:flex max-md:flex-col max-md:gap-0">
            {systems.slice(0, 3).map((system, index) => (
              <Card
                key={index}
                title={system.title}
                description={system.description}
                isLoading={system.isLoading}
                isComingSoon={system.isComingSoon}
              />
            ))}
          </div>
        </section>
        <section className="self-center px-5 mt-8 w-full max-md:max-w-full">
          <div className="grid grid-cols-3 gap-5 max-md:flex max-md:flex-col max-md:gap-0">
            {systems.slice(3).map((system, index) => (
              <Card
                key={index}
                title={system.title}
                description={system.description}
                isLoading={system.isLoading}
                isComingSoon={system.isComingSoon}
              />
            ))}
          </div>
        </section>
      </main>
      <footer className="flex justify-center items-center px-16 mt-12 w-full text-base leading-6 bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-2.5 justify-between py-6 w-full max-w-[1200px] max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-5 justify-between">
            <div className="text-neutral-600">@2024 TRACE ERP System</div>
            <div className="text-neutral-400">All rights reserved</div>
          </div>
          <nav className="flex gap-5 justify-between text-neutral-400">
            <a href="#">Support</a>
            <a href="#">Documentation</a>
            <a href="#">Contact us</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
