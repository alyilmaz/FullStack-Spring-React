/* eslint-disable testing-library/no-node-access */
import React from "react";
import SearchingField from "../SearchingField";
import {render, screen} from "@testing-library/react";
import renderer from 'react-test-renderer';

test("the searching field should be enabled", () =>{
    render(<SearchingField/>);
    expect(document.getElementById("search")).toBeEnabled();
});

test("the searching field get By its placeholder text", () =>{
    render(<SearchingField/>);
    expect(screen.getByPlaceholderText("searching")).toBeEnabled();
});

test("the searching field get By its placeholder via props", () =>{
    render(<SearchingField placeholder = "test"/>);
    expect(screen.getByPlaceholderText("test")).toBeEnabled();
});

test("create snapshot", () =>{
    const tree = renderer
                    .create(<SearchingField placeholder = "test"/>)
                    .toJSON();
    expect(tree).toMatchSnapshot();

})
