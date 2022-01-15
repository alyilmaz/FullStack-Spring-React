import React from "react";

const Pagination = ({ page, count, rowsPerPage, totalPages, handleChangePage, handleChangeRowsPerPage }) => {
  const beginning = page === 0 ? 1: (rowsPerPage*(page)) + 1;
  const end = page ===totalPages-1 ? count : (parseInt(beginning) + parseInt(rowsPerPage) - 1);


  return (
    <>
    <div className="pagination-groups">
    <div className="pagination">
      <button disabled={page === 0} onClick={() => handleChangePage(0)}>⏮️ First</button>
      <button disabled={page === 0} onClick={() => handleChangePage(page - 1)}>⬅️ Previous</button>
      <button disabled={page === totalPages-1} onClick={() => handleChangePage(page + 1)}>Next ➡️</button>
      <button disabled={page === totalPages-1} onClick={() => handleChangePage(totalPages-1)}>Last ⏭️</button>
    </div>
    <div className="page-size">
    <select required onChange={event => handleChangeRowsPerPage(event)}>
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