import axios from 'axios'
import { compile } from 'mdsvex';

const base = import.meta.env.VITE_API_URL
const path = '/activities/'

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let activity = {}
    let content = null
    let error = null
    try {
        const res = await axios(base+path+params.slug+'?populate=*');    
        activity = res.data.data.attributes
        content = await compile(activity.long_description)
        activity.long_description = content.code

    } catch (e) {
        error = e
    }
    return {
        activity
    };
} 