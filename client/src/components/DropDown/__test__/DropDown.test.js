import {render, screen} from "@testing-library/react";
import DropDown from "../DropDown";

const options = [[{id:"", label:"All"}, {id:"COMPLETED", label:"COMPLETED"},{id:"ERROR", label:"ERROR"},{id:"CANCELED", label:"CANCELED"}]];

test("reg", () =>{
 
    render(<DropDown placeholder={"dropdown-test"} options={options}/>);
    screen.queryByRole("ali");
})