import { Plus, BellDot, ChevronDown, Menu } from 'lucide-react';
import { useState } from "react";

function TopNav() {
  const [isNavVisible, setNavVisible] = useState(true);

  const toggleNav = () => {
    setNavVisible(isNavVisible);
  };

  return (
    <div className="flex flex-col items-end py-3 px-8 justify-center bg-white">
      <div className="flex gap-4">
        <button className="bg-stone-100 py-3 px-3 rounded-full text-neutral-600 xl:hidden" onClick={toggleNav}>
          <Menu />
        </button>
        <button className="flex text-white bg-dirt-green py-3 pr-8 pl-5 gap-2 font-semibold rounded-full">
          <Plus className="shrink-0 self-start aspect-square" />
          <span>New Entry</span>
        </button>
        <button className="bg-stone-100 py-3 px-3 rounded-full text-neutral-600">
            <BellDot />
        </button>
        <button className="flex gap-2 items-center bg-stone-100 px-2 rounded-full text-neutral-600">
          <div className="flex gap-2">
            <img
              loading="lazy"
              src="../../img/profile-pic.svg"
              className="shrink-0 w-10 aspect-square"
            />
<div className="my-auto">Nakitto Catherine</div>
          </div>
          <ChevronDown />
        </button>
      </div>
    </div>
  );
}

export default TopNav;