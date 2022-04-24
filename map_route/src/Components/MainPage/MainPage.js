import "./MainPage.css"
import { useForm } from 'react-hook-form';
import axios from "axios";
import TileHistory from "../TileHistory/TileHistory";
import {DataHistory} from "../../Datas/DataHistory";
import { useNavigate } from 'react-router-dom';

export function PrepareToGeocode(addresses) {
    const addressAencoded = encodeURIComponent(addresses.point_a)
    const addressBencoded = encodeURIComponent(addresses.point_b)
    return {addressAencoded, addressBencoded};
}

function MainPage(){
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = (formInputs) => {
        const {addressAencoded, addressBencoded} = PrepareToGeocode(formInputs);
        const origin = `https://geocode.search.hereapi.com/v1/geocode?q=${addressAencoded}&apiKey=ZqHI-mJG9L4fEibpuqHBlpvi2ju4FNxBGf-RNe-l1FM`
        const destination = `https://geocode.search.hereapi.com/v1/geocode?q=${addressBencoded}&apiKey=ZqHI-mJG9L4fEibpuqHBlpvi2ju4FNxBGf-RNe-l1FM`
         axios.all([origin, destination].map(async (urls)=> await axios.get(urls)))
            .then(axios.spread((...responses) =>{
                DataHistory.push({
                    addressA:responses[0].data.items[0].title,
                    addressB:responses[1].data.items[0].title,
                    pointACoord: responses[0].data.items[0].position.lat+","+responses[0].data.items[0].position.lng,
                    pointBCoord: responses[1].data.items[0].position.lat+","+responses[1].data.items[0].position.lng,
                    idA:responses[0].data.items[0].id,
                    idB:responses[1].data.items[0].id
                })
                const lastSearched = DataHistory[DataHistory.length-1].idA+DataHistory[DataHistory.length-1].idB;
                navigate("Map",{state:{idOfTile: lastSearched}})
            })).catch(err=>{
                console.log(err)
         })


    }
    return (
        <div className={"mainContainer"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder={"Point A"} {...register('point_a', { required: true })}  className={"input"}/>
                {errors.point_a && <p className={"alert"}>Point A is required</p>}
                <input placeholder={"Point B"} {...register('point_b', { required: true })}  className={"input"}/>
                {errors.point_b && <p className={"alert pointB"}>Point B is required</p>}
                <input type="submit" className={"button"} value={"Find route"}/>
            </form>
            <p className={"title"}>Route history</p>
            {
                DataHistory.map(tile =>{
                    return <TileHistory key={tile.idA + tile.idB} props={tile} />
                })
            }
        </div>
    )
}
export default MainPage