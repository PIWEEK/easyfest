import { fetchCollection } from '../../services/api';

export async function load({ params }) {
    let data = {}

    const trackEntries = await fetchCollection("/tracks?populate[activities][populate][public_faces][populate]=photo");
    let tracks = [];
    if (trackEntries) {
        tracks = trackEntries;
    }

    // Ensure correct ordering of tracks and activities
    tracks.sort((a, b) => a.attributes.order - b.attributes.order);
    for (let track of tracks) {
        track.attributes.activities.data.sort((a, b) => Date.parse(a.attributes.start) -
                                                        Date.parse(b.attributes.start));
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
        for (let activity of track.attributes.activities.data) {
            const day = get_day(days, tracks, activity);
            add_activity(day.tracks[i], activity);
        }
    }

    return days;
}

/**
 * Get the day for this activity. If not exists, add one and
 * include in it all the tracks with empty activity lists.
 * 
 * Initialize each track with the day start.
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

    set_day_start(day, tracks, activity);

    for (let [i, track] of tracks.entries()) {
        day.tracks.push({...track});
        day.tracks[i].attributes.activities.data = [];
        day.tracks[i].attributes.start = day.start;
        day.tracks[i].attributes.end = day.start;
    }

    days.push(day);
    return day;
}

/**
 * Get the start time of the first activity of one day.
 */
function set_day_start(day, tracks, activityOrig) {
    let day_start = null;
    for (let track of tracks) {
        for (let activity of track.attributes.activities.data) {
            const start = new Date(activity.attributes.start);
            if (day.year === start.getFullYear() &&
                day.month === start.getMonth() &&
                day.date === start.getDate()) {
                    if (!day_start || day_start.getTime() > start.getTime()) {
                        day_start = start;
                    }
                    continue;
                }
        }
    }
    if (day_start) {
        day.start = day_start;
    } else {
        day.start = new Date(activityOrig.attributes.start);
    }
}

/**
 * Add an activity to a track. Add a filler if there is some 
 * hole since the previous activity, and calculate track.start{}
 * and track.end values.
 * 
 * You need to call to this method in cronologic order.
 */
function add_activity(track, activity) {
    const start = new Date(activity.attributes.start);

    if (start.getTime() > track.attributes.end.getTime()) {
        track.attributes.activities.data.push({
            id: 0,
            attributes: {
                is_filler: true,
                start: track.attributes.end,
                minutes: (start.getTime() - track.attributes.end.getTime()) / 1000 / 60,
            }
        })
    }

    track.attributes.end = new Date(start.getTime() + activity.attributes.minutes * 60 * 1000);
    track.attributes.activities.data.push(activity);
}