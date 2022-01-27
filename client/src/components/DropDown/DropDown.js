import "./dropdown.css";

const DropDown = ({onChange, placeholder, options}) =>{

    return(
        <div>
            <span className="custom-dropdown">  
                <select onChange={event => onChange(event.target.value)}>
                    <option value="" disabled >{placeholder !== undefined ? placeholder : "options"}</option>
                    {options?.map(op =>{
                        return(
                        <option value={op.id}>{op.label}</option>
                        )
                    })}           
                </select>
            </span> 
        </div>
    )
}

export default DropDown;