import axios from 'axios'

const base = import.meta.env.VITE_API_URL

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let activity = {}
    let error = null
    try {
        const res = await axios(base+'/activities/'+params.slug);    
        activity = res.data.data.attributes

    } catch (e) {
        error = e
    }
    return {
        activity
    };
} 