import axios from 'axios'

const base = import.meta.env.VITE_API_URL
const path = "/tracks/"


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let track = {}
    let error = null
    try {
        const res = await axios(base+path+params.slug+'?populate=*');    
        track = res.data.data.attributes

    } catch (e) {
        error = e
    }
    return {
        track
    };
} 