import "./MapPage.css"
import "../../Css/Range.css"
import {useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom"
import {useReactToPrint} from "react-to-print";
import {DataHistory} from "../../Datas/DataHistory";
import Map from "../Map/Map";
import RouteInfo from "../RouteInfo/RouteInfo";

function MapPage(){
    const [priceValue, setPriceValue] = useState(null);
    const location = useLocation()
    const componentRef = useRef(null)
    const handlePrint = useReactToPrint({
        content:() => componentRef.current
    })
    const maxRange = 50
    const FoundRecord = DataHistory.find(x=> x.idA+x.idB === location.state.idOfTile);
    return(
        <div className={"mapPageContainer"} >
            <div ref={componentRef} >
                <RouteInfo props={{data: FoundRecord, rate: priceValue}} />
            </div>
            <div className={"rangeOutputsContainer"}>
                <p className={"customRangeLabel"}>Price for km</p>
                <input type="range" className="custom-range" min="1" max="50"
                       onChange={(event) => setPriceValue(event.target.value)} />
            </div>
            <div className={"rangeOutputsContainer"}>
                <p className={"rangeOutputs"}>{priceValue}</p>
                <p>-</p>
                <p className={"rangeOutputs"}>{maxRange}</p>
            </div>
            <div className={"map"}>
                <Map props={FoundRecord}/>
            </div>
            <div className={"buttonMap"}>
                <Link to={"/"} style={{ textDecoration: 'none' }}>
                    <div className={"button buttonMapPage"}>
                        To main page
                    </div>
                </Link>
                <button className={"button buttonMapPage"} onClick={handlePrint}>Export</button>
            </div>
        </div>
    )
}

export default MapPage