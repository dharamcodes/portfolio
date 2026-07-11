import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={styles.fancyPagination} role="navigation" aria-label="Pagination Navigation">
      <button
        className={`${styles.paginationArrow} prev`}
        onClick={(e) => {
          e.stopPropagation();
          onPageChange(Math.max(1, currentPage - 1));
        }}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>

      <div className={styles.paginationDots}>
        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={pageNum}
              className={`${styles.paginationDotBtn} ${currentPage === pageNum ? styles.active : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                onPageChange(pageNum);
              }}
              aria-label={`Page ${pageNum}`}
              aria-current={currentPage === pageNum ? "page" : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        className={`${styles.paginationArrow} next`}
        onClick={(e) => {
          e.stopPropagation();
          onPageChange(Math.min(totalPages, currentPage + 1));
        }}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </div>
  );
}
