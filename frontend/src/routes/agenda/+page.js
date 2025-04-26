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
            (startDate(a).getTime() + (a.is_filler ? 0 : 1)) -
            (startDate(b).getTime() + (b.is_filler ? 0 : 1))
        );
    }

    const days = pack_activities(tracks);
    return {
        days
    };
} 

/**
 * Get the date and time of activity start.
 */
function startDate(activity) {
    return new Date(activity.start);
}

/**
 * Get the date and time of activity end.
 */
function endDate(activity) {
    return new Date(startDate(activity).getTime() + activity.minutes * 60 * 1000);
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

            // Get the tracks with only the activities of the current day.
            const dayTracks = tracks.map(dayTrack => {
                return {
                    ...dayTrack,
                    activities: activitiesOfDay(dayTrack, day.start),
                }
            });

            add_activity(day.tracks[i], activity, dayTracks);
        }
    }

    return days;
}

/**
 * Get all activities in the track in the same day
 * of the given date.
 */
function activitiesOfDay(track, date) {
    return track.activities.filter(
        a => startDate(a).getDate() === date.getDate()
    )
}

/**
 * Get the day for this activity. If not exists, add one and
 * include in it all the tracks with empty activity lists.
 * 
 * Initialize each track with the day start.
 */
function get_day(days, tracks, activity) {
    const start = startDate(activity);
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
            const start = startDate(activity);
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
        day.start = startDate(activityOrig);
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
    const start = startDate(activity);

    // Add a filler activity between the end of the last activity
    // and the start of this one.
    const fillerDuration = (start.getTime() - track.end.getTime());
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
