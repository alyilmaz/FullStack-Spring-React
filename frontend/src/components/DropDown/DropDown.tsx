import "./dropdown.css";

interface Props{
    placeholder: string,
    options: Options[],
    onChange(e:React.ChangeEvent<HTMLSelectElement>): void;
}

type Options = {
    id: string,
    label: string,
}

const DropDown = (props:Props) =>{

    return(
        <div>
            <span className="custom-dropdown">  
                <select id = "select" onChange={event => props.onChange(event)}>
                    <option key = "blank" value="" disabled >{props.placeholder !== undefined ? props.placeholder : "options"}</option>
                    {props.options?.map(op=>{
                        return(
                        <option key  = {op.id} value={op.id}>{op.label}</option>
                        )
                    })}           
                </select>
            </span> 
        </div>
    )
}

export default DropDown;