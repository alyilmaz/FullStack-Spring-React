/* eslint-disable testing-library/no-node-access */
import {render, screen} from "@testing-library/react";
import Pagination from "../Pagination";


test("initial button status", () =>{
    render(<Pagination page={0} count={15} rowsPerPage={5} totalPages={3} />);
    expect(screen.getByTestId("button-first")).toBeDisabled();
    expect(screen.getByTestId("button-prev")).toBeDisabled();
    expect(screen.getByTestId("button-next")).toBeEnabled();
    expect(screen.getByTestId("button-last")).toBeEnabled();
})

test("check the buttons status at end of the page", () =>{
    render(<Pagination page={2} count={15} rowsPerPage={5} totalPages={3} />);
    expect(screen.getByTestId("button-first")).toBeEnabled();
    expect(screen.getByTestId("button-prev")).toBeEnabled();
    expect(screen.getByTestId("button-next")).toBeDisabled();
    expect(screen.getByTestId("button-last")).toBeDisabled();
})

test("check the value of page and rows data", () =>{
    render(<Pagination page={0} count={15} rowsPerPage={5} totalPages={3} />);
    expect(document.getElementById("text-page").textContent).toEqual("Page 1 of 3");
    expect(document.getElementById("text-rows").textContent).toEqual("Rows: 1 - 5 of 15");
})

test("check the value of page and rows data at another page", () =>{
    render(<Pagination page={1} count={17} rowsPerPage={4} totalPages={5} />);
    expect(document.getElementById("text-page").textContent).toEqual("Page 2 of 5");
    expect(document.getElementById("text-rows").textContent).toEqual("Rows: 5 - 8 of 17");
})

test("check the all option values", () =>{
    render(<Pagination page={1} count={17} rowsPerPage={4} totalPages={5} />);
    expect(screen.getByTestId("opt-1").textContent).toEqual("5");
    expect(screen.getByTestId("opt-2").textContent).toEqual("10");
    expect(screen.getByTestId("opt-3").textContent).toEqual("15");
    expect(screen.getByTestId("opt-4").textContent).toEqual("20");
})