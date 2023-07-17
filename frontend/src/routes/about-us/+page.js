import axios from 'axios'

const base = import.meta.env.VITE_API_URL

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let aboutus = {}
    let error = null
    try {
        const res = await axios(base+'/about-us');    
        aboutus = res.data.data.attributes

    } catch (e) {
        error = e
    }
    return {
        aboutus
    };
}


    
    