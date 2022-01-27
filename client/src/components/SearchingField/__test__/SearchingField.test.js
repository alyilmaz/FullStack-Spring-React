import React from "react";
import SearchingField from "../SearchingField";
import {render, screen} from "@testing-library/react";

test("the searching field should be enabled", () =>{
    render(<SearchingField/>);
    expect(screen.getByTestId("search-name")).toBeEnabled();
});

test("the searching field get By its placeholder text", () =>{
    render(<SearchingField/>);
    expect(screen.getByPlaceholderText("searching")).toBeEnabled();
});

test("the searching field get By its placeholder via props", () =>{
    render(<SearchingField placeholder = "test"/>);
    expect(screen.getByPlaceholderText("test")).toBeEnabled();
});
