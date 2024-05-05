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
        const image = data.url;
        const text = data.explanation;
        const aotd = document.getElementById('aotd');
        aotd.style.backgroundImage = `url('${image}')`;
        aotd.style.backgroundSize = `cover`;
        aotd.style.backgroundRepeat = 'no-repeat';
        aotd.style.backgroundPosition = 'center';

        let imageDescription = document.getElementById('imageDescription');

        function displayText() {
            imageDescription.innerHTML = `${text}`
            if (imageDescription.classList.contains('hidden')){
                imageDescription.classList.remove('hidden');
            } else {
                imageDescription.classList.add('hidden');
            }
        }


        document.getElementById('aotd').addEventListener('click', displayText);

    });

});
