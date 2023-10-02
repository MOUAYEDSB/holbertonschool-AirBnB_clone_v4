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
