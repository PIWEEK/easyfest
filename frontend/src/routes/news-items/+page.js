import axios from 'axios'

const base = import.meta.env.VITE_API_URL
const path = "/news-items?populate=*"


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    let news_items = []
    let result = []
    let error = null
    let x = null
    try {
        const res = await axios(base+path);    
        const d = res.data.data
        d.forEach((news_item) => {
            news_item = news_item.attributes
            news_items.push(news_item)
        })

    } catch (e) {
        error = e
    }
    return {news_items}
} 