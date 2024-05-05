

function updateWeatherData() {
    const openWeatherKey = '23c7e268a83f05cccf48e0358bce3257';
    const lat = 44.6488;
    const lon = -63.5752;
    const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherKey}&units=${unit}`;

    //fetching the weather api for the home page
    fetch(openWeatherURL)
        .then(response => response.json())
        .then(data => {
            //console.log(data);

            //current data
            const temp = Math.ceil(data.main.temp);
            const weather = data.weather[0].main;
            const city = data.name;


            if (weather === 'Clouds') {
                weatherWidget.classList.add('bg-cloudy');
                weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold"><i class="fas fa-cloud"></i><br>${temp}&deg;C</div>
            <div class="text-3xl font-bold">Cloudy</div>
        `;

            } else if (weather === 'Clear') {
                weatherWidget.classList.add('bg-clear');
                weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold "><i class="fas fa-sun"></i><br>${temp}&deg;C</div>
            <div class="text-3xl font-bold">Clear Skies</div>
            `;
            } else if (weather === 'Rain') {
                weatherWidget.classList.add('bg-rain');
                weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold "><i class="fas fa-droplet"></i><br>${temp}&deg;C</div>
            <div class="text-3xl font-bold">Rainy</div>
            `;
            } else if (weather === 'Drizzle') {
                weatherWidget.classList.add('bg-rain');
                weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold "><i class="fas fa-droplet"></i><br>${temp}&deg;C</div>
            <div class="text-3xl font-bold">Drizzle</div>
            `;
            } else if (weather === 'Snow') {
                weatherWidget.classList.add('bg-snow');
                weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold "><i class="fas fa-snowflake"></i><br>${temp}&deg;C</div>
            <div class="text-3xl font-bold">Snow</div>
            `;
            } else if (weather === 'Thunderstorm') {
                weatherWidget.classList.add('bg-thunder');
                weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold "><i class="fas fa-poo-storm"></i><br>${temp}&deg;C</div>
            <div class="text-3xl font-bold">Thunderstorms</div>
            `;
            } else {
                weatherWidget.classList.add('bg-clear');
                weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold "><i class="fas fa-sun"></i><br>${temp}&deg;C</div>
            `;
            }


            //36-hour data
            const hourlyDiv = document.getElementById('hourly');

            data.list.slice(0, 12).forEach(hour => {
                const timestamp = hour.dt_txt;

                const date = new Date(timestamp);
                let hours = date.getHours();

                let amPm;
                if (hours >= 12) {
                    amPm = "PM";
                } else {
                    amPm = "AM"
                }

                newHours = hours % 12 || 12;

                const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                let numDay = date.getDay();
                let day = weekday[numDay];

                const weather = hour.weather[0].main;

                const forecastEntry = document.createElement('div');
                forecastEntry.innerHTML =
                    `<div class="border-4 p-5 border-white">
                 <div class="font-bold">${day}</div>
                 <br><div>${newHours}${amPm}</div>
                 <br><div>${temp}&deg;C</div>
                 <br><div>${weather}</div>
                 </div>`
                hourlyDiv.appendChild(forecastEntry);
            });

        })
}

//initially loading the data, setting it to celsius
updateWeatherData();
celsiusButton.classList.add("font-bold");
celsiusButton.classList.add("scale-125");