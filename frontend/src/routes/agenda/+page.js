import axios from 'axios'

const base = import.meta.env.VITE_API_URL
const path = "/tracks?populate[activities][populate][0]=public_faces"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let tracks = []
    let track = null
    let result = []
    let error = null
    let x = null
    try {
        const res = await axios(base+path);    
        const d = res.data.data
        for (track of d){
            track = track.attributes
            tracks.push(track)
        }
        console.log(tracks)

    } catch (e) {
        error = e
    }
    return {
        tracks
    };
} 