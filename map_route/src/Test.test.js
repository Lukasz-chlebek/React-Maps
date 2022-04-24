import {PrepareToGeocode} from "./Components/MainPage/MainPage";
import {CalculateCostAndDays} from "./Components/RouteInfo/RouteInfo";

describe('Check PrepareToGeocode function',()=>{
    test('First case', () => {
        const Addresses = {point_a:'Warszawa Zelazna 87', point_b:'Krakow Serkowskiego 9'}
        const result = PrepareToGeocode(Addresses)
        expect(result).toStrictEqual({
                addressAencoded: 'Warszawa%20Zelazna%2087',
                addressBencoded: 'Krakow%20Serkowskiego%209'
            }
        )
    })
    test('Second case', () => {
        const Addresses = {point_a:'Rabka-Zdrój Poniatowskiego 10', point_b:'Krakow Dietla'}
        const result = PrepareToGeocode(Addresses)
        expect(result).toStrictEqual({
                addressAencoded: 'Rabka-Zdr%C3%B3j%20Poniatowskiego%2010',
                addressBencoded: 'Krakow%20Dietla'
            }
        )
    })
})

describe('Check CalculationCostAndDays Function',()=>{
    test('First case', () => {
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

    test('Second case', () => {
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
})


