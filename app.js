document.addEventListener('DOMContentLoaded', function () {
    fetchCafesAndPlaces();
});

let cafeList = [];

function fetchCafesAndPlaces() {
    fetch('https://api.example.com/cafes')
        .then(response => response.json())
        .then(cafes => {
            fetch('https://api.example.com/places')
                .then(response => response.json())
                .then(places => {
                    cafeList = combineCafesAndPlaces(cafes, places);
                    displayCafes(cafeList);
                });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function combineCafesAndPlaces(cafes, places) {
    return cafes.map(cafe => {
        const place = places.find(place => place.id === cafe.placeId);
        return { ...cafe, location: place ? place.name : 'Unknown' };
    });
}

function displayCafes(cafeList) {
    const cafeTable = document.getElementById('cafeList');
    cafeTable.innerHTML = '';

    cafeList.forEach(cafe => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${cafe.name}</td><td>${cafe.location}</td>`;
        cafeTable.appendChild(row);
    });
}

function searchCafes() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    const filteredCafes = cafeList.filter(cafe => cafe.name.toLowerCase().includes(searchTerm));
    displayCafes(filteredCafes);
}
