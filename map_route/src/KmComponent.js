import axios from "axios";
import {useState} from "react";
import "./KmComponent.css"

function KmComponent(props){
    const km = 1000, min=60, sumRate=1.1, maxCostPerDay=1000, maxLenPerDay=800
    const [data, setData]= useState({})
    const [state, setState] = useState(true)
    if(state){
        axios.get(`https://router.hereapi.com/v8/routes?transportMode=car&origin=${props.props.data.pointACoord}&destination=${props.props.data.pointBCoord}&return=summary&apiKey=ZqHI-mJG9L4fEibpuqHBlpvi2ju4FNxBGf-RNe-l1FM`)
            .then(res =>{
                setData({
                    length: res.data.routes[0].sections[0].summary.length,
                    duration: res.data.routes[0].sections[0].summary.duration,
                })
                setState(false)
            }).catch(e=>{
                console.log(e)
        })
    }
    let cost = (data.length/km)*props.props.rate*sumRate
    let lengthInKm = (data.length/km)
    let days;
    if(cost/maxCostPerDay > lengthInKm/maxLenPerDay){
        days = Math.ceil(cost/maxCostPerDay)
    }else{
        days = Math.ceil(lengthInKm/maxLenPerDay)
    }

    return(
        <div className={"wrapper"}>
            <div className={"title-container"}>
                <p className={"pointLeft"}>{props.props.data.addressA}</p>
                <p className={"arrow"}>➔</p>
                <p className={"pointRight"}>{props.props.data.addressB}</p>
            </div>
            <div className={"flex"}>
                <div className={"itemContainer"}>
                    <p className={"data-label"}>Length</p>
                    <p className={"data"}>{lengthInKm.toFixed(2)}km</p>
                </div>
                <div className={"itemContainer"}>
                    <p className={"data-label"}>Time</p>
                    <p className={"data"}>{(data.duration/min).toFixed(2)}min</p>
                </div>
                <div className={"itemContainer"}>
                    <p className={"data-label"}>Cost</p>
                    <p className={"data"}>{cost.toFixed(2)}zl</p>
                </div>
                <div className={"itemContainer"}>
                    <p className={"data-label"}>Route takes (days)</p>
                    <p className={"data"}>{days}</p>
                </div>
            </div>
        </div>
    )
}

export default KmComponent