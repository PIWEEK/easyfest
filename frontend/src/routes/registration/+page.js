import axios from 'axios'

import { setContext } from 'svelte';
import { writable } from 'svelte/store';

const base = import.meta.env.VITE_API_URL
const path = "/site"
   
let data = {}

export async function load({ params }) {
    let fetch_site_data = {}
    let error = null

    try {
         const res_site = await axios(base+path);
        fetch_site_data = res_site.data.data.attributes

       
    } catch (e) {
        error = e
    }

    return fetch_site_data;
}
