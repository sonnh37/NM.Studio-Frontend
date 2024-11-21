import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams as any);
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="w-full border-t border-gray-200 font-mono mt-16">
            <nav className="pagination flex flex-wrap justify-center text-gray-700 -mt-px">
                {/* First Page */}
                {currentPage > 1 && (
                    <a
                        className="p-2 mx-1 border-t border-transparent hover:border-gray-700"
                        href="#"
                        onClick={() => handlePageChange(1)}
                    >
                        &#8701; {/* Biểu tượng cho First Page */}
                    </a>
                )}

                {/* Previous Page */}
                {currentPage > 1 && (
                    <a
                        className="p-2 mx-1 border-t border-transparent hover:border-gray-700"
                        href="#"
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        ← {/* Biểu tượng cho Previous Page */}
                    </a>
                )}

                {/* Previous Page Numbers */}
                {currentPage > 1 && (
                    <a
                        className="p-2 mx-1 border-t border-transparent hover:border-gray-700"
                        href="#"
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        {currentPage - 1}
                    </a>
                )}

                {/* Current Page */}
                <span className="p-2 mx-1 current text-gray-800 border-t border-black">
      {currentPage}
    </span>


                {/* Next Page Numbers */}
                {currentPage < totalPages - 1 && (
                    <a
                        className="p-2 mx-1 border-t border-transparent hover:border-gray-700"
                        href="#"
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        {currentPage + 1}
                    </a>
                )}

                {/* Ellipsis */}
                {currentPage < totalPages - 2 && (
                    <span className="p-2 mx-1">...</span>
                )}

                {/* Last Page */}
                {currentPage < totalPages && (
                    <a
                        className="p-2 mx-1 border-t border-transparent hover:border-gray-700"
                        href="#"
                        onClick={() => handlePageChange(totalPages)}
                    >
                        {totalPages}
                    </a>
                )}

                {/* Next Page */}
                {currentPage < totalPages && (
                    <a
                        className="p-2 mx-1 border-t border-transparent hover:border-gray-700"
                        href="#"
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        → {/* Biểu tượng cho Next Page */}
                    </a>
                )}

                {/* Last Page */}
                {currentPage < totalPages && (
                    <a
                        className="p-2 mx-1 border-t border-transparent hover:border-gray-700"
                        href="#"
                        onClick={() => handlePageChange(totalPages)}
                    >
                        &#8702; {/* Biểu tượng cho Last Page */}
                    </a>
                )}
            </nav>
        </div>
    );
}
