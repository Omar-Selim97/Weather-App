//1- Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.toDateString();
//2-api info From https://openweathermap.org/api
const mainURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
//For temperature in Celsius use units=metric or we can make function to handle it
const myKey = ",&appid=0cbe94cb7627af9843cbef6f794ed73c&units=metric";
//3-Main fuction to select our input and deal with them
const insertOurData = () => {
        const zip = document.querySelector('#zip').value;
        const feelings = document.getElementById('feelings').value;
        //4- make promise for our fetch data
        recieveWeatherData(zip).then((data) => {
            if (data) { //it's like state
                const {
                    main: { temp },
                    name: city,
                    weather: [{ description }],
                } = data;
                const myData = { //like setState
                    newDate,
                    city,
                    temp: Math.round(temp),
                    description,
                    feelings,
                }
                addData('/addData', myData);
                updatData();

            }
        })
    }
    //5-get web api data when click
document.querySelector('#generate').addEventListener('click', insertOurData)

//6-our function to get weather from api using fetch
const recieveWeatherData = async(zip) => {
    try {
        const response = await fetch(mainURL + zip + myKey)
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('error' + err);
    }
}

/* Function to POST data */
const addData = async(url = '', myData = {}) => {
        console.log(myData)
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(myData), // body data type must match "Content-Type" header        
        });

        try {
            const newData = await response.json();
            // console.log(newData);
            return newData
        } catch (error) {
            console.log("error", error);
            // appropriately handle the error
        }
    }
    //7-Function to update our data
const updatData = async() => {
    const response = await fetch("/weather");
    try {
        const ChData = await response.json();

        document.getElementById("date").innerHTML = DOMPurify.sanitize(ChData.newDate);
        document.getElementById("city").innerHTML = DOMPurify.sanitize(ChData.city);
        document.getElementById("temp").innerHTML = DOMPurify.sanitize(ChData.temp + '&degC');
        document.getElementById("description").innerHTML = DOMPurify.sanitize(ChData.description);
        document.getElementById("content").innerHTML = DOMPurify.sanitize(ChData.feelings);
    } catch (error) {
        console.log('Error', error);
    }
};
//finsh and start styling our landing Page
// Typeing Text In Heading

let h = document.querySelector(".headline");
let text = "Weather Journal App";

let index = 0;

function typeing() {
    index += 1;
    h.textContent = text.slice(0, index);
    if (index >= 20) {
        index = 0;
    }
}

setInterval(() => typeing(), 300);