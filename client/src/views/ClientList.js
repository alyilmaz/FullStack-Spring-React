import React, {useState, useEffect } from "react";
import DataTable from "../components/DataTable";
import DropDown from "../components/DropDown/DropDown";
import Grid from "../components/Grid/Grid";
import SearchingField from "../components/SearchingField/SearchingField";
import ClientService from "../services/client/ClientService";
import ServiceRequest from '../services/ServiceRequest';
import "./clientlist.css";

export default function ClientList() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
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
  }, [page, rowsPerPage, order, orderBy, searchByName, filterByStatus]);

  const headCells = [
    { id: "id", sortable: true,   label: "ID" },
    { id: "status",     sortable: false,   label: "Status" },
    { id: "createdOn", sortable: true,  label: "Created ON" },
    { id: "name",     sortable: true,  label: "Name" },
    { id: "description", sortable: false, label: "Description" },
    { id: "delta",     sortable: false,  label: "Delta" },
  ];

  const statusOptions = [{id:"", label:"All"},
  {id:"COMPLETED", label:"COMPLETED"},{id:"ERROR", label:"ERROR"},{id:"CANCELED", label:"CANCELED"}];

  return (
    <Grid>
     
    <div className="item4">
      <div className="container">
      <div className="filter-component">
        <span>
          <SearchingField placeholder= "Searching Name.." onChange={(event) => {setSearchByName(event); setPage(0); }}/>
        </span> 
        <span>
          <DropDown  onChange= {(event) =>{setFilterByStatus(event); setPage(0)}} placeholder = "STATUS  " options = {statusOptions}/>
        </span>
      </div>
      <div className="table">
      <DataTable columns={headCells} rows={rows} rowsPerPage={rowsPerPage} totalPages={receivedData.totalPages}
                   count={receivedData.totalElements} page= {page} setPage= {setPage} setOrderBy = {setOrderBy}
                   order={order} orderBy={orderBy} tableName= {"Person Table"}
                   setRowsPerPage = {setRowsPerPage} setOrder = {setOrder}/>
      </div>
      </div>
    </div>
  
    </Grid>
  );
}
