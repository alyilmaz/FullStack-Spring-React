import React from "react";
import {render, screen} from "@testing-library/react";
import TableHead from "../TableHead";

test("sorting button must be existed", () =>{
    const columns = [
        { id: "id", sortable: true,   label: "ID" },
        { id: "status",     sortable: false,   label: "Status" }]
    render(<TableHead order = {"asc"} orderBy = {"id"} columns = {columns}/>); 
    expect(screen.getByTestId("sort-button")).toBeTruthy(); 
})

test("sorting button must be non-existed", () =>{
    const columns = [
        { id: "id", sortable: false,   label: "ID" },
        { id: "status",     sortable: false,   label: "Status" }]
    render(<TableHead order = {"asc"} orderBy = {"id"} columns = {columns}/>); 
    expect(screen.queryByTestId("sort-button")).not.toBeTruthy(); 
})

test("head label check", () =>{
    const columns = [
        { id: "id", sortable: true,   label: "ID" },
        { id: "status",     sortable: false,   label: "Status" }]
    render(<TableHead order = {"asc"} orderBy = {"id"} columns = {columns}/>); 
    const spans = screen.queryAllByTestId("label");
    expect(spans[0]).toHaveTextContent(["ID"]); 
    expect(spans[1]).toHaveTextContent(["Status"]); 
})

test("first button is up and second one is -", () =>{
    const columns = [
        { id: "id", sortable: true,   label: "ID" },
        { id: "status",     sortable: true,   label: "Status" }]
    render(<TableHead order = {"asc"} orderBy = {"id"} columns = {columns}/>); 
    const button = screen.queryAllByTestId("sort-button");
    expect(button[0]).toContainElement(screen.queryByTestId("up")); 
    expect(button[1]).toHaveTextContent("-"); 
})


test("first button is - and second one is down", () =>{
    const columns = [
        { id: "id", sortable: true,   label: "ID" },
        { id: "status",     sortable: true,   label: "Status" }]
    render(<TableHead order = {"desc"} orderBy = {"status"} columns = {columns}/>); 
    const button = screen.queryAllByTestId("sort-button");
    expect(button[1]).toContainElement(screen.queryByTestId("down")); 
    expect(button[0]).toHaveTextContent("-"); 
})
