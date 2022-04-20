import "./MainPage.css"
import { useForm } from 'react-hook-form';
import { useState} from "react";
import axios from "axios";
function MainPage(){
    const [pointA, setPointA] = useState()
    const [pointB, setPointB] = useState()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        data.point_a = data.point_a.replace(/\s+/g, '+');
        data.point_b = data.point_b.replace(/\s+/g, '+');

        let axiosPointA = `https://geocode.search.hereapi.com/v1/geocode?q=${data.point_a}&apiKey=ZqHI-mJG9L4fEibpuqHBlpvi2ju4FNxBGf-RNe-l1FM`
        let axiosPointB = `https://geocode.search.hereapi.com/v1/geocode?q=${data.point_b}&apiKey=ZqHI-mJG9L4fEibpuqHBlpvi2ju4FNxBGf-RNe-l1FM`
        axios.all([axiosPointA, axiosPointB].map((urls)=> axios.get(urls)))
            .then(axios.spread((...responses) =>{
                setPointA(responses[0])
                setPointB(responses[1])
            }))
            .catch(err=>{
                console.log(err)
            })
    }

    console.log(pointA)
    console.log(pointB)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder={"Punkt A"} {...register('point_a', { required: true })}  />
            {errors.point_a && <p>Last name is required.</p>}
            <input placeholder={"Punkt B"} {...register('point_b', { required: true })}  />
            {errors.point_b && <p>Last name is required.</p>}
            <input type="submit" />


        </form>
    )
}
export default MainPage