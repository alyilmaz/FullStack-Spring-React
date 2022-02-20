/* eslint-disable testing-library/no-node-access */
import SearchingField from "../SearchingField";
import {render, screen} from "@testing-library/react";
import renderer from 'react-test-renderer';

test("the searching field should be enabled", () =>{
    render(<SearchingField onChange={(e) => e.target.value}/>);
    expect(document.getElementById("search")).toBeEnabled();
});

test("the searching field get By its placeholder text", () =>{
    render(<SearchingField onChange={(e) => e.target.value}/>);
    expect(screen.getByPlaceholderText("searching")).toBeEnabled();
});

test("the searching field get By its placeholder via props", () =>{
    render(<SearchingField placeholder = "test" onChange={(e) => e.target.value}/>);
    expect(screen.getByPlaceholderText("test")).toBeEnabled();
});

test("create snapshot", () =>{
    const tree = renderer
                    .create(<SearchingField placeholder = "test" onChange={(e) => e.target.value}/>)
                    .toJSON();
    expect(tree).toMatchSnapshot();

})