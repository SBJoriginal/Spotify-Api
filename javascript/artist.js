import { getArtistInfoFromLastFM } from './last.fm/artist_info.js';

export function displayArtists(items) {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';

    items.forEach((item, index) => {
        const template = document.getElementById('artist-template');
        const itemElement = template.content.cloneNode(true);

        const artistNumber = document.createElement('p');
        artistNumber.innerText = `#${index + 1}`;
        itemElement.querySelector('.item-number').insertAdjacentElement('beforebegin', artistNumber);

        itemElement.querySelector('.artist-name').innerText = item.name;
        itemElement.querySelector('.artist-genres').innerText = `Genres: ${item.genres.join(', ')}`;
        itemElement.querySelector('.artist-followers').innerText = `Followers: ${item.followers.total.toLocaleString()}`;
        itemElement.querySelector('.artist-image').src = item.images[0]?.url || '';
        itemElement.querySelector('.artist-image').alt = item.name;

        const artistLink = itemElement.querySelector('.artist-link');
        if (artistLink) {
            artistLink.href = item.external_urls.spotify;
        }

        let artistPlaycountElem = itemElement.querySelector('.artist-playcount');
        if (!artistPlaycountElem) {
            artistPlaycountElem = document.createElement('p');
            artistPlaycountElem.classList.add('artist-playcount');
            itemElement.appendChild(artistPlaycountElem);
        }

        const artistName = item.name;

        getArtistInfoFromLastFM(artistName).then(artistInfo => {
            if (artistInfo) {
                const playcount = artistInfo.playcount || 'N/A';
                item.playcount = playcount;
                artistPlaycountElem.innerText = `Playcount: ${playcount.toLocaleString()}`;
            }
        }).catch(error => {
            console.error('Error fetching artist info:', error);
        });

        itemsList.appendChild(itemElement);
    });
}
