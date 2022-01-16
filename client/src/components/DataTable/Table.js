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
      <table role="table">
        <thead role="rowgroup">
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
        <tbody role="rowgroup">
          {rows?.map(row => {
            return (
              <tr role="row" key={row.id}>
                {columns.map(column => {
                  if(column.id ==="createdOn"){return <td role="cell" key={column.id}>{row[column.id].split("T")[0]}</td>}

                  return <td role="cell" key={column.id}>{row[column.id]}</td>
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