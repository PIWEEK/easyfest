import axios from 'axios'

const base = import.meta.env.VITE_API_URL
const path = "/public-profiles?filters[$or][0][is_guest][$eq]=true&filters[$or][1][is_speaker][$eq]=true&populate=*&sort[0]=order:asc"
const pathspeakerscontent = "/speakers"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let publicprofiles = []
    let speakerscontent = {}
    let error = null
    try {
        const res = await axios(base+path);    
        publicprofiles = res.data.data
        const res2 = await axios(base+pathspeakerscontent);    
        speakerscontent = res2.data.data.attributes

    } catch (e) {
        error = e
    }
    return {
        speakerscontent,
        publicprofiles
    };
} 