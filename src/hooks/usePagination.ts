import React, { useMemo } from 'react';

export const usePagination = (totalPages: number) => {
    const pagesArray = useMemo(() => {
        const pages_copy = [];
        for (let i = 0; i < totalPages; i++) {
          pages_copy.push(i+1);
        }
    
        return pages_copy;
      }, [totalPages]);

      return pagesArray;
}