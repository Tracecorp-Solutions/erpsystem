import React from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

function MobileNav({ links }) {
  return (
    <div className="fixed top-0 left-0 z-50 p-4 bg-white">
      <Menu size={36} />
      <div className="mt-4">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className="block py-2 px-4 text-gray-700 hover:bg-gray-100 transition duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MobileNav;
