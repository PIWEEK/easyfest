import axios from 'axios'

const base = import.meta.env.VITE_API_URL
const path = "/public-profiles/"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let publicprofile = {}
    let bio = ""
    let error = null
    try {
        const res = await axios(base+path+params.slug+'?populate=*');    
        publicprofile = res.data.data.attributes

    } catch (e) {
        error = e
    }
    return {
        publicprofile
    };
} 