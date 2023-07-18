import axios from 'axios'

const base = import.meta.env.VITE_API_URL
const path = "/streaming"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let data = {}
    let content = null
    let error = null
    
    try {
        const res = await axios(base+path);    
        data = res.data.data.attributes

    } catch (e) {
        error = e
    }
    return data;
}


    
    