import axios from 'axios'

const base = import.meta.env.VITE_API_URL

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let faqs = []
    let result = []
    let error = null
    let x = null
    try {
        const res = await axios(base+'/faqs/');    
        const d = res.data.data
        d.forEach((faq) => {
            faq = faq.attributes
            faqs.push(faq)
        })


//        faqs = d.group(faqOrdering);

    } catch (e) {
        error = e
    }
    return {
        faqs
    };
} 