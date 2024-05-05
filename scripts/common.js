
document.addEventListener('DOMContentLoaded', function () {




    let day, month, year, dayDate;

    /**
     * Using Date interface to display date and time
     */
    function updateDateTime() {

        let currentDate = new Date();

        //get all the components
        dayDate = currentDate.getDate();
        let numMonth = currentDate.getMonth();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        month = months[numMonth];


        year = currentDate.getFullYear();
        let hours = currentDate.getHours();

        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let numDay = currentDate.getDay();
        day = weekday[numDay];

        //check whether we need am or pm
        let amPm;
        if (hours >= 12) {
            amPm = "PM";
        } else {
            amPm = "AM"
        }

        //change the hours to the 12-hour formatt
        newHours = hours % 12 || 12;

        //put a leading 0 on minutes if it is less then 10
        let minutes = currentDate.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes
        }

        //put a leading 0 on seconds if it is less than 10
        let seconds = currentDate.getSeconds();
        if (seconds < 10) {
            seconds = '0' + seconds; // Leading zero for seconds
        }

        let time = document.getElementById('time');
        time.innerHTML = `${newHours}:${minutes} ${amPm}`

    }

    updateDateTime();

    //calling the function every second so it updates
    setInterval(updateDateTime, 1000);



    let currentDate = new Date();
    let currentHour = currentDate.getHours();

    if (document.getElementById('bodysection')) {
        if (6 <= currentHour && currentHour < 18) {
            document.getElementById('bodysection').classList.add('bg-bluesky')
        } else {
            document.getElementById('bodysection').classList.add('bg-darksky')
        }
    }



    let celsiusButton = document.getElementById('celsius');
    let farenButton = document.getElementById('farenheight');

    let unit = 'metric';

    celsiusButton.addEventListener('click', function () {
        unit = 'metric';
        console.log("now in celsius")
        celsiusButton.classList.add("font-bold");
        celsiusButton.classList.add("scale-125");
        farenButton.classList.remove("font-bold");
        farenButton.classList.remove("scale-125");
        updateWeatherData();
    })


    farenButton.addEventListener('click', function () {
        unit = 'imperial';
        console.log("now in farenheight")
        farenButton.classList.add("font-bold");
        farenButton.classList.add("scale-125");
        celsiusButton.classList.remove("font-bold");
        celsiusButton.classList.remove("scale-125");
        updateWeatherData();
    })




    function updateWeatherData() {
        const openWeatherKey = '23c7e268a83f05cccf48e0358bce3257';
        const lat = 44.6488;
        const lon = -63.5752;
        const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherKey}&units=${unit}`;
        const hourWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${openWeatherKey}&units=${unit}`;

        //fetching the weather api for the home page
        fetch(currentWeatherURL)
            .then(response => response.json())
            .then(data => {
                //console.log(data);

                //current data
                const temp = Math.ceil(data.main.temp);
                const weather = data.weather[0].main;
                const city = data.name;

                let formattedTemp;

                if (unit === 'metric') {
                    formattedTemp = `${temp}&deg;C`;
                } else {
                    formattedTemp = `${temp}&deg;F`
                }


                if (document.getElementById('weatherWidget')) {
                    const weatherWidget = document.getElementById('weatherWidget');

                    if (weather === 'Clouds') {
                        weatherWidget.classList.add('bg-cloudy');
                        weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold"><i class="fas fa-cloud"></i><br>${formattedTemp}</div>
            <div class="text-3xl font-bold">Cloudy</div>
        `;

                    } else if (weather === 'Clear') {
                        weatherWidget.classList.add('bg-clear');
                        weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold "><i class="fas fa-sun"></i><br>${formattedTemp}</div>
            <div class="text-3xl font-bold">Clear Skies</div>
            `;
                    } else if (weather === 'Rain') {
                        weatherWidget.classList.add('bg-rain');
                        weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold "><i class="fas fa-droplet"></i><br>${formattedTemp}</div>
            <div class="text-3xl font-bold">Rainy</div>
            `;
                    } else if (weather === 'Drizzle') {
                        weatherWidget.classList.add('bg-rain');
                        weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold "><i class="fas fa-droplet"></i><br>${formattedTemp}</div>
            <div class="text-3xl font-bold">Drizzle</div>
            `;
                    } else if (weather === 'Snow') {
                        weatherWidget.classList.add('bg-snow');
                        weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold "><i class="fas fa-snowflake"></i><br>${formattedTemp}</div>
            <div class="text-3xl font-bold">Snow</div>
            `;
                    } else if (weather === 'Thunderstorm') {
                        weatherWidget.classList.add('bg-thunder');
                        weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold "><i class="fas fa-poo-storm"></i><br>${formattedTemp}</div>
            <div class="text-3xl font-bold">Thunderstorms</div>
            `;
                    } else {
                        weatherWidget.classList.add('bg-clear');
                        weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold "><i class="fas fa-sun"></i><br>${formattedTemp}</div>
            `;
                    }
                }

                fetch(hourWeatherURL)
                    .then(response => response.json())
                    .then(data => {
                        //console.log(data);


                        const hourlyDiv = document.getElementById('hourly');

                        if (hourlyDiv) {

                            hourlyDiv.innerHTML = '';

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




                                const temp = Math.ceil(hour.main.temp);
                                const weather = hour.weather[0].main;

                                const forecastEntry = document.createElement('div');
                                forecastEntry.innerHTML =
                                    `<div class="border-4 p-5 border-white">
                             <div class="font-bold">${day}</div>
                             <br><div>${newHours}${amPm}</div>
                             <br><div>${formattedTemp}</div>
                             <br><div>${weather}</div>
                             </div>`
                                hourlyDiv.appendChild(forecastEntry);


                            });
                        }

                    });


            });


    }

    //initially loading the data, setting it to celsius
    updateWeatherData();
    celsiusButton.classList.add("font-bold");
    celsiusButton.classList.add("scale-125");

    let hourlyDiv = document.getElementById('hourly');
    let nextButton = document.getElementById('nextButton');
    let prevButton = document.getElementById('prevButton');

    if (hourlyDiv && nextButton && prevButton) {



        nextButton.addEventListener('click', () => {

            hourlyDiv.scrollTo({
                left: hourlyDiv.scrollLeft + 1400,
                behavior: 'smooth'
            });
        });

        prevButton.addEventListener('click', () => {
            hourlyDiv.scrollTo({
                left: hourlyDiv.scrollLeft - 1400,
                behavior: 'smooth'
            })

        });
    }




    //dropdown menu
    let dropdownMenu = document.getElementById('dropdown');

    let menuToggleButton = document.getElementById('menuToggle');


    menuToggleButton.addEventListener('click', function () {
        dropdownMenu.classList.toggle('hidden');
    });

    document.addEventListener('touchstart', function (event) {
        if (!dropdownMenu.contains(event.target) && !menuToggleButton.contains(event.target)) {
            if (!dropdownMenu.classList.contains('hidden')) {
                console.log("touchstart test")
                dropdownMenu.classList.add('hidden');
            }
        }
    });

    document.addEventListener('touchend', function (event) {
        if (!dropdownMenu.contains(event.target) && !menuToggleButton.contains(event.target)) {
            if (!dropdownMenu.classList.contains('hidden')) {
                console.log("touchend test")
                dropdownMenu.classList.add('hidden');
            }
        }
    });

});
