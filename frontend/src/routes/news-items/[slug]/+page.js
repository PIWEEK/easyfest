import axios from 'axios'

const base = import.meta.env.VITE_API_URL
const path = "/news-items/"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let news_item = {}
    let content = null
    let error = null
    try {
        const res = await axios(base+path+params.slug+'?populate=*');    
        news_item = res.data.data.attributes

    } catch (e) {
        error = e
    }
    return {
        news_item
    };
} 