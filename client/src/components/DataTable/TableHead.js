
const TableHead = ({order, orderBy, setOrder, setOrderBy, setPage,  columns}) =>{

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setPage(0);
      };

    return(
        <thead >
        <tr>
        {columns?.map(column => {
            const sortIcon = () => {
                if (column.id === orderBy) {
                    if (order === 'asc') {
                        return <i class="arrow up"></i>
                    }
                    return <i class="arrow down"></i>
                } else {
                    return '️-'
                }
        }

    return (
      <th key={column.id}>
        <span >{column.label}</span>
        {column.sortable?<span className="sort-button"><button onClick={() => handleRequestSort(column.id)}>{sortIcon()}</button></span>:<div></div>}
      </th>
    )
  })}
        </tr>
      </thead>
    )
}

export default TableHead;