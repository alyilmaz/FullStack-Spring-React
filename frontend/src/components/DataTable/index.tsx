import TableBody from "./TableBody";
import Pagination  from "./Pagination";
import TableHead, {Column} from "./TableHead";
import TableCell from "./TableCell";
import TableRow from "./TableRow";
import Table from "./Table";
import './css/DataTable.css'

interface Props{
    columns: Column[], 
    rows: Row[], 
    rowsPerPage: number, 
    totalPages: number, 
    count: number, 
    page: number, 
    setPage(input: number): void, 
    order: string, 
    orderBy: string, 
    setOrderBy(input: string): void, 
    setOrder(input: string): void, 
    setRowsPerPage(input: number): void
}

type Row = {
    id: string,
    status: string,
    createdOn: string,
    name: string,
    description: string,
    delta: string
}

const index = (props: Props) =>{
    return(
        <div className="table-container" >
        <Table>
            <TableHead setPage={props.setPage} order={props.order} columns={props.columns}
                            orderBy={props.orderBy} setOrder={props.setOrder}  setOrderBy={props.setOrderBy} />
            <TableBody>
                {props.rows?.map((row, index) =>{
                    return( 
                        <TableRow key = {index}>
                            {props.columns?.map((column) =>{
                                return (
                                    <TableCell key = {column.id + index} data={(row as any)[column.id]} id={column.id + index}/>
                                )
                            })}
                    </TableRow>)
                })}
                
            </TableBody>

        </Table>

        <Pagination 
            page={props.page}
            count={props.count}
            rowsPerPage={props.rowsPerPage}
            totalPages={props.totalPages}
            setPage = {props.setPage}
            setRowsPerPage = {props.setRowsPerPage}
            />
    </div>
    )
}

export default index;