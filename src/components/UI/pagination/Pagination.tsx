import React from 'react';
import { usePagination } from '../../../hooks/usePagination';

interface Props {
    totalPages: number,
    page: number,
}

const Pagination = ({totalPages, page}: Props) => {
    const pagesArray = usePagination(totalPages);
    return (
        <div className="page__wrapper">
            {pagesArray.map(p => (
            <span
                key={p} 
                className={page === p ? "page page__current" : "page"}>
                {p}
            </span>
            ))}
        </div>
    )
}

export default Pagination;