import React, {useState, useEffect} from "react";
import DataTable from "../components/DataTable";
import ClientService from "../services/client/ClientService";
import ServiceRequest from '../services/ServiceRequest';


export default function ClientList() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [searchByName, setSearchByName] = useState('');
  const [filterByStatus, setFilterByStatus] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [receivedData, setReceivedData] = useState([]);

  const getData = (pageNo,pageSize,sortBy,sortDirection,name, status) =>{
    let service = new ServiceRequest();
    const queryParams = {pageNo,pageSize,sortBy,sortDirection,name,status}
    ClientService.getClient(service,queryParams, (res) =>{
      setReceivedData(res);
      setRows(res.data);
      console.log(res);
    }, (err) =>{
      console.log(err);
    })
  }

  useEffect(() => {
    getData(page,rowsPerPage,orderBy,order,searchByName, filterByStatus)
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setPage(0);
    getData(0, rowsPerPage, property, isAsc ? 'desc' : 'asc', searchByName, filterByStatus);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
    getData(newPage, rowsPerPage, orderBy, order, searchByName, filterByStatus);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    getData(0, event.target.value, orderBy, order, searchByName, filterByStatus);
    setPage(0);
  };
  
  const headCells = [
    { id: "id", sortable: true,   label: "ID" },
    { id: "status",     sortable: false,   label: "Status" },
    { id: "createdOn", sortable: true,  label: "Created ON" },
    { id: "name",     sortable: true,  label: "Name" },
    { id: "description", sortable: false, label: "Description" },
    { id: "delta",     sortable: false,  label: "Delta" },
  ];


const handleSearchingForName = (event) => {
      setSearchByName(event);
      setPage(0);
      getData(0, rowsPerPage,orderBy, order, event, filterByStatus);
}

const handleFilteringForStatus = (event) => {
      setFilterByStatus(event.target.value);
      setPage(0);
      getData(0, rowsPerPage,orderBy, order, searchByName, event.target.value);
}

const searchingObjects = [
  {
    id:"name", placeHolder: "Searching name", handler: handleSearchingForName
  },
]

const filteringObjects = [
  {
    id:"status", placeHolder: "Select Status", handler: handleFilteringForStatus, options:[{id:"", label:"All"},
    {id:"COMPLETED", label:"COMPLETED"},{id:"ERROR", label:"ERROR"},{id:"CANCELED", label:"CANCELED"}]
  },
]


  return (
    <div>
        <DataTable columns={headCells} rows={rows} rowsPerPage={rowsPerPage} totalPages={receivedData.totalPages}
                   count={receivedData.totalElements} page= {page} handleChangePage= {handleChangePage}
                   order={order} orderBy={orderBy} handleRequestSort = {handleRequestSort} filteringObjects={filteringObjects}
                   searchingObjects={searchingObjects} handleChangeRowsPerPage = {handleChangeRowsPerPage}/>
    </div>
  );
}
