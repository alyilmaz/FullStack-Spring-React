
interface Props{
    order: string,
    orderBy: string,
    setOrder(input:string):void,
    setOrderBy(input:string):void,
    setPage(input:number):void,
    columns: Column[]
}

export type Column = {
    id: string,
    sortable: boolean,
    label: string
}
const TableHead = (props: Props) =>{

    const handleRequestSort = (property:string):void => {
        const isAsc = props.orderBy === property && props.order === 'asc';
        props.setOrder(isAsc ? 'desc' : 'asc');
        props.setOrderBy(property);
        props.setPage(0);
      };

    return(
        <thead >
        <tr data-testid="row">
        {props.columns?.map(column => {
            const sortIcon = () => {
                if (column.id === props.orderBy) {
                    if (props.order === 'asc') {
                        return <i id = "up" className="arrow up"></i>
                    }
                    return <i id= "down" className="arrow down"></i>
                } else {
                    return '️-'
                }
        }

    return (
      <th  data-testid="table-head"  key={column.id}>
        <span data-testid="label" >{column.label}</span>
        {column.sortable?<span className="sort-button"><button id = {column.id + "-sort"} data-testid="sort-button" onClick={() => handleRequestSort(column.id)}>{sortIcon()}</button></span>:null}
      </th>
    )
  })}
        </tr>
      </thead>
    )
}

export default TableHead;