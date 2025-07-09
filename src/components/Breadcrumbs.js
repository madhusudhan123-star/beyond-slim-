import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createBreadcrumbs } from '../utils/urlSlugs';

const Breadcrumbs = () => {
  const location = useLocation();
  const breadcrumbs = createBreadcrumbs(location.pathname);

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumbs for home page
  }

  return (
    <nav className="bg-gray-50 py-3 px-4">
      <div className="container mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="text-gray-400 mx-2">/</span>
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-600 font-medium">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  to={breadcrumb.url}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
