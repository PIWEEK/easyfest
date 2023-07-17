import axios from 'axios'
import { compile } from 'mdsvex';

const base = import.meta.env.VITE_API_URL

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let aboutus = {}
    let content = null
    let error = null
    try {
        const res = await axios(base+'/about-us');    
        aboutus = res.data.data.attributes
        content = await compile(aboutus.content)


    } catch (e) {
        error = e
    }
    return {
        title: aboutus.title,
        content: content
    };
}


    
    