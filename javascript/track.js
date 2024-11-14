export function displayTracks(items) {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';

    items.forEach((item, index) => {
        const template = document.getElementById('track-template');
        const itemElement = template.content.cloneNode(true);

        const trackNumber = document.createElement('p');
        trackNumber.innerText = `#${index + 1}`;
        itemElement.querySelector('.track-name').insertAdjacentElement('beforebegin', trackNumber);

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
            const audioSource = trackPreviewAudio.querySelector('source');
            audioSource.src = item.preview_url;
            trackPreviewAudio.load();
            trackPreviewAudio.volume = 0.1;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const audioElement = entry.target;
                if (entry.isIntersecting) {
                    audioElement.play();
                } else {
                    audioElement.pause();
                    audioElement.currentTime = 0;
                }
            });
        }, {
            threshold: 0.5
        });

        const trackAudioElement = itemElement.querySelector('.track-preview-audio');
        observer.observe(trackAudioElement);

        itemsList.appendChild(itemElement);
    });
}
