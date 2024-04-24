





document.addEventListener('DOMContentLoaded', function() {

    const key = '23c7e268a83f05cccf48e0358bce3257';
    const lat = 44.6488;
    const lon = -63.5752;
    const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;


fetch(URL)
.then(response => response.json())
.then(data => {

    console.log(data);
})

} )


