import "./MainPage.css"
import { useState} from "react";
import {Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";
import TileHistory from "./TileHistory";
import {DataHistory} from "./DataHistory";

function MainPage(){
    const [clicked, setClicked]= useState(false)
    let Coordinates = {
        addressA:'',
        addressB:'',
        pointACoord: '',
        pointBCoord: '',
        idA:'',
        idB:''
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (Dataset) => {
        //replace " " with +
        Dataset.point_a = Dataset.point_a.replace(/\s+/g, '+');
        Dataset.point_b = Dataset.point_b.replace(/\s+/g, '+');
        //urls
        let origin = `https://geocode.search.hereapi.com/v1/geocode?q=${Dataset.point_a}&apiKey=ZqHI-mJG9L4fEibpuqHBlpvi2ju4FNxBGf-RNe-l1FM`
        let destination = `https://geocode.search.hereapi.com/v1/geocode?q=${Dataset.point_b}&apiKey=ZqHI-mJG9L4fEibpuqHBlpvi2ju4FNxBGf-RNe-l1FM`
         axios.all([origin, destination].map(async (urls)=> await axios.get(urls)))
            .then(axios.spread((...responses) =>{
                Coordinates.idA=responses[0].data.items[0].id
                Coordinates.idB=responses[1].data.items[0].id
                Coordinates.addressA=responses[0].data.items[0].title
                Coordinates.addressB=responses[1].data.items[0].title
                Coordinates.pointACoord=responses[0].data.items[0].position.lat+","+responses[0].data.items[0].position.lng
                Coordinates.pointBCoord=responses[1].data.items[0].position.lat+","+responses[1].data.items[0].position.lng
                DataHistory.push(Coordinates)
                setClicked(true)
            })).catch(err=>{
                console.log(err)
         })


    }
    let button;
    if(DataHistory.length!==0 && clicked){
        button= <Link to={"Map"} state={{idOfTile:DataHistory[DataHistory.length-1].idA+DataHistory[DataHistory.length-1].idB}}>
                    <input type="submit" className={"button"} value={"Find route"}/>
                </Link>
    }else{
        button=<input type="submit" className={"button"} value={"Find route"}/>
    }
    return (
        <div className={"mainContainer"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder={"Point A"} {...register('point_a', { required: true })}  className={"input"}/>
                {errors.point_a && <p className={"alert"}>Point A is required</p>}
                <input placeholder={"Point B"} {...register('point_b', { required: true })}  className={"input"}/>
                {errors.point_b && <p className={"alert point-b"}>Point B is required</p>}
                {button}
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