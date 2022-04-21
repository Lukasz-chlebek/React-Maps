import "./MainPage.css"
import {Link} from "react-router-dom"
import arrow from "./arrow-left-long-solid.svg"
function MapPage(props){
    return(
        <div className={"container"}>
            <Link to={"/"} style={{ textDecoration: 'none' }}>
                <div className={"arrow"}>
                    To main page
                </div>
            </Link>
        </div>
    )
}

export default MapPage