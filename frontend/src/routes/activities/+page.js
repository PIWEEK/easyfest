import axios from 'axios'

const base = import.meta.env.VITE_API_URL

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let activities = {}
    let error = null
    try {
        const res = await axios(base+'/activities/');    
        activities = res.data.data

    } catch (e) {
        error = e
    }
    return {
        activities
    };
} 