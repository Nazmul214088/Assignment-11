import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const Pagination = ({ totalPage, cols, page, setPage }) => {
  console.log(totalPage, cols);

  return (
    <div className="flex flex-wrap justify-between border-t border-black/10 mt-8 pt-5.5">
      <button
        disabled={page === 1}
        onClick={() => setPage(page)}
        className={`
          flex gap-1 items-center py-2 px-4 border border-black/10 rounded-lg ${page === 1 ? "text-black/20" : ""}`}
      >
        <FaArrowLeft />
        <span>Previous</span>
      </button>
      <div className="flex gap-1 ">
        {(() => {
          const total = totalPage;
          const visiblePages = new Set();
          // Always show first and last page
          visiblePages.add(1);
          visiblePages.add(total);
          // Show window around current page
          for (let i = page - 1; i <= page + 1; i++) {
            if (i >= 1 && i <= total) visiblePages.add(i);
          }

          const pages = Array.from(visiblePages).sort((a, b) => a - b);

          return pages.map((pageNum, i) => {
            const prev = pages[i - 1];
            const showEllipsis = prev && pageNum - prev > 1;

            return (
              <div key={pageNum}>
                {showEllipsis && <span>...</span>}
                <button
                  className={` py-2 px-4 rounded-md text-black/50
                    ${page === pageNum ? "bg-black/10 text-black" : ""},
                  `}
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum.toString()}
                </button>
              </div>
            );
          });
        })()}
      </div>
      <button
        disabled={page === totalPage}
        onClick={() => setPage(page + 1)}
        className={`
          py-2 px-4 border flex items-center gap-1 border-black/10 rounded-lg ${page === totalPage ? "text-black/20" : ""}`}
      >
        <span>Next</span> <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
