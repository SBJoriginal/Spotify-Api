export function displayArtists(items) {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';

    items.forEach(item => {
        const template = document.getElementById('artist-template');
        const itemElement = template.content.cloneNode(true);

        // Add the number above the artist name
        const artistNumber = document.createElement('p');
        artistNumber.innerText = `#${item.number}`; // Display the number
        itemElement.querySelector('.artist-name').insertAdjacentElement('beforebegin', artistNumber);

        itemElement.querySelector('.artist-name').innerText = item.name;
        itemElement.querySelector('.artist-genres').innerText = `Genres: ${item.genres.join(', ')}`;
        itemElement.querySelector('.artist-followers').innerText = `Followers: ${item.followers.total.toLocaleString()}`;
        itemElement.querySelector('.artist-image').src = item.images[0]?.url || '';
        itemElement.querySelector('.artist-image').alt = item.name;
        
        const artistLink = itemElement.querySelector('.artist-link');
        if (artistLink) {
            artistLink.href = item.external_urls.spotify;
        }

        itemsList.appendChild(itemElement);
    });
}
