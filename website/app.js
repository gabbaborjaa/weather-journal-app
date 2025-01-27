const OWM_API_KEY = '987be9bc4a77c573dae6fed13fd1dde7';
const OWM_API_UNIT = 'metric';
const OWM_API_TEMP_UNIT_MEASURE = '&degF';
const OWM_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// URL of the server to post data
const SERVER = "http://localhost:4050"; //"http://127.0.0.1:4000";

// assign document function to a variable (save a few keystrokcs)

// Get today's date
let dateToday = new Date().toLocaleDateString('en-US');

// showing the error to the user
// let elemError = document.getElementById("error");

/**
 * Get weather data from the weather service.
 * 
 * @param {*} zip zip code
 * 
 * @returns weather data
 */
async function getWeatherData(zip) {
    try {
        const response = await fetch(`${OWM_API_URL}?zip=${zip}&appid=${OWM_API_KEY}&units=${OWM_API_UNIT}`);
        const data = await response.json();

        if (data.cod != 200) {
            // API call not successful (not equal to 200 means API call did not return a 'success' code)
            // generate/create error object and pass it to the error 'catch' clause
            throw `${data.cod}: ${data.message}`;
        }

        return data;

    } catch (error) {
        // display the error on the console
        console.log(error);
    }
};

/**
 * Add an entry to the API endpoint (projectData in server.js).
 * 
 * @param {*} url weather service API endpoint
 * @param {*} info weather data to post
 * 
 * @returns weather data
 */
async function postWeatherData(url = "", info = {}) {

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    });

    try {
        const data = await response.json();

        console.log(`Saved data: ${data}`);

        return data;

    } catch (error) {
        // display the error on the console
        console.log(error);
    }
};

/**
 * Display weather data on the UI.
 */
async function updateUI() {

    const response = await fetch(SERVER + "/all");

    try {
        const savedData = await response.json();

        document.getElementById("date").innerHTML = savedData.dateToday;
        //document.getElementById("city").innerHTML = savedData.city;
        document.getElementById("temp").innerHTML = `${savedData.temp} ${OWM_API_TEMP_UNIT_MEASURE}`;
        //document.getElementById("description").innerHTML = savedData.description;
        document.getElementById("content").innerHTML = savedData.description; //savedData.feelings;

    } catch (error) {
        // display the error on the console
        console.log(error);
    }
};

/**
 * Get weather data from the weather service and display them on the UI.
 */
function generateWeatherData() {

    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    getWeatherData(zip).then((data) => {

        if (data) {
            // spread data into variables
            const {
                main: { temp },
                name: city,
                weather: [{ description }],
            } = data;

            const info = {
                dateToday,
                city,
                temp: Math.round(temp), // get integer part of temperature value
                description,
                feelings,
            };

            postWeatherData(SERVER + "/add", info);

            updateUI();

            // document.getElementById('entry').style.opacity = 1;
        }
    });
};

// Attach a click event listener and handler function to the 'generate' button
document.getElementById("generate").addEventListener("click", generateWeatherData);