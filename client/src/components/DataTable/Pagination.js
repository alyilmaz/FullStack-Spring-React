import React from "react";

const Pagination = ({ page, count, rowsPerPage, totalPages, setPage, setRowsPerPage }) => {
  const beginning = page === 0 ? 1: (rowsPerPage*(page)) + 1;
  const end = page ===totalPages-1 ? count : (parseInt(beginning) + parseInt(rowsPerPage) - 1);


  return (
    <>
    <div className="pagination-groups">
    <div className="pagination">
      <button data-testid="button-first" className = "page-button first" disabled={page === 0} onClick={() => setPage(0)}>First</button>
      <button data-testid="button-prev" className = "page-button prev" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
      <button data-testid="button-next" className = "page-button next" disabled={page === totalPages-1} onClick={() => setPage(page + 1)}>Next</button>
      <button data-testid="button-last" className = "page-button last" disabled={page === totalPages-1} onClick={() => setPage(totalPages-1)}>Last</button>
    </div>
    <div className="page-size">
    <select required onChange={event => {setRowsPerPage(event.target.value);setPage(0);}}>
          <option data-testid="opt-1" value={5}>5</option>
          <option data-testid="opt-2" value={10}>10</option>
          <option data-testid="opt-3" value={15}>15</option>
          <option data-testid="opt-4" value={20}>20</option>
     </select>
    </div>
    <div>
    <p data-testid="text-page" >
        Page {page+1} of {totalPages}
      </p>
      </div>
      <div>
      <p data-testid="text-rows" >
        Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
      </p>
      </div>
      </div>
    </>
  )
}

export default Pagination;