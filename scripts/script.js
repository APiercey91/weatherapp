/**
 * 
 * Javascript file for providing functionality to Weather app
 * 
 */



document.addEventListener('DOMContentLoaded', function () {


    let curDateElement = document.getElementById('curDate');


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

        

        //set the inner html of the curDate to what we are looking for

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
                weatherWidget.innerHTML = `
                <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
                <div class="text-5xl font-bold"><i class="fas fa-cloud"></i><br>${temp}&deg;</div>
                <div class="text-3xl font-bold">Cloudy</div>
            `;
            } else if (weather === 'Clear') {
                weatherWidget.innerHTML = `
                <div class="mb-48 text-4xl font-bold">${day}<br>${month} ${dayDate}, ${year} <br>${city}</div>
                <div class="text-5xl font-bold "><i class="fas fa-sun"></i><br>${temp}&deg;</div>
                <div class="text-3xl font-bold">Clear Skies</div>
                `;
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

    /* let display = false;
     let dropdownMenu = document.getElementById('dropdown');
 
     document.getElementById('menuToggle').addEventListener('mouseover', dropdown);
 
     function dropdown() {
         if (display == false) {
             dropdownMenu.classList.remove('hidden');
         } else {
             dropdownMenu.classList.add('hidden');
         }
         display = !display;
     }
 
     function updateDisplay() {
     if (window.innerWidth < 768) {
         dropdownMenu.classList.add('hidden');
         display = false;
     }
     }
 
     updateDisplay();
     window.addEventListener('resize', updateDisplay());
 */

    let dropdownMenu = document.getElementById('dropdown');

    document.getElementById('menuToggle').addEventListener('mouseenter', display);
    document.getElementById('dropdown').addEventListener('mouseenter', display);
    document.getElementById('menuToggle').addEventListener('mouseleave', dontDisplay);
    document.getElementById('dropdown').addEventListener('mouseleave', dontDisplay);

    function display() {
        dropdownMenu.classList.remove('hidden');
    }

    function dontDisplay() {
        dropdownMenu.classList.add('hidden');
    }

});