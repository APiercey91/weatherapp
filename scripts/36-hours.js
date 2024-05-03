/**
 * 
 * Javascript file for providing functionality to Weather app
 * 
 */



document.addEventListener('DOMContentLoaded', function () {


    //changing bg gif to day or night
    let currentDate = new Date();
   let currentHour = currentDate.getHours();


    if (6 <= currentHour && currentHour < 18) {
        document.getElementById('bodysection').classList.add('bg-bluesky')
    } else {
        document.getElementById('bodysection').classList.add('bg-darksky')
    }


    const key = '23c7e268a83f05cccf48e0358bce3257';
    const lat = 44.6488;
    const lon = -63.5752;
    const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

    fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
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




                const temp = Math.ceil(hour.main.temp);
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


        });


    let hourlyDiv = document.getElementById('hourly');
    let nextButton = document.getElementById('nextButton');
    let prevButton = document.getElementById('prevButton');



      nextButton.addEventListener('click', ()=> {

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

    //dropdown menu functionality
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

