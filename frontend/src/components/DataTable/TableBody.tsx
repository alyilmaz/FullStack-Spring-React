type Props = {
    children?: React.ReactNode;
}

const TableBody = (props:Props) =>{

    return(
        <tbody>
            {props.children}
        </tbody>
    )
}

export default TableBody;