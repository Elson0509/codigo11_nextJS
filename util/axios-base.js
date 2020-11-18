import axios from 'axios'
import https from 'https'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
        }
    )
})

export default instance