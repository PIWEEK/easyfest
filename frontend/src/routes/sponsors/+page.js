import axios from 'axios'

const base = import.meta.env.VITE_API_URL
const path = "/sponsors?populate=*"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let sponsors = []
    let result = []
    let error = null
    let x = null
    try {
        const res = await axios(base+path);    
        const d = res.data.data
        d.forEach((sponsor) => {
            sponsor = sponsor.attributes
            sponsors.push(sponsor)
        })


//        faqs = d.group(faqOrdering);

    } catch (e) {
        error = e
    }
    return {
        sponsors
    };
} 