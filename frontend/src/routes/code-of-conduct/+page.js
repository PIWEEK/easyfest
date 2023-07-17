import axios from 'axios'
import { compile } from 'mdsvex';

const base = import.meta.env.VITE_API_URL

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let codeofconduct = {}
    let content = null
    let error = null

    try {
        const res = await axios(base+'/code-of-conduct');    
        codeofconduct = res.data.data.attributes
        content = await compile(codeofconduct.content)
       
    } catch (e) {
        error = e
    }
    return {
        title: codeofconduct.title,
        content: content
    };
}
    