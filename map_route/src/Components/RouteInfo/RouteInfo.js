import axios from "axios";
import {useState} from "react";
import "./RouteInfo.css"
import {API_KEY} from "../../Datas/ApiKey";

export function CalculateCostAndDays(data, givenRate) {
    const kilometer = 1000., sumRate=1.1, maxCostPerDay=1000., maxLenPerDay=800.
    let cost = (data.length / kilometer) * givenRate * sumRate
    let lengthInKm = (data.length / kilometer)
    let days;
    if (cost / maxCostPerDay > lengthInKm / maxLenPerDay) {
        days = Math.ceil(cost / maxCostPerDay)
    } else {
        days = Math.ceil(lengthInKm / maxLenPerDay)
    }
    return {cost, lengthInKm, days};
}

function RouteInfo(props){
    const minute=60
    const givenRate = props.props.rate
    const [data, setData]= useState({})
    const [state, setState] = useState(true)
    function GetRouteInfo() {
        const pointACord = props.props.data.pointACoord;
        const pointBCord = props.props.data.pointBCoord;
        axios.get(`https://router.hereapi.com/v8/routes?transportMode=car&origin=${pointACord}&destination=${pointBCord}&return=summary&apiKey=${API_KEY}`)
            .then(res => {
                setData({
                    length: res.data.routes[0].sections[0].summary.length,
                    duration: res.data.routes[0].sections[0].summary.duration,
                })
                setState(false)
            }).catch(e => {
            console.log(e)
        })
    }
    console.log(data)


    if(state){
        GetRouteInfo();
    }
    let {cost, lengthInKm, days} = CalculateCostAndDays(data, givenRate);
    let Route;
    if(data.length===undefined){
        Route = <p className={"noRoute"}>There is no available route!</p>
    }else{
        Route=
            <div className={"flex"}>
                <div className={"itemContainer"}>
                    <p className={"dataLabel"}>Length</p>
                    <p className={"data"}>{lengthInKm.toFixed(2)}km</p>
                </div>
                <div className={"itemContainer"}>
                    <p className={"dataLabel"}>Time</p>
                    <p className={"data"}>{(data.duration/minute).toFixed(2)}min</p>
                </div>
                <div className={"itemContainer"}>
                    <p className={"dataLabel"}>Cost</p>
                    <p className={"data"}>{cost.toFixed(2)}zl</p>
                </div>
                <div className={"itemContainer"}>
                    <p className={"dataLabel"}>Route takes (days)</p>
                    <p className={"data"}>{days}</p>
                </div>
            </div>
    }

    const addressA = props.props.data.addressA;
    const addressB = props.props.data.addressB;
    return(
        <div className={"wrapper"}>
            <div className={"titleContainer"}>
                <p className={"pointLeft"}>{addressA}</p>
                <p className={"arrow"}>➔</p>
                <p className={"pointRight"}>{addressB}</p>
            </div>
            {Route}
        </div>
    )
}

export default RouteInfo