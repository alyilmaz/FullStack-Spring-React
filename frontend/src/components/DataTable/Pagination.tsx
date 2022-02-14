interface Props{
    page: number,
    count: number,
    rowsPerPage: number,
    totalPages: number,
    setPage(input : number):void,
    setRowsPerPage(input : number): void
}

const Pagination = (props:Props) =>{

    const beginning:number = props.page === 0 ? 1: (props.rowsPerPage*(props.page)) + 1;
    const end = props.page ===props.totalPages-1 ? props.count : (beginning + props.rowsPerPage - 1);
  
  
    return (
      <>
      <div className="pagination-groups">
      <div className="pagination">
        <button data-testid="button-first" className = "page-button first" disabled={props.page === 0} onClick={() => props.setPage(0)}>First</button>
        <button data-testid="button-prev" className = "page-button prev" disabled={props.page === 0} onClick={() => props.setPage(props.page - 1)}>Previous</button>
        <button data-testid="button-next" className = "page-button next" disabled={props.page === props.totalPages-1} onClick={() => props.setPage(props.page + 1)}>Next</button>
        <button data-testid="button-last" className = "page-button last" disabled={props.page === props.totalPages-1} onClick={() => props.setPage(props.totalPages-1)}>Last</button>
      </div>
      <div className="page-size">
      <select id= "pageSize" required onChange={event => {props.setRowsPerPage(parseInt(event.target.value));props.setPage(0);}}>
            <option data-testid="opt-1" value={5}>5</option>
            <option data-testid="opt-2" value={10}>10</option>
            <option data-testid="opt-3" value={15}>15</option>
            <option data-testid="opt-4" value={20}>20</option>
       </select>
      </div>
      <div>
      <p id = "text-page"  >
          Page {props.page+1} of {props.totalPages}
        </p>
        </div>
        <div>
        <p id="text-rows"  >
          Rows: {beginning === end ? end : `${beginning} - ${end}`} of {props.count}
        </p>
        </div>
        </div>
      </>
    )
}

export default Pagination;