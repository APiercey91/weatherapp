/**
 * JavaScript file for common code used by all pages
 * 
 * Author: Alex Piercey
 */


document.addEventListener('DOMContentLoaded', function () {




    let day, month, year, dayDate, lat, lon, updatedTime, timeDiff;
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const longWeekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    /**
     * Using Date interface to display date and time
     */
    function updateDateTime() {
        let currentDate = new Date();

        //get all the components
        dayDate = currentDate.getDate();
        let numMonth = currentDate.getMonth();
        
        month = months[numMonth];

        year = currentDate.getFullYear();
        let hours = currentDate.getHours();

        let numDay = currentDate.getDay();
        day = longWeekday[numDay];

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
            seconds = '0' + seconds;
        }

        let time = document.getElementById('time');
        time.innerHTML = `${newHours}:${minutes} ${amPm}`

    }

    updateDateTime();

    //calling the function every second so it updates
    setInterval(updateDateTime, 1000);



    let currentDate = new Date();
    let currentHour = currentDate.getHours();


    //if its later then 6 pm, using the night sky bg image
    if (document.getElementById('bodysection')) {
        if (6 <= currentHour && currentHour < 18) {
            document.getElementById('bodysection').classList.add('bg-bluesky')
        } else {
            document.getElementById('bodysection').classList.add('bg-darksky')
        }
    }

    //provide functionality to the celsius and farenheight buttons
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



    //object for each city to be used by weather api
    // const cityCoordinates = {
    //     halifax: { lat: 44.6488, lon: -63.5752, updatedTime: currentHour },
    //     fredericton: { lat: 45.9454, lon: -66.6655, updatedTime: currentHour + 10 },
    //     stjohns: { lat: 47.5605, lon: -52.7128, updatedTime: currentHour },
    //     charlottetown: { lat: 46.2388, lon: -63.1291, updatedTime: currentHour },
    //     quebeccity: { lat: 46.8298, lon: -71.2540, updatedTime: currentHour - 1 },
    //     toronto: { lat: 43.70011, lon: -79.4163, updatedTime: currentHour - 1 },
    //     winnipeg: { lat: 49.8844, lon: -97.14704, updatedTime: currentHour - 2 },
    //     edmonton: { lat: 53.55014, lon: -113.46871, updatedTime: currentHour - 3 },
    //     victoria: { lat: 48.4359, lon: -123.35155, updatedTime: currentHour - 4 },
    //     regina: { lat: 50.45008, lon: -104.6178, updatedTime: currentHour - 3 },
    //     whitehorse: { lat: 60.71611, lon: -135.05375, updatedTime: currentHour - 4 },
    //     yellowknife: { lat: 62.4541, lon: -114.3724, updatedTime: currentHour - 3 },
    //     iqaluit: { lat: 63.7486, lon: -68.5197, updatedTime: currentHour - 1 }
    // };

    const cityCoordinates = {
        halifax: { lat: 44.6488, lon: -63.5752, timeDiff: 0 },
        fredericton: { lat: 45.9454, lon: -66.6655, timeDiff: 10 },
        stjohns: { lat: 47.5605, lon: -52.7128, timeDiff: 0 },
        charlottetown: { lat: 46.2388, lon: -63.1291, timeDiff: 0 },
        quebeccity: { lat: 46.8298, lon: -71.2540, timeDiff: -1  },
        toronto: { lat: 43.70011, lon: -79.4163, timeDiff: -1 },
        winnipeg: { lat: 49.8844, lon: -97.14704, timeDiff: -2 },
        edmonton: { lat: 53.55014, lon: -113.46871, timeDiff: -3 },
        victoria: { lat: 48.4359, lon: -123.35155, timeDiff: -4 },
        regina: { lat: 50.45008, lon: -104.6178, timeDiff: -3 },
        whitehorse: { lat: 60.71611, lon: -135.05375, timeDiff: -4 },
        yellowknife: { lat: 62.4541, lon: -114.3724, timeDiff: -3 },
        iqaluit: { lat: 63.7486, lon: -68.5197, timeDiff: -1 }
    }

    /**
     * Function to change location
     * 
     * Not functional yet
     * 
     * TODO: Have it update timezones, make sure it works for all pages
     * 
     */

    if (document.getElementById('location')) {
        function changeLocation() {


            let locationElement = document.getElementById('location');
            let location = locationElement.value.toLowerCase();
            console.log(location);
            if (cityCoordinates.hasOwnProperty(location)) {
                lat = cityCoordinates[location].lat;
                lon = cityCoordinates[location].lon;
                updatedTime = cityCoordinates[location].updatedTime;
                let numberedDay = currentDate.getDay();
                timeDiff += cityCoordinates[location].timeDiff;


                //check if time is over 24 (this would mean its the following day)
               // if (updatedTime >= 24) {
               //     numberedDay = (numberedDay + 1) % 6;
              //  }
                //updatedTime = updatedTime % 24;

                updateWeatherData();
                updateDateTime();
                
            }
        }

        //setting the original location (halifax)
        changeLocation(newHours);
        //event listener to call the function when the city is changed
        document.getElementById('location').addEventListener('change', changeLocation);

    }

    /**
     * Function to update weather data using the free open weather map API to pull data from each location
     */
    function updateWeatherData() {
        lat = 44.6488;
        lon = -63.5752;
        const openWeatherKey = '23c7e268a83f05cccf48e0358bce3257';
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

                //Formatted temperature string
                if (unit === 'metric') {
                    formattedTemp = `${temp}&deg;C`;
                } else {
                    formattedTemp = `${temp}&deg;F`
                }


                //Inner HTML code for the home page
                if (document.getElementById('weatherWidget')) {
                    const weatherWidget = document.getElementById('weatherWidget');

                    if (weather === 'Clouds') {
                        weatherWidget.classList.remove('bg-clear', 'bg-rain', 'bg-snow', 'bg-thunder');
                        weatherWidget.classList.add('bg-cloudy');
                        weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold"><i class="fas fa-cloud"></i><br>${formattedTemp}</div>
            <div class="text-3xl font-bold">Cloudy</div>
        `;

                    } else if (weather === 'Clear') {
                        weatherWidget.classList.remove('bg-cloudy', 'bg-rain', 'bg-snow', 'bg-thunder');
                        weatherWidget.classList.add('bg-clear');
                        weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold "><i class="fas fa-sun"></i><br>${formattedTemp}</div>
            <div class="text-3xl font-bold">Clear Skies</div>
            `;
                    } else if (weather === 'Rain') {
                        weatherWidget.classList.remove('bg-cloudy', 'bg-clear', 'bg-snow', 'bg-thunder');
                        weatherWidget.classList.add('bg-rain');
                        weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold "><i class="fas fa-droplet"></i><br>${formattedTemp}</div>
            <div class="text-3xl font-bold">Rainy</div>
            `;
                    } else if (weather === 'Drizzle') {
                        weatherWidget.classList.remove('bg-cloudy', 'bg-clear', 'bg-snow', 'bg-thunder');
                        weatherWidget.classList.add('bg-rain');
                        weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold "><i class="fas fa-droplet"></i><br>${formattedTemp}</div>
            <div class="text-3xl font-bold">Drizzle</div>
            `;
                    } else if (weather === 'Snow') {
                        weatherWidget.classList.remove('bg-cloudy', 'bg-clear', 'bg-rain', 'bg-thunder');
                        weatherWidget.classList.add('bg-snow');
                        weatherWidget.innerHTML = `
            <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
            <div class="text-5xl font-bold "><i class="fas fa-snowflake"></i><br>${formattedTemp}</div>
            <div class="text-3xl font-bold">Snow</div>
            `;
                    } else if (weather === 'Thunderstorm') {
                        weatherWidget.classList.remove('bg-cloudy', 'bg-clear', 'bg-snow', 'bg-rain');
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
            <div class="text-5xl font-bold ">${formattedTemp}</div>
            <div class="text-3xl font-bold">${weather}</div>
            `;
                    }
                }

                //API call for the 36 hours page
                fetch(hourWeatherURL)
                    .then(response => response.json())
                    .then(data => {

                        const hourlyDiv = document.getElementById('hourly');

                        if (hourlyDiv) {

                            //set it blank
                            hourlyDiv.innerHTML = '';

                            //establishing a loop to display each time limit for the next 36 hours. Since the API only allows every 3 hours of data,
                            //we only loop through the first 12
                            data.list.slice(0, 12).forEach(hour => {      
                                const timestamp = hour.dt_txt;

                                const date = new Date(timestamp);
                                let hours = date.getHours();


                               // console.log(updatedTime);
                                console.log(newHours);
                                console.log(hours);

                                //hours += timeDiff;

                                console.log(hours);

                                let amPm;
                                if (hours >= 12) {
                                    amPm = "PM";
                                } else {
                                    amPm = "AM"
                                }

                                //converting to 12 hour time
                                newHours = hours % 12 || 12;

                                //converting to the day of the week instead of 0-6
                                let numDay = date.getDay();
                                let day = weekday[numDay];

                                const temp = Math.ceil(hour.main.temp);

                                let formattedTemp;

                                //formatting the temperature to use C or F
                                if (unit === 'metric') {
                                    formattedTemp = `${temp}&deg;C`;
                                } else {
                                    formattedTemp = `${temp}&deg;F`
                                }

                                //the weather for this 3-hour period
                                const weather = hour.weather[0].main;


                                //creating the a new div to enter the loop
                                const forecastEntry = document.createElement('div');
                                forecastEntry.innerHTML =
                                    `<div class="border-4 p-5 border-white backdrop-blur">
                             <div class="font-bold">${day}</div>
                             <br><div>${newHours}${amPm}</div>
                             <br><div>${formattedTemp}</div>
                             <br><div>${weather}</div>
                             </div>`
                                hourlyDiv.appendChild(forecastEntry);


                            });
                        }





                        /**
                         * Setting the 5-day forecast. Could not do 8 days, because the API only retrieves data for
                         * the next 5 days
                         * 
                         * 
                         * TODO: calculate the most common weather for each day (most likely using an array) 
                         * and setting that as the weather for each day
                         * 
                         */
                        let daily = document.getElementById('daily');

                        if (daily) {
                            let prevDay = null;
                            let tempSum = 0;
                            let count = 0;
                            daily.innerHTML = '';

                            data.list.forEach((hour, index) => {
                                const timestamp = hour.dt_txt;
                                const date = new Date(timestamp);
                                const numberedDay = date.getDay();
                                const day = weekday[numberedDay];
                                const temp = Math.ceil(hour.main.temp);



                                if (prevDay === null) {
                                    //initialize for first entry
                                    prevDay = day;
                                }

                                if (day !== prevDay) {
                                    //calculating temp
                                    if (count !== 0) {

                                        const averageTemp = Math.ceil(tempSum / count);
                                        let formattedTemp;

                                        if (unit === 'metric') {
                                            formattedTemp = `${averageTemp}&deg;C`;
                                        } else {
                                            formattedTemp = `${averageTemp}&deg;F`
                                        }

                                        //creating the div
                                        const forecastEntry = document.createElement('div');
                                        forecastEntry.innerHTML = `
                                      <div class="border-4 p-5 border-white backdrop-blur rounded-3xl">
                                      <div class="font-bold pb-24">${prevDay}<br><br></div>
                                      <div>${formattedTemp}</div>
                                      </div>`;
                                        daily.appendChild(forecastEntry);


                                    }

                                    //reset counters
                                    tempSum = 0;
                                    count = 0;
                                }

                                //update to current day
                                tempSum += temp;
                                count++;
                                prevDay = day;

                                //last entry
                                if (index === data.list.length - 1) {
                                    if (count !== 0) {
                                        const averageTemp = Math.ceil(tempSum / count);
                                        let formattedTemp;

                                        if (unit === 'metric') {
                                            formattedTemp = `${averageTemp}&deg;C`;
                                        } else {
                                            formattedTemp = `${averageTemp}&deg;F`
                                        }

                                        //create div for last entry
                                        const forecastEntry = document.createElement('div');
                                        forecastEntry.innerHTML = `
                                      <div class="border-4 p-5 border-white backdrop-blur rounded-3xl">
                                      <div class="font-bold pb-24">${day}<br><br></div>
                                      <div>${formattedTemp}</div>
                                      </div>`;
                                        daily.appendChild(forecastEntry);
                                    }
                                }
                            });
                        }








                    });
            });
    }

    //initially loading the data, setting it to celsius
    updateWeatherData();
    celsiusButton.classList.add("font-bold");
    celsiusButton.classList.add("scale-125");

    let daily = document.getElementById('daily');
    let hourlyDiv = document.getElementById('hourly');
    let nextButton = document.getElementById('nextButton');
    let prevButton = document.getElementById('prevButton');

    //scroll button functionality
    if ((hourlyDiv || daily) && nextButton && prevButton) {

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




    //dropdown menu functionality
    //only matters when screen is small enough
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



    function displayDesc(button, description) {
        if (description.classList.contains('hidden')) {
            description.classList.remove('hidden');
            button.classList.add('border-2', 'border-black');
        } else {
            description.classList.add('hidden');
            button.classList.remove('border-2', 'border-black');
        }
    }

    //about page logic
    let htmlLiItem = document.getElementById('htmlLiItem');
    let htmlDesc = document.getElementById('htmlDescription');
    let tailwindLiItem = document.getElementById('tailwindLiItem');
    let tailwindDesc = document.getElementById('tailwindDescription');
    let jsLiItem = document.getElementById('jsLiItem');
    let jsDesc = document.getElementById('jsDescription');
    let owmLiItem = document.getElementById('owmLiItem');
    let owmDesc = document.getElementById('owmDescription');
    let nasaLiItem = document.getElementById('nasaLiItem');
    let nasaDesc = document.getElementById('nasaDescription');


    if (htmlLiItem) {
        htmlLiItem.addEventListener('click', function () {
            displayDesc(htmlLiItem, htmlDesc);
        });
    }

    if (tailwindLiItem) {
        tailwindLiItem.addEventListener('click', function () {
            displayDesc(tailwindLiItem, tailwindDesc);
        });
    }

    if (jsLiItem) {
        jsLiItem.addEventListener('click', function () {
            displayDesc(jsLiItem, jsDesc);
        });
    }

    if (owmLiItem) {
        owmLiItem.addEventListener('click', function () {
            displayDesc(owmLiItem, owmDesc);
        });
    }

    if (nasaLiItem) {
        nasaLiItem.addEventListener('click', function () {
            displayDesc(nasaLiItem, nasaDesc);
        });
    }
});
