import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

interface ApiResponse {
    success: boolean,
    data: number[]
}

// fetch list length from DB
export default async function getCurrentIpoCount() {
    const ipos = await axios.get(`${process.env.WEBSERVICE_API_URL}/api/v1/ipo/count`)
    const res: ApiResponse = ipos.data
    
    if (res.success) {
        return res.data[0]
    }

    return -1
}