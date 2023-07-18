import axios from 'axios'

const base = import.meta.env.VITE_API_URL
const path = "/tracks?populate=*"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let tracks = []
    let result = []
    let error = null
    let x = null
    try {
        const res = await axios(base+path);    
        const d = res.data.data
        d.forEach((track) => {
            track = track.attributes
            tracks.push(track)
        })


//        faqs = d.group(faqOrdering);

    } catch (e) {
        error = e
    }
    return {
        tracks
    };
} 