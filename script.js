const findButton = document.getElementById("findButton");

const results = document.getElementById("results");


findButton.addEventListener("click", async function() {

    let location = document.getElementById("location").value;


    if (location === "") {

        results.innerHTML = "Please enter a location.";

        return;

    }


    results.innerHTML = "Finding environmental information...";



    let locationURL = "https://geocoding-api.open-meteo.com/v1/search?name="  + encodeURIComponent(location) + "&count=1&language=en&format=json";


    let locationResponse = await fetch(locationURL);

    let locationData = await locationResponse.json();


    if (!locationData.results) {

        results.innerHTML = "Location not found.";

        return;

    }


    let place = locationData.results[0];

    let latitude = place.latitude;

    let longitude = place.longitude;




    let weatherURL = "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=" + latitude + "&longitude=" + longitude + "&current=us_aqi,pm2_5,pm10";


    let weatherResponse = await fetch(weatherURL);

    let weatherData = await weatherResponse.json();




    let temperatureURL = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m";


    let temperatureResponse = await fetch(temperatureURL);

    let temperatureData = await temperatureResponse.json();




    let aqi = weatherData.current.us_aqi;





    let temperature = temperatureData.current.temperature_2m;

    let humidity = temperatureData.current.relative_humidity_2m;

    let wind = temperatureData.current.wind_speed_10m;


    results.innerHTML = "";


    results.innerHTML += "<h2>" + place.name + "</h2>";



    results.innerHTML += "<div class='risk'>" + "<h2>🌫️ Air Quality</h2>" + "<h1>AQI: " + aqi + "</h1>";


    if (aqi <= 50) {

        results.innerHTML += "<p>Risk: Low 🟢</p>" + "<p>Air quality is good.</p>";

    }

    else if (aqi <= 100) {

        results.innerHTML += "<p>Risk: Moderate 🟡</p>" + "<p>Air quality is acceptable, but some people may be affected.</p>";

    }

    else {

        results.innerHTML += "<p>Risk: High 🔴</p>" + "<p>Air pollution may be harmful to health.</p>";

    }


    results.innerHTML += "</div>";



    results.innerHTML += "<div class='risk'>" + "<h2>🔥 Wildfire Risk</h2>";


    if (temperature > 90 && humidity < 30 && wind > 20) {

        results.innerHTML += "<h3>High Risk 🔴</h3>" + "<p>Conditions are optimal for wildfire spread.</p>";

    }

    else if (temperature > 80 && humidity < 40) {

        results.innerHTML += "<h3>Moderate Risk 🟡</h3>" + "<p>Warm and dry conditions lead to wildfire risk.</p>";

    }

    else {

        results.innerHTML += "<h3>Low Risk 🟢</h3>" + "<p>Current weather conditions are not favorable for wildfires.</p>";

    }


    results.innerHTML += "</div>";




    results.innerHTML += "<div class='risk'>" + "<h2>🌊 Flood Risk</h2>";




    if (humidity > 90 && wind > 30) {

        results.innerHTML += "<h3>High Risk 🔴</h3>" + "<p>Very humid conditions and strong winds may occur during severe weather.</p>";

    }

    else if (humidity > 75) {

        results.innerHTML += "<h3>Moderate Risk 🟡</h3>" + "<p>High humidity may lead to wetter conditions.</p>";

    }

    else {

        results.innerHTML += "<h3>Low Risk 🟢</h3>" + "<p> Low flood risk in current conditions.</p>";

    }


    results.innerHTML += "</div>";

});