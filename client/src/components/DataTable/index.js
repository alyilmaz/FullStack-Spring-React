import React from "react";
import TableBody from "./TableBody";
import Pagination  from "./Pagination";
import TableHead from "./TableHead";
import TableCell from "./TableCell";
import TableRow from "./TableRow";
import Table from "./Table";



const index = ({columns, rows, rowsPerPage, totalPages, count, page, setPage, 
                order, orderBy, setOrderBy, setOrder, setRowsPerPage }) =>{
    
    return(
        <div className="table-container" >
            <Table>
                <TableHead setPage={setPage} order={order} columns={columns}
                                orderBy={orderBy} setOrder={setOrder}  setOrderBy={setOrderBy} />
                <TableBody>
                    {rows?.map((row, index) =>{
                        return( 
                            <TableRow key = {index}>
                                {columns?.map((column) =>{
                                    return (
                                        <TableCell key = {column.id + index} data={row[column.id]} id={column.id + index}/>
                                    )
                                })}
                        </TableRow>)
                    })}
                    
                </TableBody>

            </Table>

            <Pagination 
                page={page}
                count={count}
                rowsPerPage={rowsPerPage}
                totalPages={totalPages}
                setPage = {setPage}
                setRowsPerPage = {setRowsPerPage}
                />
        </div>
            
    )
}

export default index;