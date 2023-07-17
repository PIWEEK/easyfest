import axios from 'axios'

const base = import.meta.env.VITE_API_URL

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let publicprofile = {}
    let error = null
    try {
        const res = await axios(base+'/public-profiles/'+params.slug);    
        publicprofile = res.data.data.attributes
        console.log(publicprofile)

    } catch (e) {
        error = e
    }
    return {
        publicprofile
    };
} 