// api.js
const clientId = '3fa91b5fa3564c318b5b029d7e7a6bf4';
const redirectUri = 'http://localhost:5501/index.html';
const scopes = 'user-top-read';

// Function to initiate Spotify login
export function loginWithSpotify() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=token`;
    window.location.href = authUrl;
}

// Function to retrieve the access token from URL
export function getAccessTokenFromUrl() {
    const params = new URLSearchParams(window.location.hash.substring(1));
    return params.get('access_token');
}

// Function to fetch top items (artists or tracks)
export function fetchUserTopItems(callback) {
    const accessToken = getAccessTokenFromUrl();
    if (!accessToken) {
        document.getElementById('items-list').innerText = 'Access token not found in URL.';
        console.error("Access token not found in URL.");
        return;
    }

    const type = document.getElementById('item-type').value;
    const url = `https://api.spotify.com/v1/me/top/${type}?limit=20&time_range=long_term`;

    fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        callback(data.items, type); // Pass the data to callback
    })
    .catch(error => {
        document.getElementById('items-list').innerText = 'Error loading top items.';
        console.error("Error fetching top items:", error);
    });
}
