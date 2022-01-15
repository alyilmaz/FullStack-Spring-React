import React from "react";
import Pagination from "./Pagination";
import Searching from "./Searching";
import "./css/DataTable.css"

const Table = ({ columns, rows, rowsPerPage, totalPages, count, page, 
                handleChangePage,order, orderBy, handleRequestSort,tableName,
                searchingObjects, filteringObjects, handleChangeRowsPerPage }) => {

    return (
      <>
      <Searching searchingObjects={searchingObjects} filteringObjects={filteringObjects} tableName={tableName}/>
      <table>
        <thead>
          <tr>
          {columns?.map(column => {
      const sortIcon = () => {
        if (column.id === orderBy) {
          if (order === 'asc') {
            return <i class="arrow up"></i>
          }
          return <i class="arrow down"></i>
        } else {
          return '️-'
        }
      }

      return (
        <th key={column.id}>
          <span >{column.label}</span>
          {column.sortable?<span className="sort-button"><button onClick={() => handleRequestSort(column.id)}>{sortIcon()}</button></span>:<div></div>}
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