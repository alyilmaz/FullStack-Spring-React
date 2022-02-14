import "./grid.css";

type Props = {
    children?: React.ReactNode;
  };

const Grid = (props:Props) =>{

    return(
        <div className="grid-container" >
            {props.children}
        </div>
    )
}

export default Grid;