import { loginWithSpotify, getAccessTokenFromUrl, fetchUserTopItems } from './api.js';
import { displayArtists } from './artist.js';
import { displayTracks } from './track.js';

// Function to display items based on the type (artists or tracks)
function displayItems(items, type) {
    if (type === 'artists') {
        const itemsWithNumbers = items.map((item, index) => {
            item.number = index + 1;
            return item;
        });
        displayArtists(itemsWithNumbers);  
    } else if (type === 'tracks') {
        const itemsWithNumbers = items.map((item, index) => {
            item.number = index + 1;
            return item;
        });
        displayTracks(itemsWithNumbers);  
    }
}

// Function to update login button visibility
function updateLoginButtonVisibility() {
    const accessToken = getAccessTokenFromUrl();
    const loginButton = document.getElementById('login-button');
    
    if (accessToken) {
        loginButton.style.display = 'none';
    } else {
        loginButton.style.display = 'inline-block';
    }
}

// Event listener for item-type change
document.getElementById('item-type').addEventListener('change', function() {
    fetchUserTopItems(displayItems);
});

// DOMContentLoaded event to initialize the app
document.addEventListener('DOMContentLoaded', function() {
    const accessToken = getAccessTokenFromUrl();
    
    if (!accessToken) {
        loginWithSpotify();
    } else {
        updateLoginButtonVisibility();
        fetchUserTopItems(displayItems);  
    }
});
