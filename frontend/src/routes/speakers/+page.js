import axios from 'axios'

const base = import.meta.env.VITE_API_URL
const path = "/public-profiles?populate=*"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let publicprofiles = {}
    let error = null
    try {
        const res = await axios(base+path);    
        publicprofiles = res.data.data

    } catch (e) {
        error = e
    }
    return {
        publicprofiles
    };
} 