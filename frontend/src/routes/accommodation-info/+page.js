import axios from 'axios'
import { compile } from 'mdsvex';

const base = import.meta.env.VITE_API_URL
const path = "/accommodation-info"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let data = {}
    let content = null
    let error = null
    
    try {
        const res = await axios(base+path);    
        data = res.data.data.attributes
        content = await compile(data.content)
        data.content = content.code

    } catch (e) {
        error = e
    }
    return data;
}


    
    