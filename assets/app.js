// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q='
let apiKey = '&appid=9e28c19cd472ab319fdcc34b61bade1a';

const generateButton = document.body.querySelector('#generate');

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
generateButton.setAttribute('onclick','callWeather()');

/* Function called by event listener */
const callWeather = () => {
    let city = document.body.querySelector('#city').value;
    let feeling = document.body.querySelector('#feelings').value;
    getWeather(city)
    .then(temp => {
        let data = {date: newDate,city: city, temp: temp, feeling: feeling};
        postData('/addWeatherEntry',data);
    })
    .then(()=>{
        console.log('Reached End');
        window.location.href='/';
    });
};

/* Function to GET Web API Data*/
const getWeather = async(city) => {
    const url = baseURL + city + apiKey;
    try{
    const req = await fetch(url);
    const res = await req.json();
    return res.main.temp
    }
    catch(error){
    console.log("error", error);
    }
};

/* Function to POST data */
const postData = async(url, data) => {
    await fetch(url,{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },       
        body: JSON.stringify(data)
    });
};
