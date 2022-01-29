
const TableHead = ({order, orderBy, setOrder, setOrderBy, setPage,  columns}) =>{

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setPage(0);
      };

    return(
        <thead >
        <tr data-testid="row">
        {columns?.map(column => {
            const sortIcon = () => {
                if (column.id === orderBy) {
                    if (order === 'asc') {
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