import axios from 'axios'

const base = import.meta.env.VITE_API_URL
const pathorgteamcontent = "/org-team"
const path = "/public-profiles?filters[is_org][$eq]=true&populate=*&sort[0]=order:asc"


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let orgprofiles = []
    let orgcontent = {}
    let error = null
    try {
        const res = await axios(base+path);    
        orgprofiles = res.data.data
        const res2 = await axios(base+pathorgteamcontent);    
        orgcontent = res2.data.data.attributes

    } catch (e) {
        error = e
    }
    return {
        orgcontent,
        orgprofiles
    };
}


    
    