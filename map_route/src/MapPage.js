import "./MapPage.css"
import {Link} from "react-router-dom"
import {useLocation} from 'react-router-dom';
import {DataHistory} from "./DataHistory";
import Map from "./Map";
import {useState} from "react";
import KmComponent from "./KmComponent";
import "./Range.css"


function MapPage(){
    const [rangeval, setRangeval] = useState(null);
    const location = useLocation()
    return(
        <div className={"container-xxl"}>
            <KmComponent props={{data:DataHistory.find(x=> x.idA+x.idB === location.state.idOfTile), rate: rangeval}}/>
            <div className={"range-outputs-container"}>
                <p className={"custom-range-label"}>Price for km </p>
                <input type="range" className="custom-range" min="1" max="50"
                       onChange={(event) => setRangeval(event.target.value)} />
            </div>
            <div className={"range-outputs-container"}>
                <p className={"range-outputs"}>{rangeval}</p>
                <p>-</p>
                <p className={"range-outputs"}>50</p>
            </div>
            <div className={"map"}>
                <Map props={DataHistory.find(x=> x.idA+x.idB === location.state.idOfTile)}/>
            </div>
            <div className={"buttons-map"}>
                <Link to={"/"} style={{ textDecoration: 'none' }}>
                    <div className={"button button-map-page"}>
                        To main page
                    </div>
                </Link>

            </div>

        </div>
    )
}

export default MapPage