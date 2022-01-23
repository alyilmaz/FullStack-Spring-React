
const TableCell = ({id, data}) =>{

    return(
        <td role="cell" key={id}>
            {data}
        </td>
    )
}

export default TableCell;