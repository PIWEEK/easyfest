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

    } catch (e) {
        error = e
    }
    const days = pack_activities(tracks);
    return {
        days
    };
} 

/**
 * Separate activities in days. Return an array of days,
 * having each one a list of tracks with only the activities
 * of this day.
 */
function pack_activities(tracks) {
    const days = [];

    for (let [i, track] of tracks.entries()) {
        for (let activity of track.activities.data) {
            const day = get_day(days, tracks, activity);
            day.tracks[i].activities.push(activity);
        }
    }

    return days;
}

/**
 * Get the day for this activity. If not exists, add one and
 * include in it all the tracks with empty activity lists.
 */
function get_day(days, tracks, activity) {
    const start = new Date(activity.attributes.start);
    for (let day of days) {
        if (day.year === start.getFullYear() &&
            day.month === start.getMonth() &&
            day.date === start.getDate()) {
            return day;
        }
    }
    const day = {
        year: start.getFullYear(),
        month: start.getMonth(),
        date: start.getDate(),
        tracks: [],
    }
    for (let [i, track] of tracks.entries()) {
        day.tracks.push({...track});
        day.tracks[i].activities = [];
    }
    days.push(day);
    return day;
}