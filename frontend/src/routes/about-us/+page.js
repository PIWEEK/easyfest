import axios from 'axios'
import { compile } from 'mdsvex';

const base = import.meta.env.VITE_API_URL
const path = "/about-us"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let aboutus = {}
    let content = null
    let error = null
    
    try {
        const res = await axios(base+path);    
        aboutus = res.data.data.attributes
        content = await compile(aboutus.content)
        aboutus.content = content.code

    } catch (e) {
        error = e
    }
    return aboutus;
}


    
    