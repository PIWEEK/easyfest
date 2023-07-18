import axios from 'axios'

const base = import.meta.env.VITE_API_URL
const path = "/groups?populate[tracks][populate][activities][populate][0]=public_faces"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let groups = []
    let group = null
    let result = []
    let error = null
    let x = null
    try {
        const res = await axios(base+path);    
        const d = res.data.data
        for (group of d){
            group = group.attributes
            groups.push(group)
        }
        console.log(groups)

    } catch (e) {
        error = e
    }
    return {
        groups
    };
} 