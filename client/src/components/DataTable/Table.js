import React from "react";
import Pagination from "./Pagination";
import Searching from "./Searching";

const Table = ({ columns, rows, rowsPerPage, totalPages, count, page, 
                handleChangePage,order, orderBy, handleRequestSort,
                searchingObjects, filteringObjects, handleChangeRowsPerPage }) => {

    return (
      <>  
      <Searching searchingObjects={searchingObjects} filteringObjects={filteringObjects}/>
      <table>
        <thead>
          <tr>
          {columns?.map(column => {
      const sortIcon = () => {
        if (column.id === orderBy) {
          if (order === 'asc') {
            return '^'
          }
          return '+'
        } else {
          return '️-'
        }
      }

      return (
        <th key={column.id}>
          <span>{column.label}</span>
          <button disabled={!column.sortable} onClick={() => handleRequestSort(column.id)}>{sortIcon()}</button>
        </th>
      )
    })}
          </tr>
        </thead>
        <tbody>
          {rows?.map(row => {
            return (
              <tr key={row.id}>
                {columns.map(column => {
                  if (column.format) {
                    return <td key={column.id}>{column.format(row[column.id])}</td>
                  }
                  return <td key={column.id}>{row[column.id]}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
        <Pagination 
        page={page}
        count={count}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        handleChangePage = {handleChangePage}
        handleChangeRowsPerPage = {handleChangeRowsPerPage}
        />
      </> 
    )
  }

  export default Table;