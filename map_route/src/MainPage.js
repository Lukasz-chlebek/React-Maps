import "./MainPage.css"
import { useForm } from 'react-hook-form';
import { useState} from "react";
import axios from "axios";
import Map from "./Map"
import { Link } from 'react-router-dom';
import MapPage from "./MapPage";

function MainPage(){
    const [pointA, setPointA] = useState()
    const [pointB, setPointB] = useState()
    const [clicked, setClicked]= useState(false)
    const [Coords, setCoords]=useState({})
    let Coordinates = {
        pointACoord: '49.60982,19.95269',
        pointBCoord: '54.35311,18.65105'
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

                setPointA(responses[0])
                setPointB(responses[1])
                Coordinates.pointACoord=pointA.data.items[0].position.lat+","+pointA.data.items[0].position.lng
                Coordinates.pointBCoord=pointB.data.items[0].position.lat+","+pointB.data.items[0].position.lng
                setCoords(Coordinates)
                setClicked(true)
            }))
            .catch(err=>{
                console.log(err)
            })
    }
    let map;
    if(clicked){
        map = <Map coord={Coords} />
    }else{
        map =<div/>
    }
    console.log(Coords)
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder={"Punkt A"} {...register('point_a', { required: true })}  />
                {errors.point_a && <p>Last name is required.</p>}
                <input placeholder={"Punkt B"} {...register('point_b', { required: true })}  />
                {errors.point_b && <p>Last name is required.</p>}
                <input type="submit" />
            </form>
            <div>
                {map}
            </div>

        </div>

    )
}
export default MainPage