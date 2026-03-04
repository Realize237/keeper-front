import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';

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
  const { t } = useTranslation();
  const VISIBLE_PAGES = 5;
  const half = Math.floor(VISIBLE_PAGES / 2);

  let start = Math.max(1, current - half);
  const end = Math.min(total, start + VISIBLE_PAGES - 1);

  if (end - start + 1 < VISIBLE_PAGES) {
    start = Math.max(1, end - VISIBLE_PAGES + 1);
  }

  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="flex items-center justify-around gap-4 flex-wrap w-full py-4">
      <div className="text-sm text-muted-foreground">
        {t('common.pagination.showing', {
          from: (current - 1) * itemsPerPage + 1,
          to: Math.min(
            current * itemsPerPage,
            totalItems ?? total * itemsPerPage
          ),
          total: totalItems ?? total * itemsPerPage,
        })}
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(1)}
          disabled={current === 1}
          className="p-2 bg-surface/40 border cursor-pointer border-border rounded-md hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed! transition"
        >
          <FiChevronsLeft className="w-4 h-4 text-muted-foreground" />
        </button>

        <button
          onClick={() => onChange(Math.max(1, current - 1))}
          disabled={current === 1}
          className="p-2 bg-surface/40 border cursor-pointer border-border rounded-md hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed! transition"
        >
          <FiChevronLeft className="w-4 h-4 text-muted-foreground" />
        </button>

        {start > 1 && <span className="px-2 text-muted-foreground">…</span>}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`px-3 py-1 text-sm cursor-pointer rounded-md transition ${
              p === current
                ? 'bg-primary text-primary-foreground border border-primary'
                : 'bg-surface/40 border border-border text-muted-foreground hover:bg-muted/50'
            }`}
          >
            {p}
          </button>
        ))}
        {end < total && <span className="px-2 text-muted-foreground">…</span>}

        <button
          onClick={() => onChange(Math.min(total, current + 1))}
          disabled={current === total}
          className="p-2 bg-surface/40 border cursor-pointer border-border rounded-md hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed! transition"
        >
          <FiChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>

        <button
          onClick={() => onChange(total)}
          disabled={current === total}
          className="p-2 bg-surface/40 cursor-pointer border border-border rounded-md hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed! transition"
        >
          <FiChevronsRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
