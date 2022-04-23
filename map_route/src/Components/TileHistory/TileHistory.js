import "./TileHistory.css"
import {Link} from "react-router-dom";
function TileHistory(props){
    const TileKey = props.props.idA + props.props.idB;
    return(
        <Link to={"/Map"} state={{idOfTile: TileKey}} style={{ textDecoration: 'none' }}>
            <div className={"container"}>
                <p className={"pointLeft"}>{props.props.addressA}</p>
                <p className={"arrow"}>➔</p>
                <p className={"pointRight"}>{props.props.addressB}</p>
            </div>
        </Link>
        )
}

export default  TileHistory