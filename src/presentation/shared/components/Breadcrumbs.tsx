import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const paths = location.pathname.split("/").filter(Boolean);
    return [
      { label: "Home", path: "/" },
      ...paths.map((path, index) => ({
        label: path.charAt(0).toUpperCase() + path.slice(1),
        path: "/" + paths.slice(0, index + 1).join("/"),
      })),
    ];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="flex items-center gap-3">
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const isActive = crumb.path === location.pathname;

        return (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-sm font-light text-stone-800">/</span>}
            <Link
              to={crumb.path}
              className={`text-sm uppercase ${
                isActive
                  ? "font-semibold text-stone-900 underline underline-offset-4"
                  : "text-stone-800 hover:text-stone-900 hover:underline hover:underline-offset-4"
              } ${isLast ? "pointer-events-none" : ""} `}
            >
              {crumb.label}
            </Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
