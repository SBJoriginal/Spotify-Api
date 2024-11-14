import { LASTFM } from '../config.js';

export async function getTrackInfoFromLastFM(artist, track) {
    const url = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${LASTFM.API_KEY}&artist=${artist}&track=${track}&username=${LASTFM.USERNAME}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.track) {
            const duration = data.track.duration;
            const playcount = data.track.userplaycount;
            const totalListens = (duration / 1000) * playcount;

            return { totalListens, playcount };
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}
