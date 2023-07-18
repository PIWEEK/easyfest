import axios from 'axios'
import { compile } from 'mdsvex';

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
        bio = await compile(publicprofile.bio)
        publicprofile.bio = bio.code

    } catch (e) {
        error = e
    }
    return {
        publicprofile
    };
} 