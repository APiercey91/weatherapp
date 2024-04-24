/**
 * 
 * Javascript file for providing functionality to Weather app
 * 
 */



document.addEventListener('DOMContentLoaded', function () {


    let curDateElement = document.getElementById('curDate');

    /**
     * Using Date interface to display date and time
     */
    function updateDateTime() {

        let currentDate = new Date();

        //get all the components
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        let hours = currentDate.getHours();

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

        //format the date and time to be printed
        let formattedDate = `${day}/${month}/${year}`;
        let formattedTime = `${newHours}:${minutes}.${seconds}`

        //set the inner html of the curDate to what we are looking for
        curDateElement.innerHTML = `<div>${formattedTime} ${amPm}</div><br><div>${formattedDate}</div>`;

        //log it to console
        //console.log(formattedDate + "\n" + formattedTime + " " + amPm);
    }

    updateDateTime();

    //calling the function every second so it updates
    setInterval(updateDateTime, 1000);


    const key = '23c7e268a83f05cccf48e0358bce3257';
    const lat = 44.6488;
    const lon = -63.5752;
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=44.64&lon=-63.57&appid=${key}&units=metric`;

    //fetching the api for the home page
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const tempDiv = document.getElementById('homeTemp');
            const temp = data.main.temp;
            const weather = data.weather[0].main;
            const city = data.name;

            if (weather === 'Clouds') {
                tempDiv.innerHTML = `<div>${city}</div><br><div>${temp}&deg;</div><div>${weather} <i class="fas fa-cloud"></i></div>`
            } else if (weather === 'Clear') {
                tempDiv.innerHTML = `<div>${city}</div><br><div>${temp}&deg;</div><div>${weather} <i class="fas fa-sun"></i></div>`
            } else if (weather === 'Rain') {
                tempDiv.innerHTML = `<div>${city}</div><br><div>${temp}&deg;</div><div>${weather} <i class="fas fa-droplet"></i></div>`
            } else if (weather === 'Drizzle') {
                tempDiv.innerHTML = `<div>${city}</div><br><div>${temp}&deg;</div><div>${weather} <i class="fas fa-droplet"></i></div>`
            } else if (weather === 'Snow') {
                tempDiv.innerHTML = `<div>${city}</div><br><div>${temp}&deg;</div><div>${weather} <i class="fas fa-snowflake"></i></div>`
            } else if (weather === 'Thunderstorm') {
                tempDiv.innerHTML = `<div>${city}</div><br><div>${temp}&deg;</div><div>${weather} <i class="fas fa-poo-storm"></i></div>`
            } else {
                tempDiv.innerHTML = `<div>${city}</div><br><div>${temp}&deg;</div><div>${weather}</div>`
            }

        })



        const menuToggle = document.getElementById('menuToggle');
        const menu = document.getElementById('menu');
        let toggle = true;

        menuToggle.addEventListener('click', () => {
            if (toggle == true) {
                menu.classList.remove('hidden');
                toggle = false;
            } else {
                menu.classList.add('hidden');
                toggle = true;
            }
        });
  

});