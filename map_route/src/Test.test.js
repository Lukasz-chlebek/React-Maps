import {render, screen} from "@testing-library/react";
import MainPage from "./Components/MainPage/MainPage";
import {PrepareToGeocode} from "./Components/MainPage/MainPage";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CalculateCostAndDays} from "./Components/RouteInfo/RouteInfo";

test('Check MainPage screen if it has Route history', () => {
    render(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<MainPage/>} exact/>
            </Routes>
        </BrowserRouter>
    )
    expect(screen.getByText('Route history')).toBeInTheDocument()
})


test('Check PrepareToGeocode function 1', () => {
    const Addresses = {point_a:'Warszawa Zelazna 87', point_b:'Krakow Serkowskiego 9'}
    const result = PrepareToGeocode(Addresses)
    expect(result).toStrictEqual({
            addressAencoded: 'Warszawa%20Zelazna%2087',
            addressBencoded: 'Krakow%20Serkowskiego%209'
        }
    )
})
test('Check PrepareToGeocode function 2', () => {
    const Addresses = {point_a:'Rabka-Zdrój Poniatowskiego 10', point_b:'Krakow Dietla'}
    const result = PrepareToGeocode(Addresses)
    expect(result).toStrictEqual({
            addressAencoded: 'Rabka-Zdr%C3%B3j%20Poniatowskiego%2010',
            addressBencoded: 'Krakow%20Dietla'
        }
    )
})

test('Check CalculationCostAndDays Function 1', () => {
    const data = {
        duration: 798,
        length: 10485
    }
    const rate = 1

    const {cost, lengthInKm, days} = CalculateCostAndDays(data, rate)
    expect(lengthInKm).toBe(10.485)
    expect(cost).toBe(11.5335)
    expect(days).toBe(1)
})

test('Check CalculationCostAndDays Function 2', () => {
    const data = {
        duration: 21658,
        length: 594901
    }
    const rate = 2

    const {cost, lengthInKm, days} = CalculateCostAndDays(data, rate)
    expect(lengthInKm).toBe(594.901)
    expect(cost).toBe(1308.7822)
    expect(days).toBe(2)
})
