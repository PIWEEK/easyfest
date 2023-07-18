import axios from 'axios'

import { setContext } from 'svelte';
import { writable } from 'svelte/store';

const base = import.meta.env.VITE_API_URL
const path = "/setting?populate=*"

   
let data = {}

export async function load({ params }) {
    let fetch_data = {}
    let error = null

    try {
        const res = await axios(base+path);    
        fetch_data = res.data.data.attributes

        data = fetch_data
        
    } catch (e) {
        error = e
    }

    return data;
}
