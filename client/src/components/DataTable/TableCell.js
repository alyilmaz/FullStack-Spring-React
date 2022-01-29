
const TableCell = ({id, data}) =>{

    return(
        <td role="cell" key={id} id={id}>
            {data}
        </td>
    )
}

export default TableCell;