type Props = {
    children?: React.ReactNode;
}

const Table = (props:Props) =>{
    return(
        <table>
            {props.children}
        </table>
    )

}

export default Table;