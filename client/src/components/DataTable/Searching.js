
const Searching = ({filteringObjects, searchingObjects}) =>{

    return(
        <th>
            {searchingObjects?.map(item =>{
                return(
                <input
                key={item.id}
                type="search"
                placeholder={item.placeHolder}
                onChange={event => item.handler(event.target.value)}
                />)
            })
         
            }
            {filteringObjects?.map(item =>{
                return(
                <select required onChange={event => item.handler(event)}>
                <option value="" disabled selected>{item.placeHolder}</option>
                {item.options.map(op =>{
                    return(
                    <option value={op.id}>{op.label}</option>
                    )
                })}           
                </select>
                )
            })}
         
        </th>
    )
}

export default Searching;