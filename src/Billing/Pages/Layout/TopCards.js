import * as React from "react";

const StatCard = ({ title, value, change, icon, bgColor, textColor, changeColor }) => (
  <div className={`flex flex-col grow justify-center py-6 w-full rounded-xl ${bgColor} max-md:mt-5`}>
    <div className="flex flex-col px-4">
      <div className={`flex gap-4 justify-between text-base font-medium ${textColor} capitalize`}>
        <div className="my-auto">{title}</div>
        <img loading="lazy" src={icon} alt="" className="shrink-0 w-6 aspect-square" />
      </div>
      <div className="flex gap-4 justify-between mt-4">
        <div className={`self-start mt-3 text-2xl font-bold ${textColor} capitalize`}>
          {value}
        </div>
        <div className="flex flex-col justify-center">
          <div className={`flex gap-1 self-end text-base ${changeColor} capitalize whitespace-nowrap`}>
            <img loading="lazy" src={change.icon} alt="" className="shrink-0 w-6 aspect-square" />
            <div>{change.text}</div>
          </div>
          <div className={`text-sm ${textColor === 'text-white' ? 'text-white' : 'text-neutral-400'}`}>
            {change.subtext}
          </div>
        </div>
      </div>
    </div>
  </div>
);

function TopCards() {
  const cardData = [
    {
      title: "New Applications",
      value: "45",
      change: { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/091860ec44b73a54c7470e24e512cc236cabf31f078be0317bd5a1465c08b71d?apiKey=a1e51d57a9bf4fb0a44541a454bc05bc&", text: "10%", subtext: "From last month" },
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e62a2f0dfe32fef272f88a4628802b0ead234b8276035d9390952bebe29b3f20?apiKey=a1e51d57a9bf4fb0a44541a454bc05bc&",
      bgColor: "bg-dark-blue",
      textColor: "text-white",
      changeColor: "text-lime-400"
    },
    {
      title: "Pending Surveys",
      value: "20",
      change: { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/be46e1a7ed4966df013c3ba35441c4141cd4ad44172d15fe22d8dbcaee3524fa?apiKey=a1e51d57a9bf4fb0a44541a454bc05bc&", text: "5 days", subtext: "Avg. pending" },
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8250156c18eb8cc82ec07eb5b03e3e8142c2539e1b499528a7382360588ebbc5?apiKey=a1e51d57a9bf4fb0a44541a454bc05bc&",
      bgColor: "bg-white",
      textColor: "txt-color-blue",
      changeColor: "text-orange-400"
    },
    {
      title: "Approved Applications",
      value: "30",
      change: { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/091860ec44b73a54c7470e24e512cc236cabf31f078be0317bd5a1465c08b71d?apiKey=a1e51d57a9bf4fb0a44541a454bc05bc&", text: "15", subtext: "From last month" },
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8250156c18eb8cc82ec07eb5b03e3e8142c2539e1b499528a7382360588ebbc5?apiKey=a1e51d57a9bf4fb0a44541a454bc05bc&",
      bgColor: "bg-white",
      textColor: "txt-color-blue",
      changeColor: "text-lime-400"
    },
    {
      title: "Pending Connections",
      value: "15",
      change: { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/be46e1a7ed4966df013c3ba35441c4141cd4ad44172d15fe22d8dbcaee3524fa?apiKey=a1e51d57a9bf4fb0a44541a454bc05bc&", text: "7 days", subtext: "Avg. pending" },
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8250156c18eb8cc82ec07eb5b03e3e8142c2539e1b499528a7382360588ebbc5?apiKey=a1e51d57a9bf4fb0a44541a454bc05bc&",
      bgColor: "bg-white",
      textColor: "txt-color-blue",
      changeColor: "text-orange-400"
    }
  ];

  return (
    <main>
      <section className="flex gap-5 max-md:flex-col max-md:gap-0">
        {cardData.map((card, index) => (
          <div key={index} className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
            <StatCard {...card} />
          </div>
        ))}
      </section>
    </main>
  );
}

export default TopCards;