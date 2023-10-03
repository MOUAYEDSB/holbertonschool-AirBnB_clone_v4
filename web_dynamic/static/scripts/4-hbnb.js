$(document).ready(function () {
	const amenities = {};
  
	$('input[type="checkbox"]').change(function () {
	  if ($(this).prop('checked')) {
		amenities[$(this).attr('data-id')] = $(this).attr('data-name');
	  } else {
		delete amenities[$(this).attr('data-id')];
	  }
	  let text = '';
	  for (const amenity in amenities) {
		text += amenities[amenity] + ', ';
	  }
	  text = text.slice(0, -2); // remove last comma and space
	  $('div.amenities h4').text(text);
	});
  });
  // static/scripts/2-hbnb.js

$(document).ready(function () {
    // Function to update the API status
    function updateAPIStatus() {
        // Make a GET request to the API status endpoint
        $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
            // Check if the status is "OK"
            if (data.status === 'OK') {
                // If status is "OK", add the class "available" to the div#api_status
                $('#api_status').addClass('available');
            } else {
                // If status is not "OK", remove the class "available" from the div#api_status
                $('#api_status').removeClass('available');
            }
        });
    }

    // Call the updateAPIStatus function initially to set the initial status
    updateAPIStatus();

    // Call the updateAPIStatus function every 5000 milliseconds (5 seconds) to update the status periodically
    setInterval(updateAPIStatus, 5000);
});

document.addEventListener('DOMContentLoaded', function () {
    // Get the section where places will be displayed
    const placesSection = document.querySelector('.places');

    // Make a POST request to the API endpoint
    fetch('http://0.0.0.0:5001/api/v1/places_search/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        // Loop through the result and create article tags representing places
        data.forEach(place => {
            const article = document.createElement('article');
            article.innerHTML = `
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="description">
                    ${place.description}
                </div>
            `;
            // Append the article to the places section
            placesSection.appendChild(article);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Get the button and all amenity checkboxes
    const searchButton = document.querySelector('button');
    const amenityCheckboxes = document.querySelectorAll('.amenity-checkbox');

    // Function to handle search button click
    function handleSearch() {
        // Create an array to store the checked amenity IDs
        const checkedAmenities = Array.from(amenityCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.getAttribute('data-id'));

        // Make a POST request to the API endpoint with the list of checked amenities
        fetch('http://0.0.0.0:5001/api/v1/places_search/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amenities: checkedAmenities })
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response data and create/place the articles in the .places section as needed
            // ...
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Attach click event listener to the search button
    searchButton.addEventListener('click', handleSearch);
});
