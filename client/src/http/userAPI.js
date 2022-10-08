import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (username, email, password) => {
    const {data} = await $host.post('api/user/registration', {username, email, password, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchUsers = async () => {
    const {data} = await $authHost.get('api/user')
    return data
}

export const updateUsers = async (username, email, role, id) => {
    const {data} = await $authHost.put('api/user',{username, email, role, id})
    return data
}

export const deleteUsers = async (id) => {
    const {data} = await $authHost.delete('api/user', { data: {id}})
    return data
}

export const createUsers = async (username, email, password, role) => {
    const {data} = await $authHost.post('api/user/registration', {username, email, password, role})
    return data
}