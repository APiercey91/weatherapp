/**
 * 
 * Javascript file for providing functionality to the home page of the Weather app
 * 
 * 
 * Author: Alex Piercey
 */



document.addEventListener('DOMContentLoaded', function () {

  

    //NASA astronmy image of the day 
    const nasaKey = `4MJHEjfojKO4eJsoLUNCY6IcsMvDuTve718nTmhY`;
    const nasaURL = `https://api.nasa.gov/planetary/apod?api_key=${nasaKey}`;

    fetch(nasaURL)
        .then(response => response.json())
        .then(data => {

            console.log(data);
            let image = data.url;
            let text = data.explanation;
            document.body.style.backgroundImage = `url${image}`;





            let aotd = document.getElementById('aotd');

            aotd.style.backgroundImage = `url('${image}')`;
            aotd.style.backgroundSize = `cover`;
            aotd.style.backgroundRepeat = 'no-repeat';
            aotd.style.backgroundPosition = 'center';

            aotd.innerHTML = `
 <p class="font-bold self-start">NASA's AOTD</p>
 <p class="hidden lg:block lg:text-xl">${text}</p>
 `;

        })


});
