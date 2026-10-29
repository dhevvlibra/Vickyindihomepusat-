import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from '../router/Router';

interface BreadcrumbsProps {
  items: Array<{
    label: string;
    to?: string;
  }>;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-2.5 mb-6 text-xs text-slate-500">
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-slate-600 hover:text-red-600 transition-colors font-medium"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Beranda</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {isLast || !item.to ? (
                <span className="font-bold text-slate-900 max-w-[200px] sm:max-w-xs truncate" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="text-slate-600 hover:text-red-600 transition-colors font-medium truncate max-w-[160px]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
