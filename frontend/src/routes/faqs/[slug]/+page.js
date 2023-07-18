import axios from 'axios'

const base = import.meta.env.VITE_API_URL

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let faq = {}
    let error = null
    try {
        const res = await axios(base+'/faqs/'+params.slug);    
        faq = res.data.data.attributes

    } catch (e) {
        error = e
    }
    return {
        faq
    };
} 