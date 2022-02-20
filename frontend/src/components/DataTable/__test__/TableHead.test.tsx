/* eslint-disable testing-library/no-node-access */
import {render, screen} from "@testing-library/react";
import TableHead from "../TableHead";
import Table from "../Table";
import renderer from 'react-test-renderer';

    
test("sorting button must be existed", () =>{
    const columns = [
        { id: "id", sortable: true,   label: "ID" },
        { id: "status",     sortable: false,   label: "Status" }]
    render(<Table><TableHead order = {"asc"} orderBy = {"id"} columns = {columns} 
                                setOrder={order =>console.log(order)} 
                                setOrderBy={orderBy =>console.log(orderBy)}
                                setPage={page =>console.log(page)} /></Table>); 
    expect(screen.getByTestId("sort-button")).toBeTruthy(); 
});

test("sorting button must be non-existed", () =>{
    const columns = [
        { id: "id", sortable: false,   label: "ID" },
        { id: "status",     sortable: false,   label: "Status" }]
    render(<Table><TableHead order = {"asc"} orderBy = {"id"} columns = {columns} setOrder={order =>console.log(order)} 
                                                setOrderBy={orderBy =>console.log(orderBy)}
                                                setPage={page =>console.log(page)}/></Table>); 
    expect(screen.queryByTestId("sort-button")).not.toBeTruthy(); 
});

test("head label check", () =>{
    const columns = [
        { id: "id", sortable: true,   label: "ID" },
        { id: "status",     sortable: false,   label: "Status" }]
    render(<Table><TableHead order = {"asc"} orderBy = {"id"} columns = {columns}setOrder={order =>console.log(order)} 
                                            setOrderBy={orderBy =>console.log(orderBy)}
                                            setPage={page =>console.log(page)}/></Table>); 
    const spans = screen.queryAllByTestId("label");
    expect(spans[0]).toHaveTextContent("ID"); 
    expect(spans[1]).toHaveTextContent("Status"); 
});

test("first button is up and second one is -", () =>{
    const columns = [
        { id: "id", sortable: true,   label: "ID" },
        { id: "status",     sortable: true,   label: "Status" }]
    render(<Table><TableHead order = {"asc"} orderBy = {"id"} columns = {columns} setOrder={order =>console.log(order)} 
    setOrderBy={orderBy =>console.log(orderBy)}
    setPage={page =>console.log(page)}/></Table>); 
    const button = screen.queryAllByTestId("sort-button");
    expect(button[0]).toContainElement(document.getElementById("up")  as HTMLFormElement); 
    expect(button[1]).toHaveTextContent("-"); 
});


test("first button is - and second one is down", () =>{
    const columns = [
        { id: "id", sortable: true,   label: "ID" },
        { id: "status",     sortable: true,   label: "Status" }]
    render(<Table><TableHead order = {"desc"} orderBy = {"status"} columns = {columns} setOrder={order =>console.log(order)} 
    setOrderBy={orderBy =>console.log(orderBy)}
    setPage={page =>console.log(page)}/></Table>); 
    const button = screen.queryAllByTestId("sort-button");
    expect(button[1]).toContainElement(document.getElementById("down")); 
    expect(button[0]).toHaveTextContent("-"); 
});

test("create snapshot", () =>{
    const columns = [
        { id: "id", sortable: true,   label: "ID" },
        { id: "status",     sortable: true,   label: "Status" }]
    const tree = renderer
                    .create(<Table><TableHead order = {"desc"} orderBy = {"status"} columns = {columns} setOrder={order =>console.log(order)} 
                    setOrderBy={orderBy =>console.log(orderBy)}
                    setPage={page =>console.log(page)}/></Table>)
                    .toJSON();
    expect(tree).toMatchSnapshot();
});