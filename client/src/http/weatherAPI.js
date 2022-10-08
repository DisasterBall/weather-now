import {$host} from "./index";

export const fetchWeathers = async () => {
    const {data} = await $host.get('api/weather')
    return data
}
