import { SPOTIFY } from './config.js';

export function loginWithSpotify() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY.CLIENT_ID}&redirect_uri=${encodeURIComponent(SPOTIFY.REDIRECT_URI)}&scope=${encodeURIComponent(SPOTIFY.SCOPES)}&response_type=token`;
    window.location.href = authUrl;
}

export function getAccessTokenFromUrl() {
    const params = new URLSearchParams(window.location.hash.substring(1));
    return params.get('access_token');
}

export function fetchUserTopItems(callback) {
    const accessToken = getAccessTokenFromUrl();
    if (!accessToken) {
        document.getElementById('items-list').innerText = 'Access token not found in URL.';
        return;
    }

    const type = document.getElementById('item-type').value;
    const url = `https://api.spotify.com/v1/me/top/${type}?limit=5&time_range=long_term`;

    fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        callback(data.items, type);
    })
    .catch(error => {
        document.getElementById('items-list').innerText = 'Error loading top items.';
    });
}
