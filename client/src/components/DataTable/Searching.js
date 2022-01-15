
const Searching = ({filteringObjects, searchingObjects, tableName}) =>{

    return(
        <div className="searching-groups">   
        <th>
        <div className="tableName">
            {tableName}
        </div>  
            {searchingObjects?.map(item =>{
                return(
                <div> 
                <input
                key={item.id}
                id="search"
                type="search"
                placeholder={item.placeHolder}
                onChange={event => item.handler(event.target.value)}
                />
                </div>
                )
            })
         
            }
            {filteringObjects?.map(item =>{
                return(
                <div>
                <span class="custom-dropdown">  
                <select onChange={event => item.handler(event)}>
                <option value="" disabled selected>{item.placeHolder}</option>
                {item.options.map(op =>{
                    return(
                    <option value={op.id}>{op.label}</option>
                    )
                })}           
                </select>
                </span> 
                </div>
                )
            })}
         
        </th>
        </div>
    )
}

export default Searching;