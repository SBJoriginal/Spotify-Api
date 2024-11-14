// track.js
export function displayTracks(items) {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';

    items.forEach(item => {
        const template = document.getElementById('track-template');
        const itemElement = template.content.cloneNode(true);

        itemElement.querySelector('.track-name').innerText = item.name;
        itemElement.querySelector('.track-artists').innerText = `Artists: ${item.artists.map(artist => artist.name).join(', ')}`;
        itemElement.querySelector('.track-album').innerText = `Album: ${item.album.name}`;
        itemElement.querySelector('.track-image').src = item.album.images[0]?.url || '';
        itemElement.querySelector('.track-image').alt = item.name;

        const trackPreviewLink = itemElement.querySelector('.track-preview-link');
        if (trackPreviewLink && item.preview_url) {
            trackPreviewLink.href = item.preview_url;
            trackPreviewLink.innerText = "Preview this track";
        }

        const trackPreviewAudio = itemElement.querySelector('.track-preview-audio');
        if (trackPreviewAudio && item.preview_url) {
            trackPreviewAudio.querySelector('source').src = item.preview_url;
            trackPreviewAudio.load();
        }

        itemsList.appendChild(itemElement);
    });
}
