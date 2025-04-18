import { fetchCollection } from '../../services/api';

export async function load({ params }) {
    let data = {}

    const trackEntries = await fetchCollection("/tracks?populate[activities][populate][public_faces][populate]=photo&sort=order:asc");
    let tracks = [];
    if (trackEntries) {
        tracks = trackEntries;
    }

    // Add filler activities for is_across_tracks
    for (let track of tracks) {
        for (let activity of track.activities) {
            if (activity.is_across_tracks) {
                for (let track2 of tracks) {
                    if (track2.id !== track.id) {
                        track2.activities.push({
                            ...activity,
                            is_across_tracks: false,
                            is_filler: true,
                        });
                    }
                }
            }
        }
    }

    // Ensure correct ordering of activities
    for (let track of tracks) {
        track.activities.sort((a, b) =>
             Date.parse(a.start) - Date.parse(b.start)
        );
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
        for (let activity of track.activities) {
            const day = get_day(days, tracks, activity);

            // Get the activities of the same day as the current one,
            // in all the tracks.
            const dayTracks = tracks.map(dayTrack => {
                return {
                    ...dayTrack,
                    activities: dayTrack.activities.filter(
                        a => new Date(a.start).getDay() === day.start.getDay()
                    )
                }
            });

            add_activity(day.tracks[i], activity, dayTracks);
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
    const start = new Date(activity.start);
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
        day.tracks[i].activities = [];
        day.tracks[i].start = day.start;
        day.tracks[i].end = day.start;
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
        for (let activity of track.activities) {
            const start = new Date(activity.start);
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
        day.start = new Date(activityOrig.start);
    }
}

/**
 * Add an activity to a track. Add a filler if there is some 
 * hole since the previous activity, and calculate track.start{}
 * and track.end values.
 * 
 * You need to call to this method in cronologic order.
 */
function add_activity(track, activity, dayTracks) {
    const start = new Date(activity.start);

    // If there is some hole with no activity in none of the tracks,
    // remove the space in the grid.
    let remove = 0;
    const nextActivities = dayTracks.map(
        dayTrack => dayTrack.activities.find(a => new Date(a.start) >= track.end)
    ).filter(a => (a !== undefined));
    const minStart = new Date(Math.min(...nextActivities.map(a => new Date(a.start))));
    if (minStart > track.end) {
        remove = minStart.getTime() - track.end.getTime();
    }

    // Add a filler activity between the end of the last activity
    // (minus the removed hole) and the start of this one.
    const fillerDuration = (start.getTime() - track.end.getTime()) - remove;
    if (fillerDuration > 0) {
        track.activities.push({
            id: 0,
            is_filler: true,
            start: track.end,
            minutes: fillerDuration / 1000 / 60,
        })
    }

    track.end = new Date(start.getTime() + activity.minutes * 60 * 1000);
    track.activities.push(activity);
}