//Stats selectors
const timeDisplay = document.querySelector('.time-display');
const temperatureDisplay = document.querySelector('.temperature-display');
const gravityDisplay = document.querySelector('.gravity-display');

//Events selectors
const eventList = document.querySelector('.event-list');

//Buttons Selectors
const previousButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');
const respawnButton = document.querySelector('.respawn');

//Initialize time
let currentMinute = 0;

const fetchMinutes = fetch('./minutes.json')
    .then(response => response.json())
    .then(minutes => minutes);

async function assignMinutes() {
    //Fetch original minutes array and display
    const minutes = await fetchMinutes;
    displayMinute(minutes[currentMinute]);

    //event Listeners
    previousButton.addEventListener('click', previousMinute);
    nextButton.addEventListener('click', nextMinute);
    respawnButton.addEventListener('click', respawnMinute);

    function previousMinute() {
        if (currentMinute > 0) {
            currentMinute--;
        }
        displayMinute(minutes[currentMinute]);
    }

    function nextMinute() {
        if (currentMinute < 18) {
            currentMinute++;
        }
        displayMinute(minutes[currentMinute]);
    }

    function respawnMinute() {
        currentMinute = 0;
        displayMinute(minutes[currentMinute]);
    }
}

function displayMinute(minuteObject) {
    //stats display
    timeDisplay.textContent = minuteObject.time + `'`;
    temperatureDisplay.textContent = minuteObject.temperature + `°C`;
    gravityDisplay.textContent = minuteObject.gravity;

    //events display
    eventList.textContent = '';
    for (let event of minuteObject.events) {
        const item = document.createElement('li');
        item.textContent = event;
        eventList.appendChild(item);
    }

    //Displaying blank event in case there is none
    if (eventList.textContent === '') {
        const blankItem = document.createElement('li');
        blankItem.textContent = 'No notable event this minute';
        eventList.appendChild(blankItem);
    }
}

assignMinutes();