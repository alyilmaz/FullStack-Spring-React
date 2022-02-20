import "./search.css"

interface Props{
    placeholder?: string,
    onChange(e:React.ChangeEvent<HTMLInputElement>): void;
}


const SearchingField = (props:Props) =>{

    return(
        <div className="search-container"> 
        <input
            className="search-input"
            key= "key"
            id="search"
            type="search"
            placeholder=  {props.placeholder!== undefined ? props.placeholder : "searching"}
            onChange={event => props.onChange(event)}
        />
        </div>
    )
}

export default SearchingField;