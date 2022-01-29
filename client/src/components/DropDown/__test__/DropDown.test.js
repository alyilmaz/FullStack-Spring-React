/* eslint-disable testing-library/no-node-access */
import {render, screen} from "@testing-library/react";
import DropDown from "../DropDown";

const options = [{id:"all", label:"All"}, {id:"COMPLETED", label:"COMPLETED"},{id:"ERROR", label:"ERROR"},{id:"CANCELED", label:"CANCELED"}];

test("status option place holder should be options", () =>{
 
    render(<DropDown options={options}/>);
    expect(screen.getByText("options")).toBeTruthy();
})

test("status option place holder should be same the name of placeholder of props", () =>{
    const placeholder = "test";
    render(<DropDown placeholder={placeholder} options={options}/>);
    expect(screen.getByText(placeholder)).toBeTruthy();
})


test("there is only one option in select element if no options pros", () =>{
    const placeholder = "test";
    render(<DropDown placeholder={placeholder} />);
    expect(document.getElementById('select').childElementCount).toEqual(1);
})

test("the number of total options in select element should be size of options array(props) + 1", () =>{
    const placeholder = "test";
    const totatlChildElement = options.length + 1;
    render(<DropDown placeholder={placeholder} options={options}/>);
    expect(document.getElementById('select').childElementCount).toEqual(totatlChildElement);
})

test("all opitons should be enabled except status", () =>{
 
    render(<DropDown placeholder={"Status"} options={options}/>);
    expect(screen.getByText("Status")).toBeDisabled();
    expect(screen.getByText("All")).toBeEnabled();
    expect(screen.getByText("COMPLETED")).toBeEnabled();
    expect(screen.getByText("ERROR")).toBeEnabled();
    expect(screen.getByText("CANCELED")).toBeEnabled();
})