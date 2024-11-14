import { getTrackInfoFromLastFM } from './last.fm/track_info.js';

export function displayTracks(items) {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';

    items.forEach((item, index) => {
        const template = document.getElementById('track-template');
        const itemElement = template.content.cloneNode(true);

        const trackNumber = document.createElement('p');
        trackNumber.innerText = `#${index + 1}`;
        itemElement.querySelector('.item-number').insertAdjacentElement('beforebegin', trackNumber);

        itemElement.querySelector('.track-name').innerText = item.name;
        itemElement.querySelector('.track-artists').innerText = `Artists: ${item.artists.map(artist => artist.name).join(', ')}`;
        itemElement.querySelector('.track-album').innerText = `Album: ${item.album.name}`;
        itemElement.querySelector('.track-image').src = item.album.images[0]?.url || '';
        itemElement.querySelector('.track-image').alt = item.name;

        const trackPreviewAudio = itemElement.querySelector('.track-preview-audio');
        if (trackPreviewAudio && item.preview_url) {
            const audioSource = trackPreviewAudio.querySelector('source');
            audioSource.src = item.preview_url;
            trackPreviewAudio.load();
            trackPreviewAudio.volume = 0.1;
        }

        let trackPlaycountElem = itemElement.querySelector('.track-playcount');
        let trackTotalListensElem = itemElement.querySelector('.track-total-listens');

        if (!trackPlaycountElem) {
            trackPlaycountElem = document.createElement('p');
            trackPlaycountElem.classList.add('track-playcount');
            itemElement.appendChild(trackPlaycountElem);
        }

        if (!trackTotalListensElem) {
            trackTotalListensElem = document.createElement('p');
            trackTotalListensElem.classList.add('track-total-listens');
            itemElement.appendChild(trackTotalListensElem);
        }

        const artistName = item.artists[0].name;
        const trackName = item.name;

        getTrackInfoFromLastFM(artistName, trackName).then(trackInfo => {
            if (trackInfo) {
                const totalListens = trackInfo.totalListens || 'N/A';  
                const playcount = trackInfo.playcount || 'N/A';

                item.totalListens = totalListens;
                item.playcount = playcount;

                trackPlaycountElem.innerText = `Playcount: ${playcount}`;
                trackTotalListensElem.innerText = `Minutes Listened: ${totalListens}`;
            }
        }).catch(error => {
            console.error('Error fetching track info:', error);
        });

        itemsList.appendChild(itemElement);
    });
}
