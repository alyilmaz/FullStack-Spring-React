import React, {useState, useEffect } from "react";
import SearchingField from "../../components/SearchingField/SearchingField";
import Grid from "../../components/Grid/Grid";
import DropDown from "../../components/DropDown/DropDown";
import DataTable from "../../components/DataTable";
import ServiceRequest from "../../services/ServiceRequest";
import ClientService from "../../services/client/ClientService";
import './clientlist.css';

type Row = {
  id: string,
  status: string,
  createdOn: string,
  name: string,
  description: string,
  delta: string
}

interface DataObject{
  totalPages: number,
  totalElements: number,
  data: Row[]
}

const ClientList = () =>{
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [searchByName, setSearchByName] = useState('');
    const [filterByStatus, setFilterByStatus] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState<Row[]>([]);
    const [receivedData, setReceivedData] = useState<DataObject>({} as DataObject);

    const getData = (pageNo:number,pageSize:number,sortBy: string,sortDirection: string,name: string, status: string) =>{
        let service = new ServiceRequest();
        const queryParams = {pageNo,pageSize,sortBy,sortDirection,name,status}
        ClientService.getClient(service,queryParams, (res) =>{
          let response:DataObject = res as DataObject;
          setReceivedData(response);
          setRows(response.data);
          console.log(res);
        }, (err) =>{
          console.log(err);
        })
      }
    
      useEffect(() => {
        getData(page,rowsPerPage,orderBy,order,searchByName, filterByStatus)
      }, [page, rowsPerPage, order, orderBy, searchByName, filterByStatus]);


    const statusOptions = [{id:"", label:"All"},
    {id:"COMPLETED", label:"COMPLETED"},{id:"ERROR", label:"ERROR"},{id:"CANCELED", label:"CANCELED"}];

    const headCells = [
        { id: "id", sortable: true,   label: "ID" },
        { id: "status",     sortable: false,   label: "Status" },
        { id: "createdOn", sortable: true,  label: "Created ON" },
        { id: "name",     sortable: true,  label: "Name" },
        { id: "description", sortable: false, label: "Description" },
        { id: "delta",     sortable: false,  label: "Delta" },
      ];

    return(
        <Grid>
     
        <div className="item4">
          <div className="container">
          <div className="filter-component">
          <span>
              <DropDown  onChange= {(event) =>{setFilterByStatus(event.target.value); setPage(0)}} placeholder = "STATUS  " options = {statusOptions}/>
            </span>
            <span className="search">
                <SearchingField placeholder="Searching name..." onChange={(e: React.ChangeEvent<HTMLInputElement>): void=> {setSearchByName(e.target.value); setPage(0); }}/>
            </span>
            </div>
            <div className="table">
            <DataTable columns={headCells} rows={rows} rowsPerPage={rowsPerPage} totalPages={receivedData.totalPages}
                   count={receivedData.totalElements} page= {page} setPage= {setPage} setOrderBy = {setOrderBy}
                   order={order} orderBy={orderBy} 
                   setRowsPerPage = {setRowsPerPage} setOrder = {setOrder}/>
            </div>
            </div>
            </div>
        </Grid>
    )
}

export default ClientList;