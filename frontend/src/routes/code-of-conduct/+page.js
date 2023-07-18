import axios from 'axios'
import { compile } from 'mdsvex';

const base = import.meta.env.VITE_API_URL
const path = "/code-of-conduct"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let codeofconduct = {}
    let content = null
    let error = null

    try {
        const res = await axios(base+path);    
        codeofconduct = res.data.data.attributes
        content = await compile(codeofconduct.content)
        codeofconduct.content = content.code
       
    } catch (e) {
        error = e
    }
    return codeofconduct;
}
    