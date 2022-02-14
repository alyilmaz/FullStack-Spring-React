
interface Props{
    id: string,
    data: string
}

const TableCell = (props:Props) =>{

    return(
        <td role="cell" key={props.id} id={props.id}>
            {props.data}
        </td>
    )

}

export default TableCell;