import axios from "axios";
import {useState} from "react";
import "./KmComponent.css"

function KmComponent(props){
    const Km = 1000, min=60, sumRate=1.1
    const [data, setData]= useState({})
    const [state, setState] = useState(true)
    if(state){
        axios.get(`https://router.hereapi.com/v8/routes?transportMode=car&origin=${props.props.data.pointACoord}&destination=${props.props.data.pointBCoord}&return=summary&apiKey=ZqHI-mJG9L4fEibpuqHBlpvi2ju4FNxBGf-RNe-l1FM`)
            .then(res =>{
                console.log(res)
                setData({
                    length: res.data.routes[0].sections[0].summary.length,
                    duration: res.data.routes[0].sections[0].summary.duration,
                })
                setState(false)
            }).catch(e=>{
                console.log(e)
        })
    }
    let cost = (data.length/Km)*props.props.rate*sumRate
    let lengthInKm = (data.length/Km)
    let days;
    if(cost/1000 > lengthInKm/800){
        days = Math.ceil(cost/1000)
    }else{
        days = Math.ceil(lengthInKm/800)
    }

    return(
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
    )
}

export default KmComponent