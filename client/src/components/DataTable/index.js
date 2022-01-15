import React from "react";
import Table from "./Table";


const index = ({columns, rows, rowsPerPage, totalPages, count, page, handleChangePage,
                order, orderBy, handleRequestSort,searchingObjects, filteringObjects, handleChangeRowsPerPage }) =>{
    
    return(
        <div>
            <Table  columns={columns} rows={rows} rowsPerPage = {rowsPerPage} 
                    totalPages = {totalPages} count={count} page={page} 
                    handleChangePage={handleChangePage} order={order} 
                    orderBy={orderBy} handleRequestSort = {handleRequestSort}
                    searchingObjects={searchingObjects} filteringObjects={filteringObjects}
                    handleChangeRowsPerPage = {handleChangeRowsPerPage}/>
        </div>
    )
}

export default index;