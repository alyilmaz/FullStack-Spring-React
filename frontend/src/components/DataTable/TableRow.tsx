type Props = {
    children?: React.ReactNode;
}

const TableRow = (props:Props) =>{

    return(
        <tr>
            {props.children}
        </tr>
    )
}

export default TableRow;