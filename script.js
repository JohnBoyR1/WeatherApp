document.addEventListener("DOMContentLoaded", function () {
   document.body.classList.add(`noscroll`);
   document.body.style.overflow = 'hidden';
   //create a function to update time constantly
   function updateTimeCons(){
      //retrieving time from local computer to calculate time zones
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");

      //local day date year
      const d = now.getDay();
      const day = now.getDate();
      const month = now.getMonth()+1//0 based
      const year = now.getFullYear();
      //create an array of names of the weeks

      const nameDay = ["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"];
      dayOfWeek = nameDay[d];
      //display local time on the HTML (UI)
      const date = document.getElementById("date");
      const date2 = document.getElementById("date2");

      date.innerHTML = `${hours}:${minutes}:${seconds} | ${day}-${month}-${year} |`;
      date2.innerHTML = `${dayOfWeek}`;
   }

    

    //data Input and button assigning
    const userInput = document.getElementById("input-label");
    const searchBtn = document.getElementById("search-btn");
    //data collected and assigning to the HTML (UI)
    const tempShow = document.getElementById("temp");
    const placeShow = document.getElementById("place");
    const descriptionShow = document.getElementById("description");
    const sug = document.querySelectorAll(".suggestion");
   
   //loop through and assign
   sug.forEach(item => {//for each item that exist it will loop through
      item.onclick = () => { //if item was click the text with in that 
         userInput.value = item.textContent; //paragraph will be asssign to userInput
         searchBtn.click();//simulate a click on the search button
      }
   })
   
   //calling the timmer function
   updateTimeCons();

   //keep it updated constantly
   setInterval(updateTimeCons, 1000); //every second

    searchBtn.addEventListener("click", function (event) {
        //stops form from reloading on submit
        event.preventDefault();



        //data needed
        const city = userInput.value;
        console.log(city);
        const apiKey = "675ccbfe2cbca33c2a8f7101a6f1c579";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=675ccbfe2cbca33c2a8f7101a6f1c579&units=metrics";
        const apiTimeUrl = "";

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }
                return response.json();// convert the response to a JSON

            })
            .then(data => {
                //Only reaches here if the reponse is OK and JSON  was parsed successfully
                //assigning JDON data to variables
                const name = data.name;
                //assigning temp Kelvin
                const tempRaw = data.main.temp;
                //description of the weather
                const description = data.weather[0].description;
               
                //converting tempRaw to Celsius
                const tempCal = (tempRaw - 273.15);
                const temp = Number(tempCal.toFixed(1));//this converts to a string 2 decimal point 
                //assigning these variables to the HTML document
                console.log(name, temp, description);

                //now to display on HTML(UI)
                tempShow.innerHTML = temp +"&nbsp;&deg;"+"C";
                placeShow.innerHTML = name;
                descriptionShow.innerHTML = description;
              
                
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });

            
    });
});



//ReadMe: API JSON documentation:
/*
{
   "lat":33.44,
   "lon":-94.04,
   "timezone":"America/Chicago",
   "timezone_offset":-18000,
   "current":{
      "dt":1684929490,
      "sunrise":1684926645,
      "sunset":1684977332,
      "temp":292.55,
      "feels_like":292.87,
      "pressure":1014,
      "humidity":89,
      "dew_point":290.69,
      "uvi":0.16,
      "clouds":53,
      "visibility":10000,
      "wind_speed":3.13,
      "wind_deg":93,
      "wind_gust":6.71,
      "weather":[
         {
            "id":803,
            "main":"Clouds",
            "description":"broken clouds",
            "icon":"04d"
         }
      ]
   },
   "minutely":[
      {
         "dt":1684929540,
         "precipitation":0
      },
      ...
   ],
   "hourly":[
      {
         "dt":1684926000,
         "temp":292.01,
         "feels_like":292.33,
         "pressure":1014,
         "humidity":91,
         "dew_point":290.51,
         "uvi":0,
         "clouds":54,
         "visibility":10000,
         "wind_speed":2.58,
         "wind_deg":86,
         "wind_gust":5.88,
         "weather":[
            {
               "id":803,
               "main":"Clouds",
               "description":"broken clouds",
               "icon":"04n"
            }
         ],
         "pop":0.15
      },
      ...
   ],
   "daily":[
      {
         "dt":1684951200,
         "sunrise":1684926645,
         "sunset":1684977332,
         "moonrise":1684941060,
         "moonset":1684905480,
         "moon_phase":0.16,
         "summary":"Expect a day of partly cloudy with rain",
         "temp":{
            "day":299.03,
            "min":290.69,
            "max":300.35,
            "night":291.45,
            "eve":297.51,
            "morn":292.55
         },
         "feels_like":{
            "day":299.21,
            "night":291.37,
            "eve":297.86,
            "morn":292.87
         },
         "pressure":1016,
         "humidity":59,
         "dew_point":290.48,
         "wind_speed":3.98,
         "wind_deg":76,
         "wind_gust":8.92,
         "weather":[
            {
               "id":500,
               "main":"Rain",
               "description":"light rain",
               "icon":"10d"
            }
         ],
         "clouds":92,
         "pop":0.47,
         "rain":0.15,
         "uvi":9.23
      },
      ...
   ],
    "alerts": [
    {
      "sender_name": "NWS Philadelphia - Mount Holly (New Jersey, Delaware, Southeastern Pennsylvania)",
      "event": "Small Craft Advisory",
      "start": 1684952747,
      "end": 1684988747,
      "description": "...SMALL CRAFT ADVISORY REMAINS IN EFFECT FROM 5 PM THIS\nAFTERNOON TO 3 AM EST FRIDAY...\n* WHAT...North winds 15 to 20 kt with gusts up to 25 kt and seas\n3 to 5 ft expected.\n* WHERE...Coastal waters from Little Egg Inlet to Great Egg\nInlet NJ out 20 nm, Coastal waters from Great Egg Inlet to\nCape May NJ out 20 nm and Coastal waters from Manasquan Inlet\nto Little Egg Inlet NJ out 20 nm.\n* WHEN...From 5 PM this afternoon to 3 AM EST Friday.\n* IMPACTS...Conditions will be hazardous to small craft.",
      "tags": [

      ]
    },
    ...
  ]
*/