import "./search.css"
const SearchingField = ({onChange, placeholder}) =>{

    return(
        <div className="search-container"> 
        <input
            className="search-input"
            key= "key"
            id="search"
            type="search"
            data-testid="search-name"
            placeholder=  {placeholder!== undefined ? placeholder : "searching"}
            onChange={event => onChange(event.target.value)}
        />
        </div>
    )
}

export default SearchingField;