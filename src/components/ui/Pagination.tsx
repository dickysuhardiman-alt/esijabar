'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /**
   * Base path (e.g. "/berita") to render link-based pagination that
   * updates the `page` query param. Mutually exclusive with `onPageChange`.
   */
  basePath?: string;
  /**
   * Extra query params to preserve when navigating (e.g. `{ q, year }`).
   */
  query?: Record<string, string | undefined>;
  onPageChange?: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  basePath,
  query,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  const buildHref = (page: number): string => {
    const params = new URLSearchParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });
    }
    params.set('page', String(page));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath || '';
  };

  const getVisiblePages = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (showEllipsisStart) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (showEllipsisEnd) {
        pages.push('...');
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const isUrlMode = Boolean(basePath) && !onPageChange;

  const renderPage = (page: number, key: number) => {
    const className = cn(
      'w-10 h-10 rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center',
      currentPage === page
        ? 'bg-esi-red text-white'
        : 'bg-esi-off-white text-esi-charcoal hover:bg-esi-silver-light'
    );

    if (isUrlMode) {
      if (currentPage === page) {
        return (
          <span key={key} className={className} aria-current="page">
            {page}
          </span>
        );
      }
      return (
        <Link key={key} href={buildHref(page)} className={className} aria-current="page">
          {page}
        </Link>
      );
    }

    return (
      <button
        key={key}
        onClick={() => onPageChange?.(page)}
        className={className}
        aria-current={currentPage === page ? 'page' : undefined}
      >
        {page}
      </button>
    );
  };

  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  return (
    <nav
      className={cn('flex items-center justify-center gap-2', className)}
      aria-label="Pagination"
    >
      {isUrlMode ? (
        prevDisabled ? (
          <span className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-esi-silver-light border-2 border-esi-silver-light opacity-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </span>
        ) : (
          <Link
            href={buildHref(currentPage - 1)}
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-esi-charcoal border-2 border-esi-silver-light hover:bg-esi-navy hover:text-white hover:border-esi-navy transition-all"
            aria-label="Previous page"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        )
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={prevDisabled}
          aria-label="Previous page"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Prev
        </Button>
      )}

      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) =>
          page === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="w-10 h-10 flex items-center justify-center text-esi-silver-dark"
            >
              ...
            </span>
          ) : (
            renderPage(page, page)
          )
        )}
      </div>

      {isUrlMode ? (
        nextDisabled ? (
          <span className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-esi-silver-light border-2 border-esi-silver-light opacity-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        ) : (
          <Link
            href={buildHref(currentPage + 1)}
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-esi-charcoal border-2 border-esi-silver-light hover:bg-esi-navy hover:text-white hover:border-esi-navy transition-all"
            aria-label="Next page"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={nextDisabled}
          aria-label="Next page"
        >
          Next
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      )}
    </nav>
  );
};

export { Pagination };