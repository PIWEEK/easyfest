import axios from 'axios'

const base = import.meta.env.VITE_API_URL
const path = '/activities?populate=*'

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let activities = {}
    let error = null
    try {
        const res = await axios(base+path);    
        activities = res.data.data

    } catch (e) {
        error = e
    }
    return {
        activities
    };
} 