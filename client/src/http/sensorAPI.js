import {$authHost, $host} from "./index";


export const createSensor = async (address, latitude, longitude) => {
    const {data} = await $authHost.post('api/sensor', {address, latitude, longitude, status: true})
    return data
}

export const fetchSensors = async () => {
    const {data} = await $host.get('api/sensor')
    return data
}

export const updateSensor = async (address, latitude, longitude, id) => {
    const {data} = await $authHost.put('api/sensor', {address, latitude, longitude, id})
    return data
}

export const deleteSensor = async (id) => {
    const {data} = await $authHost.delete('api/sensor', { data: {id}})
    return data
}
