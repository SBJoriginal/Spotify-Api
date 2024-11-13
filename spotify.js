const clientId = '3fa91b5fa3564c318b5b029d7e7a6bf4';
const redirectUri = 'http://localhost:5500/index.html';
const scopes = 'user-top-read';

function loginWithSpotify() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=token`;
    window.location.href = authUrl;
}

function getAccessTokenFromUrl() {
    const params = new URLSearchParams(window.location.hash.substring(1));
    return params.get('access_token');
}

function fetchUserTopItems() {
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
        displayItems(data.items, type);
    })
    .catch(error => {
        document.getElementById('items-list').innerText = 'Error loading top items.';
        console.error("Error fetching top items:", error);
    });
}

function displayItems(items, type) {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';

    items.forEach(item => {
        const template = document.getElementById(type === 'artists' ? 'artist-template' : 'track-template');
        const itemElement = template.content.cloneNode(true);

        if (type === 'artists') {
            itemElement.querySelector('.artist-name').innerText = item.name;
            itemElement.querySelector('.artist-genres').innerText = `Genres: ${item.genres.join(', ')}`;
            itemElement.querySelector('.artist-followers').innerText = `Followers: ${item.followers.total.toLocaleString()}`;
            itemElement.querySelector('.artist-image').src = item.images[0]?.url || '';
            itemElement.querySelector('.artist-image').alt = item.name;
        } else if (type === 'tracks') {
            itemElement.querySelector('.track-name').innerText = item.name;
            itemElement.querySelector('.track-artists').innerText = `Artists: ${item.artists.map(artist => artist.name).join(', ')}`;
            itemElement.querySelector('.track-album').innerText = `Album: ${item.album.name}`;
            itemElement.querySelector('.track-image').src = item.album.images[0]?.url || '';
            itemElement.querySelector('.track-image').alt = item.name;
        }

        itemsList.appendChild(itemElement);
    });
}

document.getElementById('item-type').addEventListener('change', fetchUserTopItems);

function updateLoginButtonVisibility() {
    const accessToken = getAccessTokenFromUrl();
    const loginButton = document.getElementById('login-button');
    
    if (accessToken) {
        loginButton.style.display = 'none';
    } else {
        loginButton.style.display = 'inline-block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const accessToken = getAccessTokenFromUrl();
    
    if (!accessToken) {
        loginWithSpotify();
    } else {
        updateLoginButtonVisibility();
        fetchUserTopItems();
    }
});
