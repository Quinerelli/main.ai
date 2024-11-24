const apiKey = "2db642c78c25a87f6fba2610e768c1ce";

function getCurrentWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log("Odpowiedź dla current:", data);
            displayCurrentWeather(data);
        } else {
            console.log("Błąd pobierania current:", xhr.statusText);
            document.getElementById("weatherResult").innerHTML = "Nie udało się pobrać danych o bieżącej pogodzie.";
        }
    };

    xhr.send();
}

function displayCurrentWeather(data) {
    const weatherContainer = document.getElementById("weatherResult");
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    weatherContainer.innerHTML = `
        <h3>Bieżąca pogoda w ${data.name}</h3>
        <div class="weather-info">
            <img src="${iconUrl}" alt="Ikona pogody">
            <div>
                <p>Temperatura: ${temperature}°C</p>
                <p>Opis: ${description}</p>
                <p>Wilgotność: ${humidity}%</p>
                <p>Prędkość wiatru: ${windSpeed} m/s</p>
            </div>
        </div>
    `;
}

function getWeatherForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                console.log("Błąd pobierania forecast:", response.statusText);
                throw new Error("Nie udało się pobrać danych o prognozie pogody.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Odpowiedź dla forecast:", data);
            displayWeatherForecast(data);
        })
        .catch(error => {
            console.log("Błąd:", error.message);
            document.getElementById("forecastResult").innerHTML = error.message;
        });
}

function displayWeatherForecast(data) {
    const forecastContainer = document.getElementById("forecastResult");
    forecastContainer.innerHTML = "<h3>Prognoza pogody na 5 dni</h3>";

    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000).toLocaleDateString("pl-PL");
        const temperature = forecast.main.temp;
        const description = forecast.weather[0].description;
        const icon = forecast.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;

        const rain = forecast.rain ? forecast.rain["3h"] : 0;
        const snow = forecast.snow ? forecast.snow["3h"] : 0;

        forecastContainer.innerHTML += `
            <div class="weather-info">
                <img src="${iconUrl}" alt="${description}" title="${description}">
                <div>
                    <p><strong>${date}</strong></p>
                    <p>Temperatura: ${temperature}°C</p>
                    <p>Opis: ${description}</p>
                    <p>Wilgotność: ${humidity}%</p>
                    <p>Prędkość wiatru: ${windSpeed} m/s</p>
                    <p>Deszcz: ${rain > 0 ? rain + " mm" : "Brak"}</p>
                    <p>Śnieg: ${snow > 0 ? snow + " mm" : "Brak"}</p>
                </div>
            </div>
        `;
    }
}

document.getElementById("weatherButton").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
    if (city) {
        getCurrentWeather(city);
        getWeatherForecast(city);
    } else {
        alert("Proszę wprowadzić nazwę miasta.");
    }
});
