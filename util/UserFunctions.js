import axios from './axios-base'
import jwt_decode from 'jwt-decode'

export const getUser = (id, token) => {
    return axios.get(`/user/${id}`, {
        params:{
            token
        }
        })
        .then(response => {
            return response
        })
        .catch(err => {
            return err
        })
}

export const userId = () => {
    const token = localStorage.userToken
    if(!!token){
        const decoded = jwt_decode(token)
        if(!!decoded)
            return decoded.uid
    }
}

export const imgUrl = (userId) => {
    return `${process.env.REACT_APP_BACKEND_URL}/profiles/user${userId}.jpg`
}