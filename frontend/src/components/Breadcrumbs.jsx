import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const parts = location.pathname.split("/").filter(Boolean);

  return (
    <div className="text-xs text-gray-400 mb-2">
      <span
        className="cursor-pointer hover:underline hover:text-white transition-colors"
        onClick={() => navigate("/")}
      >
        home
      </span>
      {parts.length > 0 &&
        parts.map((part, i) => (
          <span key={i}>
            {" / "}
            {part}
          </span>
        ))}
    </div>
  );
};

export default Breadcrumbs;
