import React from "react";

const Pagination = ({ page, count, rowsPerPage, totalPages, setPage, setRowsPerPage }) => {
  const beginning = page === 0 ? 1: (rowsPerPage*(page)) + 1;
  const end = page ===totalPages-1 ? count : (parseInt(beginning) + parseInt(rowsPerPage) - 1);


  return (
    <>
    <div className="pagination-groups">
    <div className="pagination">
      <button className = "page-button first" disabled={page === 0} onClick={() => setPage(0)}>First</button>
      <button className = "page-button prev" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
      <button className = "page-button next" disabled={page === totalPages-1} onClick={() => setPage(page + 1)}>Next</button>
      <button className = "page-button last" disabled={page === totalPages-1} onClick={() => setPage(totalPages-1)}>Last</button>
    </div>
    <div className="page-size">
    <select required onChange={event => {setRowsPerPage(event.target.value);setPage(0);}}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
     </select>
    </div>
    <div>
    <p>
        Page {page+1} of {totalPages}
      </p>
      </div>
      <div>
      <p>
        Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
      </p>
      </div>
      </div>
    </>
  )
}

export default Pagination;