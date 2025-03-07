const apiKey = "a1815d424d2e2f7cafb009b034c91ad6";

        const weatherBox = document.getElementById("weatherResult");

        function getWeather() {
            const city = document.getElementById("city-name").value;
            if (!city) {
                alert("Please Enter a City name!")
                return;
            }

            fetchWeather(city);

        }


        function getLocationWeather() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;

                    fetchWeather(null, lat, long);
                }, () => {
                    alert("Location Access Denied!")
                });
            }
            else {
                alert("Your Browser is not Supported the GeoLocation")
            }

        }


        function fetchWeather(city = null, lat = null, lon = null) {
            let url;

            if (city) {
                url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            }
            else {
                url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            }


            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.cod !== 200) {
                        alert("City not found")
                        return;
                    }
                    displayWeather(data);
                })
                .catch(error => console.error("Error Fetching weather", error));

        }

        function displayWeather(data) {

            document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById("temperature").textContent = `🌡️ Temperature: ${data.main.temp} `
            document.getElementById("weatherCondition").textContent = `☁️ Weather Condition: ${data.weather[0].description}`
            document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`
            document.getElementById("windSpeed").textContent = `🌬️ Wind Speed: ${data.wind.speed} m/s`;
            document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            localStorage.setItem("lastCity", data.name)
        }


        window.onload = () => {
            const last_city = localStorage.getItem("lastCity");
            if (last_city) {
                fetchWeather(last_city);
            }

        };




        function toggleTheme() {
            document.body.classList.toggle("dark-theme")
        }
