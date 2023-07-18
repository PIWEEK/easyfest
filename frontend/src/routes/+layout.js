import axios from 'axios'

import { setContext } from 'svelte';
import { writable } from 'svelte/store';

const base = import.meta.env.VITE_API_URL
const path = "/setting?populate=*"
const path_site = "/site"

   
let data = {}

export async function load({ params }) {
    let fetch_settings_data = {}
    let fetch_site_data = {}
    let error = null

    try {
        const res = await axios(base+path);    
        fetch_settings_data = res.data.data.attributes

        const res_site = await axios(base+path_site);
        fetch_site_data = res_site.data.data.attributes

        data = {...fetch_site_data, ...fetch_settings_data}
        
    } catch (e) {
        error = e
    }

    return data;
}
