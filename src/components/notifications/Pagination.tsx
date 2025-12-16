// components/notifications/Pagination.tsx
import React from 'react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import { env } from '../../utils/env';

type Props = {
  current: number;
  total: number;
  onChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
};

const Pagination: React.FC<Props> = ({
  current,
  total,
  onChange,
  itemsPerPage = 10,
  totalItems,
}) => {
  const visiblePages = parseInt(env.VISIBLE_PAGE_COUNT);
  const half = Math.floor(visiblePages / 2);

  let start = Math.max(1, current - half);
  const end = Math.min(total, start + visiblePages - 1);

  if (end - start + 1 < visiblePages) {
    start = Math.max(1, end - visiblePages + 1);
  }

  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="flex items-center justify-around gap-4 flex-wrap w-full py-4">
      {/* Summary */}
      <div className="text-sm text-neutral-400">
        Showing {(current - 1) * itemsPerPage + 1} -{' '}
        {Math.min(current * itemsPerPage, totalItems ?? total * itemsPerPage)}{' '}
        of {totalItems ?? total * itemsPerPage}
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-1">
        {/* FIRST */}
        <button
          onClick={() => onChange(1)}
          disabled={current === 1}
          className="p-2 bg-neutral-900/40 border cursor-pointer border-neutral-800 rounded-md hover:bg-neutral-800/50 disabled:opacity-40 transition"
        >
          <FiChevronsLeft className="w-4 h-4 text-neutral-300" />
        </button>

        {/* PREV */}
        <button
          onClick={() => onChange(Math.max(1, current - 1))}
          disabled={current === 1}
          className="p-2 bg-neutral-900/40 border cursor-pointer border-neutral-800 rounded-md hover:bg-neutral-800/50 disabled:opacity-40 transition"
        >
          <FiChevronLeft className="w-4 h-4 text-neutral-300" />
        </button>

        {/* Page Numbers */}
        {start > 1 && <span className="px-2 text-neutral-500">…</span>}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`px-3 py-1 text-sm cursor-pointer rounded-md transition ${
              p === current
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-900/40 border border-neutral-800 text-neutral-300 hover:bg-neutral-800/50'
            }`}
          >
            {p}
          </button>
        ))}
        {end < total && <span className="px-2 text-neutral-500">…</span>}

        {/* NEXT */}
        <button
          onClick={() => onChange(Math.min(total, current + 1))}
          disabled={current === total}
          className="p-2 bg-neutral-900/40 border cursor-pointer border-neutral-800 rounded-md hover:bg-neutral-800/50 disabled:opacity-40 transition"
        >
          <FiChevronRight className="w-4 h-4 text-neutral-300" />
        </button>

        {/* LAST */}
        <button
          onClick={() => onChange(total)}
          disabled={current === total}
          className="p-2 bg-neutral-900/40 cursor-pointer border border-neutral-800 rounded-md hover:bg-neutral-800/50 disabled:opacity-40 transition"
        >
          <FiChevronsRight className="w-4 h-4 text-neutral-300" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
