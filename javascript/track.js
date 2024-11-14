export function displayTracks(items) {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = ''; // Clear previous items

    items.forEach((item, index) => {
        const template = document.getElementById('track-template');
        const itemElement = template.content.cloneNode(true);

        // Add the number above the track name
        const trackNumber = document.createElement('p');
        trackNumber.innerText = `#${index + 1}`; // Display the number (index + 1 for 1-based numbering)
        itemElement.querySelector('.track-name').insertAdjacentElement('beforebegin', trackNumber); // Insert the number before the track name

        // Set the rest of the track details
        itemElement.querySelector('.track-name').innerText = item.name;
        itemElement.querySelector('.track-artists').innerText = `Artists: ${item.artists.map(artist => artist.name).join(', ')}`;
        itemElement.querySelector('.track-album').innerText = `Album: ${item.album.name}`;
        itemElement.querySelector('.track-image').src = item.album.images[0]?.url || '';
        itemElement.querySelector('.track-image').alt = item.name;

        // Handle track preview link and audio if available
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
            
            // Set the volume to 30%
            trackPreviewAudio.volume = 0.3; // 0.3 is 30% of the max volume
        }

        // Set up Intersection Observer to play audio when it's in view
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Play the audio when it comes into view
                    const audioElement = entry.target;
                    audioElement.play();
                } else {
                    // Pause the audio when it leaves the view
                    const audioElement = entry.target;
                    audioElement.pause();
                    audioElement.currentTime = 0; // Reset to the beginning
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of the element is in view
        });

        // Start observing the track preview audio element
        const trackAudioElement = itemElement.querySelector('.track-preview-audio');
        observer.observe(trackAudioElement);

        // Append the item to the list
        itemsList.appendChild(itemElement);
    });
}
