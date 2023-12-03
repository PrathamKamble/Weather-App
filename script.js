console.log(this);

const latitude = document.querySelector('.lat');
const longitude = document.querySelector('.long');

const gmap = document.querySelector('.gmap');
const locationName = document.querySelector('.loc');
const windSpeed = document.querySelector('.windSpeed');
const humidity = document.querySelector('.humidity');
const timeZone = document.querySelector('.timeZone');
const pressure = document.querySelector('.Pressure');
const windDirection = document.querySelector('.windDirc');
const uvIndex = document.querySelector('.uvIdx');
const feelsLike = document.querySelector('.Temp');
const fetchBtn = document.getElementById('fetchBtn');

const apiKey = "1e43862694e6e758ff1ddc5385dd612f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function getLocation(position) {
    await checkWeather(position.coords.latitude, position.coords.longitude);
    document.getElementById('landing-page').style.display = 'none';
};  
function failed() {
    alert('failed to get location');
    document.getElementById('data-page').style.display = 'none';
};

fetchBtn.addEventListener('click', async () => {
    navigator.geolocation.getCurrentPosition(getLocation, failed);
    document.getElementById('data-page').style.display = 'block';
});

async function checkWeather(lat, long) {
    const response = await fetch(apiUrl + `&lat=${lat}&lon=${long}&appid=${apiKey}`)
    
    let data = await response.json();
    console.log(data);

    gmap.src = `https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed`;
    
    latitude.innerHTML = `Lat : ${lat}`;

    longitude.innerHTML = `Long : ${long}`;

    locationName.innerHTML = `Location : ${data.name}`;
    
    windSpeed.innerHTML = `Wind Speed : ${data.wind.speed} Kmph`;
    
    humidity.innerHTML = `Humidity : ${data.main.humidity}`;
    
    timeZone.innerHTML = `Time Zone : GMT ${data.timezone}`;
    
    pressure.innerHTML = `Pressure : ${data.main.pressure} atm`;
    
    windDirection.innerHTML = `Wind Direction : ${data.wind.deg}`;
    
    uvIndex.innerHTML = `UV Index : ${data.main.temp}`;
    
    feelsLike.innerHTML = `Feels like : ${data.main.feels_like}°`;
}
