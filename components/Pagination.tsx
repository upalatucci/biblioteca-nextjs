import * as React from 'react'

type PaginationProps = {
    page: number;
    totalPage: number;
    array: any[];
    renderer: (item: any) => React.ReactNode;
}

const Pagination: React.FC<PaginationProps> = ({page = 1, array, totalPage, renderer}) => {

    const prevPage = page - 1
    const prevPrevPage = page - 2

    const nextPages = Array(Math.min(totalPage - page, 5)).map(n => n + page)

  return (
    <div>
        <span><</span>
        {prevPrevPage > 0 && <span>{prevPrevPage}</span>}
        {prevPage > 0 && <span>{prevPage}</span>}

        {nextPages.map(nextPage => <span>{nextPage}</span>)}
        <span>></span>
    </div>
  )
}

export default Pagination;  